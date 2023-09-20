class ThreadTopicModel {
  topicId: number;
  uploaderId: string;
  threadDateTopic: Date;
  threadDateTopicTxt: String;
  topicTitle: string;
  

  constructor(topicId: number, uploaderId: string, threadDateTopic: Date, topicTitle: string, threadDateTopicTxt: String) {
      this.topicId = topicId;
      this.uploaderId = uploaderId;
      this.threadDateTopic = threadDateTopic;
      this.threadDateTopicTxt = threadDateTopicTxt;
      this.topicTitle = topicTitle;
  }
}

export default ThreadTopicModel;