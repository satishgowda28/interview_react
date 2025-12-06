import { useRef } from "react";
import { deepCheckDeps } from "../utils/deepCheck";

interface CBHook<T extends (...args: any) => any> {
  cb: T;
  dep: readonly unknown[];
}
const useCallbackHook = <T extends (...args: any) => any>({
  cb,
  dep,
}: CBHook<T>) => {
  const hookRefs = useRef<{ cb: T; dep: readonly unknown[] }>({
    cb,
    dep,
  });

  if (!deepCheckDeps<typeof dep>(hookRefs.current.dep, dep)) {
    if (hookRefs.current) {
      hookRefs.current = { cb, dep };
    }
  }
  return hookRefs.current.cb;
};

export default useCallbackHook;
