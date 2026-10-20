import { useEffect } from "react";
import { debounce, type DebouncedFunc } from "lodash";

import type { IShortcut } from "@/store/config";

export type KeyboardShortcutOptions = {
  disabled?: boolean;
  allowInInput?: boolean;
  debounceMs?: number;
};

export default function useKeyboardShortcuts(
  shortcuts: Record<string, IShortcut | undefined>,
  handlers: Record<string, () => void>,
  options: KeyboardShortcutOptions = {},
) {
  const { disabled = false, allowInInput = false, debounceMs = 50 } = options;

  useEffect(() => {
    if (disabled) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (!allowInInput) {
        const target = e.target as HTMLElement;
        const tag = target?.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || target?.isContentEditable)
          return;
      }

      for (const action in shortcuts) {
        const shortcut = shortcuts[action];
        const handler = handlers[action];
        if (!handler) continue;

        if (shortcut && matchShortcut(e, shortcut)) {
          e.preventDefault();
          e.stopPropagation();
          debouncedHandlers[action]();
          break;
        }
      }
    };

    const debouncedHandlers: Record<string, DebouncedFunc<() => void>> = {};
    for (const action in handlers) {
      debouncedHandlers[action] = debounce(handlers[action], debounceMs, {
        leading: true,
        trailing: false,
      });
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      for (const action in debouncedHandlers) {
        debouncedHandlers[action].cancel();
      }
    };
  }, [shortcuts, handlers, disabled, allowInInput, debounceMs]);
}

/* =======================
   MATCH FUNCTION
======================= */
function matchShortcut(e: KeyboardEvent, config: IShortcut): boolean {
  const pressedKey = e.key.toLowerCase();
  const expectedKey = config.key.toLowerCase();

  // F2 va F12 kabi keys uchun e.code ham tekshiriladi
  const keyMatch =
    pressedKey === expectedKey || e.code.toLowerCase() === expectedKey;

  const ctrlMatch = !!config.ctrl === e.ctrlKey;
  const shiftMatch = !!config.shift === e.shiftKey;
  const altMatch = !!config.alt === e.altKey;
  const metaMatch = !!config.meta === e.metaKey;

  return keyMatch && ctrlMatch && shiftMatch && altMatch && metaMatch;
}
