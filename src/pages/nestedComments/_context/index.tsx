import { createContext, useContext, type FC } from "react";
import useHandleCommentState from "../_hooks";
import type { Actions, CommentState } from "../types";

const CommentContext = createContext<
  [CommentState, React.ActionDispatch<[action: Actions]>] | null
>(null);

export const CommentProvider: FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useHandleCommentState();
  return (
    <CommentContext.Provider value={[state, dispatch]}>
      {children}
    </CommentContext.Provider>
  );
};

export const useCommentContext = () => {
  const context = useContext(CommentContext);
  if (!context) {
    throw new Error("useCommentContext must be used within CommentProvider");
  }
  return context;
};
