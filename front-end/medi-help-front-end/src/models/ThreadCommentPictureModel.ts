class ThreadCommentPictureModel {
  pictureId: number;
  uploaderId: string;
  threadDate: Date;
  commentDate: Date;
  threadSinglePicture?: string;
  

  constructor(pictureId: number, uploaderId: string, threadDate: Date, commentDate: Date, threadSinglePicture: string) {
      this.pictureId = pictureId;
      this.uploaderId = uploaderId;
      this.threadDate = threadDate;
      this.commentDate = commentDate;
      this.threadSinglePicture = threadSinglePicture;
  }
}

export default ThreadCommentPictureModel;