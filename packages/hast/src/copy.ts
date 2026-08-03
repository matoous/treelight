const BUTTON_SELECTOR = '[data-treelight-copy-button]';
const BLOCK_SELECTOR = '[data-treelight-code-block]';
const ENABLED_CLASS = 'treelight-copy-enabled';

type CopyState = 'copy' | 'copied' | 'error';
type CopyText = (text: string) => Promise<void>;

const installations = new WeakMap<Document, () => void>();
const resetTimers = new WeakMap<HTMLButtonElement, number>();

function getLabel(button: HTMLButtonElement, state: CopyState) {
  if (state === 'copied') {
    return button.dataset.copiedLabel ?? 'Copied';
  }
  if (state === 'error') {
    return button.dataset.copyErrorLabel ?? 'Copy failed';
  }
  return button.dataset.copyLabel ?? 'Copy code';
}

function setState(button: HTMLButtonElement, state: CopyState) {
  const label = getLabel(button, state);
  button.dataset.copyState = state;
  button.setAttribute('aria-label', label);
  button.title = label;
}

function scheduleReset(button: HTMLButtonElement) {
  const view = button.ownerDocument.defaultView;
  if (!view) {
    return;
  }
  const existingTimer = resetTimers.get(button);
  if (existingTimer !== undefined) {
    view.clearTimeout(existingTimer);
  }
  const resetAfter = Number.parseInt(button.dataset.copyResetAfter ?? '', 10);
  if (!Number.isFinite(resetAfter) || resetAfter <= 0) {
    return;
  }
  const timer = view.setTimeout(() => {
    setState(button, 'copy');
    resetTimers.delete(button);
  }, resetAfter);
  resetTimers.set(button, timer);
}

function dispatchCopyEvent(
  button: HTMLButtonElement,
  name: 'treelight-copy' | 'treelight-copy-error',
  detail: Record<string, unknown>,
) {
  const EventConstructor = button.ownerDocument.defaultView?.CustomEvent;
  if (!EventConstructor) {
    return;
  }
  button.dispatchEvent(
    new EventConstructor(name, {
      bubbles: true,
      detail,
    }),
  );
}

export function getTreelightCopyText(button: HTMLButtonElement) {
  const block = button.closest(BLOCK_SELECTOR);
  const code = block?.querySelector('pre.treelight code');
  if (!code) {
    return undefined;
  }
  const copy = code.cloneNode(true) as HTMLElement;
  copy
    .querySelectorAll('[aria-hidden="true"], [data-treelight-copy-ignore]')
    .forEach((node) => {
      node.remove();
    });
  return copy.textContent ?? '';
}

async function fallbackCopyText(document: Document, text: string) {
  const textarea = document.createElement('textarea');
  const activeElement = document.activeElement as HTMLElement | null;
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.inset = '0 auto auto -9999px';
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand('copy');
  textarea.remove();
  activeElement?.focus();
  if (!copied) {
    throw new Error('The browser did not allow copying to the clipboard.');
  }
}

async function writeClipboardText(document: Document, text: string) {
  const clipboard = document.defaultView?.navigator.clipboard;
  if (clipboard) {
    try {
      await clipboard.writeText(text);
      return;
    } catch {
      // Fall back to the selection-based API for older browsers and restricted
      // contexts where the async clipboard API is unavailable.
    }
  }
  await fallbackCopyText(document, text);
}

export async function copyTreelightCode(
  button: HTMLButtonElement,
  copyText: CopyText = (text) => writeClipboardText(button.ownerDocument, text),
) {
  const text = getTreelightCopyText(button);
  if (text === undefined) {
    throw new Error('Unable to find the Treelight code block to copy.');
  }

  button.disabled = true;
  try {
    await copyText(text);
    setState(button, 'copied');
    scheduleReset(button);
    dispatchCopyEvent(button, 'treelight-copy', { text });
  } catch (error) {
    setState(button, 'error');
    scheduleReset(button);
    dispatchCopyEvent(button, 'treelight-copy-error', { error });
    throw error;
  } finally {
    button.disabled = false;
  }
}

export function installTreelightCopyButtons(
  targetDocument: Document = document,
) {
  const existingInstallation = installations.get(targetDocument);
  if (existingInstallation) {
    return existingInstallation;
  }

  const handleClick = (event: MouseEvent) => {
    const target = event.target as Element | null;
    const button = target?.closest?.(BUTTON_SELECTOR);
    if (button?.tagName !== 'BUTTON') {
      return;
    }
    copyTreelightCode(button as HTMLButtonElement).catch(() => {
      // The button and event expose the failure to users and consumers.
    });
  };

  targetDocument.documentElement.classList.add(ENABLED_CLASS);
  targetDocument.addEventListener('click', handleClick);

  const dispose = () => {
    targetDocument.removeEventListener('click', handleClick);
    targetDocument.documentElement.classList.remove(ENABLED_CLASS);
    installations.delete(targetDocument);
  };
  installations.set(targetDocument, dispose);
  return dispose;
}

if (typeof document !== 'undefined') {
  installTreelightCopyButtons(document);
}
