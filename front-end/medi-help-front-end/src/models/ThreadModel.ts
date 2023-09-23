class ThreadModel {
    uploaderId: string;
    threadTitle: string;
    threadBody: string;
    threadDate: Date;
    threadDateTxt: string;
    threadView?: number;
    threadTrendView?: number;
    threadUpvote?: number;
    threadDownvote?: number;

    constructor(uploaderId: string, threadTitle: string, threadBody: string, threadDate: Date, threadDateTxt: string, threadView: number,threadTrendView: number, threadUpvote: number, threadDownvote: number) {
        this.uploaderId = uploaderId;
        this.threadTitle = threadTitle;
        this.threadBody = threadBody;
        this.threadDate = threadDate;
        this.threadDateTxt = threadDateTxt;
        this.threadView = threadView;
        this.threadTrendView = threadTrendView;
        this.threadUpvote = threadUpvote;
        this.threadDownvote = threadDownvote;
    }
}

export default ThreadModel;