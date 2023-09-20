class BlogCommentModel {
  blogCommentId: number;
  replier: string;
  blogDate: Date;
  blogDateTxt: String;
  commentBody: string;
  commentDate: Date;
  commentDateTxt: String;
  commentUpvote?: number;
  commentDownvote?: number;

  constructor(blogCommentId: number, replier: string, blogDate: Date, blogDateTxt: String,commentBody: string, commentDate: Date, commentDateTxt: String,commentUpvote: number, commentDownvote: number) {
      this.blogCommentId = blogCommentId;
      this.replier = replier;
      this.blogDate = blogDate;
      this.blogDateTxt = blogDateTxt;
      this.commentBody = commentBody;
      this.commentDate = commentDate;
      this.commentDateTxt = commentDateTxt;
      this.commentUpvote = commentUpvote;
      this.commentDownvote = commentDownvote;
  }
}

export default BlogCommentModel;