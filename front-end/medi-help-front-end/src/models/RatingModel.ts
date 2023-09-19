class RatingModel {
  ratingId: number;
  ratingUploader: string;
  ratingGetter: string;
  ratingValue: number;
  ratingTime: Date;
  ratingText?: string;
  ratingPicture?: string;

  constructor(ratingId: number, ratingUploader: string, ratingGetter: string, ratingValue: number, ratingTime: Date, ratingText: string,ratingPicture: string) {
      this.ratingId = ratingId;
      this.ratingUploader = ratingUploader;
      this.ratingGetter = ratingGetter;
      this.ratingValue = ratingValue;
      this.ratingTime = ratingTime;
      this.ratingText = ratingText;
      this.ratingPicture = ratingPicture;
  }
}

export default RatingModel;