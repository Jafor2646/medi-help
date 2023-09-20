class ThreadViewerModel {
    uploaderId: string;
    threadTitle: string;
    threadBody: string;
    threadDate: Date;
    threadDateTxt: string;
    userName: string;
    userType: string;
    threadTopics: string[];
    threadTrendView?: number;
    userPicture?: string;

    constructor( uploaderId: string, threadTitle: string, threadBody: string, threadDate: Date, threadDateTxt: string, userName: string, userType: string, threadTopics: string[], threadTrendView?: number, userPicture?: string) {
        this.uploaderId = uploaderId;
        this.threadTitle = threadTitle;
        this.threadBody = threadBody;
        this.threadDate = threadDate;
        this.threadDateTxt = threadDateTxt;
        this.threadTrendView = threadTrendView;
        this.userName = userName;
        this.userType = userType;
        this.userPicture = userPicture;
        this.threadTopics = threadTopics;
    }
}

export default ThreadViewerModel;