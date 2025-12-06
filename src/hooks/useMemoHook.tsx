import { useRef } from "react";
import { deepCheckDeps } from "../utils/deepCheck";

interface MemoHook<T extends (...args: any) => any> {
  cb: T;
  deps: readonly unknown[];
}
export const useMemoHook = <T extends (...args: any) => any>({
  cb,
  deps,
}: MemoHook<T>) => {
  const memoRef = useRef<{
    value: ReturnType<typeof cb>;
    deps: readonly unknown[];
    initialized: boolean;
  }>({
    value: undefined as unknown as ReturnType<T>,
    deps: [],
    initialized: false,
  });
  if (
    memoRef.current.initialized ||
    !deepCheckDeps(memoRef.current.deps, deps)
  ) {
    memoRef.current = { value: cb(), deps, initialized: true };
  }

  return memoRef.current.value;
};
