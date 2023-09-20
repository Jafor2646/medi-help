class ThreadCommentModel {
  commentId: number;
  replier: string;
  threadDate: Date;
  threadDateTxt: String;
  commentBody: string;
  commentDate: Date;
  commentDateTxt: String;
  commentUpvote?: number;
  commentDownvote?: number;

  constructor(commentId: number, replier: string, threadDate: Date, threadDateTxt: String,commentBody: string, commentDate: Date, commentDateTxt: String,commentUpvote: number, commentDownvote: number) {
      this.commentId = commentId;
      this.replier = replier;
      this.threadDate = threadDate;
      this.threadDateTxt = threadDateTxt;
      this.commentBody = commentBody;
      this.commentDate = commentDate;
      this.commentDateTxt = commentDateTxt;
      this.commentUpvote = commentUpvote;
      this.commentDownvote = commentDownvote;
  }
}

export default ThreadCommentModel;