import { useRef } from "react";
import { deepCheckDeps } from "../utils/deepCheck";

interface MyEffect<T extends () => any> {
  cb: T;
  deps: readonly unknown[];
}

interface EffectRefs<T> {
  initOnMount: boolean;
  clear?: T;
  deps?: readonly unknown[];
}
export const useMyEffect = <T extends () => any>({ cb, deps }: MyEffect<T>) => {
  const effectRefs = useRef<EffectRefs<T>>({
    initOnMount: false,
    clear: undefined,
    deps: undefined,
  });

  if (!effectRefs.current.initOnMount) {
    if (deps && Array.isArray(deps)) {
      effectRefs.current.deps = deps;
    }
    const clearFunc = cb();
    if (clearFunc && typeof clearFunc === "function") {
      effectRefs.current.clear = clearFunc;
    }
  } else if (deps && Array.isArray(deps)) {
    const isChanged = !deepCheckDeps(effectRefs.current.deps!, deps);
    if (effectRefs.current.clear) {
      effectRefs.current.clear();
    }
    if (isChanged) {
      effectRefs.current.deps = deps;
      const clearFunc = cb();
      if (clearFunc && typeof clearFunc === "function") {
        effectRefs.current.clear = clearFunc;
      }
    }
  } else {
    effectRefs.current.deps = undefined;
    if (effectRefs.current.clear) {
      effectRefs.current.clear();
    }
    const clearFunc = cb();
    if (clearFunc && typeof clearFunc === "function") {
      effectRefs.current.clear = clearFunc;
    }
  }
};
