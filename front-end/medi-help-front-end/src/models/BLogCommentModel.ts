class BlogCommentModel {
  blogCommentId: number;
  replier: string;
  blogId: number;
  commentBody: string;
  commentDate: Date;
  commentDateTxt: String;
  commentUpvote?: number;
  commentDownvote?: number;

  constructor(blogCommentId: number, replier: string, blogId: number,commentBody: string, commentDate: Date, commentDateTxt: String,commentUpvote: number, commentDownvote: number) {
      this.blogCommentId = blogCommentId;
      this.replier = replier;
      this.blogId = blogId;
      this.commentBody = commentBody;
      this.commentDate = commentDate;
      this.commentDateTxt = commentDateTxt;
      this.commentUpvote = commentUpvote;
      this.commentDownvote = commentDownvote;
  }
}

export default BlogCommentModel;