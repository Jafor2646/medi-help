class ThreadCommentModel {
  commentId: number;
  replier: string;
  threadId: number;
  commentBody: string;
  commentDate: Date;
  commentDateTxt: string;
  commentUpvote?: number;
  commentDownvote?: number;

  constructor(commentId: number, replier: string, threadId: number,commentBody: string, commentDate: Date, commentDateTxt: string,commentUpvote: number, commentDownvote: number) {
      this.commentId = commentId;
      this.replier = replier;
      this.threadId = threadId;
      this.commentBody = commentBody;
      this.commentDate = commentDate;
      this.commentDateTxt = commentDateTxt;
      this.commentUpvote = commentUpvote;
      this.commentDownvote = commentDownvote;
  }
}

export default ThreadCommentModel;