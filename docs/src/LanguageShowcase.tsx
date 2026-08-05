import { BrowserOnly } from '@rspress/core/runtime';
import type { ReactNode } from 'react';

interface LanguageShowcaseProps {
  children: ReactNode;
  language: string;
}

function LanguageShowcase({ children, language }: LanguageShowcaseProps) {
  return (
    <BrowserOnly fallback={children}>
      {async () => {
        const { default: LanguageShowcaseClient } = await import(
          './LanguageShowcaseClient'
        );
        return (
          <LanguageShowcaseClient language={language}>
            {children}
          </LanguageShowcaseClient>
        );
      }}
    </BrowserOnly>
  );
}

export default LanguageShowcase;
