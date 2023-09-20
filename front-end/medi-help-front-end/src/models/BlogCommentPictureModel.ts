class BlogCommentPictureModel {
  pictureId: number;
  replier: string;
  blogDate: Date;
  blogDateTxt: String;
  commentDate: Date;
  commentDateTxt: String;
  blogCommentSinglePicture?: string;
  

  constructor(pictureId: number, replier: string, blogDate: Date, blogDateTxt: String,commentDate: Date, commentDateTxt: String,blogCommentSinglePicture: string) {
      this.pictureId = pictureId;
      this.replier = replier;
      this.blogDate = blogDate;
      this.blogDateTxt = blogDateTxt;
      this.commentDate = commentDate;
      this.commentDateTxt = commentDateTxt;
      this.blogCommentSinglePicture = blogCommentSinglePicture;
  }
}

export default BlogCommentPictureModel;