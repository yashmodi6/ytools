/**
 * @file useBottomSheetVisibility.ts
 * @description
 * Provides controlled open/close behavior for a BottomSheetModal,
 * allowing external components to toggle sheet visibility while
 * receiving close events.
 */

import { useRef, useEffect, useCallback } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

interface UseBottomSheetVisibilityOptions {
  /** Whether the sheet should be visible */
  visible: boolean;

  /** Callback invoked when the sheet closes */
  onClose?: () => void;
}

/**
 * Syncs BottomSheetModal visibility with external state.
 * Exposes ref + helpers so UI logic can open/close programmatically.
 */
export function useBottomSheetVisibility({ visible, onClose }: UseBottomSheetVisibilityOptions) {
  /** Ref to the BottomSheetModal instance */
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  /** Cached onClose reference */
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  /** Opens the sheet programmatically */
  const open = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  /** Closes the sheet programmatically */
  const close = useCallback(() => {
    bottomSheetRef.current?.dismiss();
  }, []);

  /**
   * Drives BottomSheet visibility based on external `visible` state
   */
  useEffect(() => {
    if (visible) open();
    else close();
  }, [visible, open, close]);

  /**
   * Emits close callback when sheet dismisses
   */
  const handleSheetChange = useCallback((index: number) => {
    if (index === -1) {
      onCloseRef.current?.();
    }
  }, []);

  return {
    /** Ref for attaching to BottomSheetModal */
    bottomSheetRef,

    /** Change handler passed to modal */
    handleSheetChange,

    /** Exposed programmatic open */
    open,

    /** Exposed programmatic close */
    close,
  };
}
