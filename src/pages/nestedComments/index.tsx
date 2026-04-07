import Comment from "./_components/comment";
import CommentInput from "./_components/commentIO";
import { CommentProvider, useCommentContext } from "./_context";

const NestedWrapper = () => {
  return (
    <CommentProvider>
      <NestedComponent></NestedComponent>
    </CommentProvider>
  );
};

const NestedComponent = () => {
  const [state, _] = useCommentContext();
  // useEffect(() => {
  //   const { rootId, rootData, parentChild } = normalizeData(comments);
  //   dispatch({
  //     type: AcType.init,
  //     payload: {
  //       rootIds: rootId,
  //       parentChild: parentChild,
  //       allComments: rootData,
  //     },
  //   });
  // }, []);
  return (
    <div className="w-[800px] flex flex-col items-start">
      <CommentInput></CommentInput>
      <div className="w-full">
        {state.rootIds.map((ids) => (
          <Comment commentID={ids} key={ids} />
        ))}
      </div>
    </div>
  );
};

export default NestedWrapper;
