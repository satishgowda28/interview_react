import { useReducer } from "react";
import { AcType, type Actions, type CommentState } from "../types";

function reducerFunc(state: CommentState, action: Actions): CommentState {
  switch (action.type) {
    case AcType.init:
      return action.payload;
    case AcType.addComment: {
      const { comment, parentId } = action.payload;
      const isRoot = parentId === null;
      return {
        ...state,
        allComments: { ...state.allComments, [comment.id]: comment },
        rootIds: [...state.rootIds, ...(isRoot ? [comment.id] : [])],
        parentChild: !isRoot
          ? state.parentChild
          : {
              ...state.parentChild,
              [parentId]: [...(state.parentChild[parentId] ?? []), comment.id],
            },
      };
    }
    default:
      return state;
  }
}
const useHandleCommentState = () => {
  return useReducer(reducerFunc, {
    rootIds: [],
    parentChild: {},
    allComments: {},
  } as CommentState);
};

export default useHandleCommentState;
