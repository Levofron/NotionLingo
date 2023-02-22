import { useState } from 'react';

export const useCopyToClipboard = () => {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyTextToClipboard = async (text: string) => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported');

      return false;
    }

    await navigator.clipboard.writeText(text);
    setCopiedText(text);

    return true;
  };

  const copyToClipboard = async (text: string) => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported');

      return false;
    }

    try {
      return await copyTextToClipboard(text);
    } catch {
      setCopiedText(null);

      return false;
    }
  };

  return { copiedText, copyToClipboard };
};
