class BlogCommentModel {
  blogCommentId: number;
  replier: string;
  blogDate: Date;
  commentBody: string;
  commentDate: Date
  commentUpvote?: number;
  commentDownvote?: number;

  constructor(blogCommentId: number, replier: string, blogDate: Date, commentBody: string, commentDate: Date, commentUpvote: number, commentDownvote: number) {
      this.blogCommentId = blogCommentId;
      this.replier = replier;
      this.blogDate = blogDate;
      this.commentBody = commentBody;
      this.commentDate = commentDate;
      this.commentUpvote = commentUpvote;
      this.commentDownvote = commentDownvote;
  }
}

export default BlogCommentModel;