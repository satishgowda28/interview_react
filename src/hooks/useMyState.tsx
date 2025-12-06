import { useReducer } from "react";

let nosOfTimeStateInit = 0;
let state: unknown[] = [];

export const useMyState = (initState: any) => {
  const stateId = nosOfTimeStateInit++;
  const [_, dispatch] = useReducer((s: any, _a: any) => s, {});

  if (state[stateId]) {
    return state[stateId];
  }

  const initValue = typeof initState === "function" ? initState() : initState;

  const setState = (newState: any) => {
    if (typeof newState === "function") {
      newState = newState((state[stateId] as any)[0]);
    }

    const isModified = !Object.is(newState, (state[stateId] as any)[0]);
    if (isModified) {
      (state[stateId] as any)[0] = newState;
      nosOfTimeStateInit = 0;
      dispatch({});
    }
  };

  state[stateId] = [initValue, setState];

  return state[stateId];
};
