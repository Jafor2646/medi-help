class BlogCommentPictureModel {
  pictureId: number;
  replier: string;
  blogDate: Date;
  commentDate: Date;
  blogCommentSinglePicture?: string;
  

  constructor(pictureId: number, replier: string, blogDate: Date, commentDate: Date, blogCommentSinglePicture: string) {
      this.pictureId = pictureId;
      this.replier = replier;
      this.blogDate = blogDate;
      this.commentDate = commentDate;
      this.blogCommentSinglePicture = blogCommentSinglePicture;
  }
}

export default BlogCommentPictureModel;