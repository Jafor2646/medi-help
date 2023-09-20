class ThreadCommentPictureModel {
  pictureId: number;
  uploaderId: string;
  threadDate: Date;
  threadDateTxt: String;
  commentDate: Date;
  commentDateTxt: String;
  threadSinglePicture?: string;
  

  constructor(pictureId: number, uploaderId: string, threadDate: Date, threadDateTxt: String,commentDate: Date, commentDateTxt: String,threadSinglePicture: string) {
      this.pictureId = pictureId;
      this.uploaderId = uploaderId;
      this.threadDate = threadDate;
      this.threadDateTxt = threadDateTxt;
      this.commentDate = commentDate;
      this.commentDateTxt = commentDateTxt;
      this.threadSinglePicture = threadSinglePicture;
  }
}

export default ThreadCommentPictureModel;