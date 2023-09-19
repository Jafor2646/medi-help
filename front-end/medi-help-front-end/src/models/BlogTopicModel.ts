class BlogTopicModel {
  topicId: number;
  uploaderId: string;
  blogDateTopic: Date;
  topicTitle: string;
  

  constructor(topicId: number, uploaderId: string, blogDateTopic: Date, topicTitle: string) {
      this.topicId = topicId;
      this.uploaderId = uploaderId;
      this.blogDateTopic = blogDateTopic;
      this.topicTitle = topicTitle;
  }
}

export default BlogTopicModel;