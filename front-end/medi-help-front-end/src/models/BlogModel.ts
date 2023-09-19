class BlogModel {
  blogId: number;
  uploaderId: string;
  blogTitle: string;
  blogBody: string;
  blogDate: Date;
  blogView?: number;
  blogTrendView?: number;
  blogUpvote?: number;
  blogDownvote?: number;

  constructor(blogId: number, uploaderId: string, blogTitle: string, blogBody: string, blogDate: Date, blogView: number,blogTrendView: number, blogUpvote: number, blogDownvote: number) {
      this.blogId = blogId;
      this.uploaderId = uploaderId;
      this.blogTitle = blogTitle;
      this.blogBody = blogBody;
      this.blogDate = blogDate;
      this.blogView = blogView;
      this.blogTrendView = blogTrendView;
      this.blogUpvote = blogUpvote;
      this.blogDownvote = blogDownvote;
  }
}

export default BlogModel;