class ThreadCommentModel {
  commentId: number;
  replier: string;
  threadDate: Date;
  commentBody: string;
  commentDate: Date
  commentUpvote?: number;
  commentDownvote?: number;

  constructor(commentId: number, replier: string, threadDate: Date, commentBody: string, commentDate: Date, commentUpvote: number, commentDownvote: number) {
      this.commentId = commentId;
      this.replier = replier;
      this.threadDate = threadDate;
      this.commentBody = commentBody;
      this.commentDate = commentDate;
      this.commentUpvote = commentUpvote;
      this.commentDownvote = commentDownvote;
  }
}

export default ThreadCommentModel;