class BlogCommentPictureModel {
  pictureId: number;
  commentID: number;
  blogCommentSinglePicture?: string;
  

  constructor(pictureId: number, commentId: number, blogCommentSinglePicture: string) {
      this.pictureId = pictureId;
      this.commentID = commentId;
      this.blogCommentSinglePicture = blogCommentSinglePicture;
  }
}

export default BlogCommentPictureModel;