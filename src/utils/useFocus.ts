import { useRef, useEffect } from "react";

/**
 * COMPONENT - To focus cursor on the input element when click on "+Add another task"
 */
export const useFocus = () => {
  // Ref provide a way to reference the actual DOM nodes of rendered React elements.
  // Here is the HTML INPUT Element - We use "useRef()" React Hook
  const ref = useRef<HTMLInputElement>(null);

  /**
   * The field 'current' can still be null. So we are using the optional chaining operator (?.) to access it.
   */
  useEffect(() => {
    ref.current?.focus();
  }, []);

  return ref;
};
