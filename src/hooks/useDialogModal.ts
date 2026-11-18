import { useEffect, useRef } from 'react';

/**
 * Coordinates a native HTML <dialog> modal using showModal(),
 * resets dialog.returnValue on close, and provides the pointerdown/pointerup
 * light-dismiss fallback for browsers without native `closedby="any"` support.
 */
export function useDialogModal(isOpen: boolean, onClose: () => void) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else if (dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      // Reset returnValue so stale values never leak on subsequent dismissals
      dialog.returnValue = '';
      onClose();
    };

    dialog.addEventListener('close', handleClose);

    // Fallback light-dismiss when native `closedby="any"` is unavailable (e.g., Safari)
    const supportsClosedBy =
      typeof HTMLDialogElement !== 'undefined' &&
      'closedBy' in HTMLDialogElement.prototype;

    if (supportsClosedBy) {
      return () => {
        dialog.removeEventListener('close', handleClose);
      };
    }

    let pressedOutside = false;

    const isOutside = (e: PointerEvent) => {
      const rect = dialog.getBoundingClientRect();
      return (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      );
    };

    const handlePointerDown = (e: PointerEvent) => {
      pressedOutside = isOutside(e);
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (pressedOutside && isOutside(e) && dialog.open) {
        dialog.close();
      }
      pressedOutside = false;
    };

    dialog.addEventListener('pointerdown', handlePointerDown);
    dialog.addEventListener('pointerup', handlePointerUp);

    return () => {
      dialog.removeEventListener('close', handleClose);
      dialog.removeEventListener('pointerdown', handlePointerDown);
      dialog.removeEventListener('pointerup', handlePointerUp);
    };
  }, [onClose]);

  return dialogRef;
}
