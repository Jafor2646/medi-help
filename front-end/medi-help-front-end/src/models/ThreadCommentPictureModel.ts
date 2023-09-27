class ThreadCommentPictureModel {
  pictureId: number;
  commentId: number;
  threadSinglePicture?: string;
  

  constructor(pictureId: number, commentId: number, threadSinglePicture: string) {
      this.pictureId = pictureId;
      this.commentId = commentId;
      this.threadSinglePicture = threadSinglePicture;
  }
}

export default ThreadCommentPictureModel;