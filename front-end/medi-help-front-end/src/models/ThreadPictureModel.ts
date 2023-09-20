class ThreadPictureModel {
  pictureId: number;
  uploaderId: string;
  threadDate: Date;
  threadDateTxt: String;
  threadSinglePicture?: string;
  

  constructor(pictureId: number, uploaderId: string, threadDate: Date, threadDateTxt: String,threadSinglePicture: string) {
      this.pictureId = pictureId;
      this.uploaderId = uploaderId;
      this.threadDate = threadDate;
      this.threadDateTxt = threadDateTxt;
      this.threadSinglePicture = threadSinglePicture;
  }
}

export default ThreadPictureModel;