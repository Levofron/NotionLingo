import { useState } from 'react';

export const useCopyToClipboard = () => {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyToClipboard = async (text: string) => {
    if (!navigator?.clipboard) {
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);

      return true;
    } catch {
      setCopiedText(null);

      return false;
    }
  };

  return { copiedText, copyToClipboard };
};
