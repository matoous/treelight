const HTML_ESCAPE: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

const ESCAPE_REGEX = /[&<>"']/g;

export function escapeHtml(value: string) {
  return value.replace(
    ESCAPE_REGEX,
    (character) => HTML_ESCAPE[character] || character,
  );
}
