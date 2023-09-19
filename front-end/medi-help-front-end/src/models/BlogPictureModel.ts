class BlogPictureModel {
  pictureId: number;
  uploaderId: string;
  blogDate: Date;
  blogSinglePicture?: string;
  

  constructor(pictureId: number, uploaderId: string, blogDate: Date, blogSinglePicture: string) {
      this.pictureId = pictureId;
      this.uploaderId = uploaderId;
      this.blogDate = blogDate;
      this.blogSinglePicture = blogSinglePicture;
  }
}

export default BlogPictureModel;