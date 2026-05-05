import { useState } from 'react';

/**
 * Helper for the "Call Now" buttons on the site.
 *
 * `tel:` links do nothing visible on desktop browsers when no calling app is
 * registered to handle the protocol — making the button feel broken to a PC
 * visitor. This hook copies the number to the clipboard and flips a `copied`
 * flag for 2s so the UI can show feedback. Mobile keeps the native dialer
 * behavior via the `tel:` href; the click handler runs in addition, not
 * instead.
 */
export function useCopyPhone() {
  const [copied, setCopied] = useState(false);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API can fail in non-HTTPS contexts or when blocked by
      // browser settings. The tel: link still triggers natively where
      // supported, so we degrade silently.
    }
  };

  return { copied, copy };
}
