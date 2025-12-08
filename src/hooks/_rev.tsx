import { useReducer } from "react";

let idx = 0;
let state: unknown[] = [];
const useMyStateHook = (initValue: unknown) => {
  const currIdx = idx++;
  const [_, dispatch] = useReducer((s: any, _a: any) => s, {});

  if (state[currIdx]) {
    return state[currIdx];
  }

  const initState = typeof initValue === "function" ? initValue() : initValue;

  const setState = (newState: unknown) => {
    const newValue =
      typeof newState === "function"
        ? newState((state[currIdx] as any)[0])
        : newState;
    const isChanged = !Object.is((state[currIdx] as any)[0], newValue);
    if (isChanged) {
      (state[currIdx] as any)[0] = newValue;
      idx = 0;
      dispatch({});
    }
  };

  state[currIdx] = [initState, setState];

  return state[currIdx];
};
