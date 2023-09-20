class BlogTopicModel {
  topicId: number;
  uploaderId: string;
  blogDateTopic: Date;
  blogDateTopicTxt: String;
  topicTitle: string;
  

  constructor(topicId: number, uploaderId: string, blogDateTopic: Date, blogDateTopicTxt: String,topicTitle: string) {
      this.topicId = topicId;
      this.uploaderId = uploaderId;
      this.blogDateTopic = blogDateTopic;
      this.blogDateTopicTxt = blogDateTopicTxt;
      this.topicTitle = topicTitle;
  }
}

export default BlogTopicModel;