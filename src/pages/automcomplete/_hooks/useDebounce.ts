import { useEffect, useRef } from "react";

interface DebouncePorps<T extends (...args: any[]) => any> {
  cb: T;
  delay: number;
}
const useDebounce = <T extends (...args: any[]) => any>({
  cb,
  delay,
}: DebouncePorps<T>) => {
  const callBackref = useRef(cb);
  const timeRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => {
    return () => {
      clearTimeout(timeRef.current);
    };
  }, []);
  useEffect(() => {
    callBackref.current = cb;
  }, [cb]);

  const wrapperFunction = (...args: any) => {
    clearTimeout(timeRef.current);
    timeRef.current = setTimeout(() => {
      callBackref.current(...args);
    }, delay);
  };

  return { wrapperFunction };
};

export default useDebounce;
