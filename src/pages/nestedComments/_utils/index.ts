import { type CommentObj, type CommentType, type ParentChild } from './../types/index';

export const normalizeData = (arr:CommentObj[]) => {
  let rootId:number[] = [];
  let parentChild: ParentChild = {};
  let rootData:CommentType = {} 
  function loopWrapper(commentArray:CommentObj[], isRoot=false) {
    for(let comment of commentArray) {
      if(isRoot) {
        rootId.push(comment.id)
      }
      rootData[comment.id] = {
        id: comment.id,
        text: comment.text
      }

      if(comment.replies && comment.replies.length > 0) {
        parentChild[comment.id] = comment.replies.map((obj) => obj.id)
        loopWrapper(comment.replies, false)
      }

    }
  }
  loopWrapper(arr, true)

  return {rootId, parentChild, rootData}
}