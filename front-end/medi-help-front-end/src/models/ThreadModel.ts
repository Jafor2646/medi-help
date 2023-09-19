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

    constructor(thread_id: number, uploader_id: string, thread_title: string, thread_body: string, thread_date: Date, thread_view: number,thread_trend_view: number, thread_upvote: number, thread_downvote: number) {
        this.threadId = thread_id;
        this.uploaderId = uploader_id;
        this.threadTitle = thread_title;
        this.threadBody = thread_body;
        this.threadDate = thread_date;
        this.threadView = thread_view;
        this.threadTrendView = thread_trend_view;
        this.threadUpvote = thread_upvote;
        this.threadDownvote = thread_downvote;
    }
}

export default ThreadModel;