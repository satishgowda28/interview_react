import { useState } from "react";
import CommentInput from "./commentIO";

const Comment = () => {
  const [commentIO, setCommentIO] = useState(false);
  return (
    <div className="border-l pl-2.5 ml-2.5 mt-3 text-left w-full">
      <div>Happy New Year folks! What are your resolutions this year?</div>
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
          <CommentInput />
        </div>
      ) : null}
    </div>
  );
};

export default Comment;
