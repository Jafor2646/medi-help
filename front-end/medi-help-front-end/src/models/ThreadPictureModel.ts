class ThreadPictureModel {
  pictureId: number;
  uploaderId: string;
  threadDate: Date;
  threadSinglePicture?: string;
  

  constructor(pictureId: number, uploaderId: string, threadDate: Date, threadSinglePicture: string) {
      this.pictureId = pictureId;
      this.uploaderId = uploaderId;
      this.threadDate = threadDate;
      this.threadSinglePicture = threadSinglePicture;
  }
}

export default ThreadPictureModel;