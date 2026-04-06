import { useEffect } from "react";
import Comment from "./_components/comment";
import CommentInput from "./_components/commentIO";
import { comments } from "./_data";
import useHandleCommentState from "./_hooks";
import { normalizeData } from "./_utils";
import { AcType } from "./types";

const NestedComponent = () => {
  const [state, dispath] = useHandleCommentState();
  useEffect(() => {
    const { rootId, rootData, parentChild } = normalizeData(comments);
    console.log({ rootId, rootData, parentChild });
    dispath({
      type: AcType.init,
      payload: {
        rootIds: rootId,
        parentChild: parentChild,
        allComments: rootData,
      },
    });
  }, []);
  return (
    <div className="w-[800px] flex flex-col items-start">
      <CommentInput></CommentInput>
      <div className="w-full">
        {state.rootIds.map(() => (
          <Comment />
        ))}
      </div>
    </div>
  );
};

export default NestedComponent;
