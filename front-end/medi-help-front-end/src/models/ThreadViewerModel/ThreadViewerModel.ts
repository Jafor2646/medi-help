class ThreadViewerModel {
    uploaderId: string;
    threadTitle: string;
    threadBody: string;
    threadDate: Date;
    threadTrendView?: number;
    userName: string;
    userType: string;
    userPicture?: string;

    constructor( uploaderId: string, threadTitle: string, threadBody: string, threadDate: Date, userName: string, userType: string, threadTrendView?: number, userPicture?: string) {
        this.uploaderId = uploaderId;
        this.threadTitle = threadTitle;
        this.threadBody = threadBody;
        this.threadDate = threadDate;
        this.threadTrendView = threadTrendView;
        this.userName = userName;
        this.userType = userType;
        this.userPicture = userPicture;

    }
}

export default ThreadViewerModel;