class BlogPictureModel {
  pictureId: number;
  uploaderId: string;
  blogDate: Date;
  blogDateTxt: String;
  blogSinglePicture?: string;
  

  constructor(pictureId: number, uploaderId: string, blogDate: Date, blogDateTxt: String,blogSinglePicture: string) {
      this.pictureId = pictureId;
      this.uploaderId = uploaderId;
      this.blogDate = blogDate;
      this.blogDateTxt = blogDateTxt;
      this.blogSinglePicture = blogSinglePicture;
  }
}

export default BlogPictureModel;