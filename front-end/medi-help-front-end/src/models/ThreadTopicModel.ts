class ThreadTopicModel {
  topicId: number;
  uploaderId: string;
  threadDateTopic: Date;
  topicTitle: string;
  

  constructor(topicId: number, uploaderId: string, threadDateTopic: Date, topicTitle: string) {
      this.topicId = topicId;
      this.uploaderId = uploaderId;
      this.threadDateTopic = threadDateTopic;
      this.topicTitle = topicTitle;
  }
}

export default ThreadTopicModel;