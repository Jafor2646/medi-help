class ThreadModel {
    threadId: number;
    uploaderId: string;
    threadTitle: string;
    threadBody: string;
    threadDate: Date;
    threadView?: number;
    threadTrendView?: number;
    threadUpvote?: number;
    threadDownvote?: number;

    constructor(threadId: number, uploaderId: string, threadTitle: string, threadBody: string, threadDate: Date, threadView: number,threadTrendView: number, threadUpvote: number, threadDownvote: number) {
        this.threadId = threadId;
        this.uploaderId = uploaderId;
        this.threadTitle = threadTitle;
        this.threadBody = threadBody;
        this.threadDate = threadDate;
        this.threadView = threadView;
        this.threadTrendView = threadTrendView;
        this.threadUpvote = threadUpvote;
        this.threadDownvote = threadDownvote;
    }
}

export default ThreadModel;