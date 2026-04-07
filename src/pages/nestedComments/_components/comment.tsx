import { useState } from "react";
import { useCommentContext } from "../_context";
import CommentInput from "./commentIO";

interface CommentType {
  commentID: number;
}

const Comment = ({ commentID }: CommentType) => {
  const [commentIO, setCommentIO] = useState(false);
  const [state, _] = useCommentContext();
  return (
    <div className="border-l pl-2.5 ml-2.5 mt-3 text-left w-full">
      <div>{state.allComments[commentID].text}</div>
      <button
        className="mt-2 text-blue-600 bg-white rounded-lg px-1 py-0.5"
        onClick={() => {
          setCommentIO((prev) => !prev);
        }}
      >
        Add a reply
      </button>
      {commentIO ? (
        <div className="mt-2">
          <CommentInput parentId={commentID} />
        </div>
      ) : null}
      {state.parentChild[commentID]?.length > 0 && (
        <div>
          {state.parentChild[commentID].map((ids) => (
            <Comment commentID={ids} key={ids} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
