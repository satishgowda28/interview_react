export interface CommentObj {
  id: number;
  text: string;
  replies?: CommentObj[];
}
export type CommentType = Record<
  number,
  Omit<CommentObj, "replies">
>; /* & {test: number} to add any key */
export type ParentChild = Record<number, number[]>;

export type CommentState = {
  rootIds: number[];
  parentChild: ParentChild;
  allComments: CommentType;
};

export enum AcType {
  init = "INIT",
  addComment = "ADD_COMMENT",
}

export type Actions =
  | {
      type: AcType.init;
      payload: CommentState;
    }
  | {
      type: AcType.addComment;
      payload: {
        comment: Omit<CommentObj, "replies">;
        parentId: number | null;
      };
    };
