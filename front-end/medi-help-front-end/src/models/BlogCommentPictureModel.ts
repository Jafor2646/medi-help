class BlogCommentPictureModel {
  pictureId: number;
  blogCommentID: string;
  blogCommentSinglePicture?: string;
  

  constructor(pictureId: number, blogCommentID: string, blogCommentSinglePicture: string) {
      this.pictureId = pictureId;
      this.blogCommentID = blogCommentID;
      this.blogCommentSinglePicture = blogCommentSinglePicture;
  }
}

export default BlogCommentPictureModel;