class BlogViewerModel {
    uploaderId: string;
    blogTitle: string;
    blogBody: string;
    blogDate: Date;
    blogDateTxt: string;
    userName: string;
    userType: string;
    blogTopics: string[];
    blogTrendView?: number;
    userPicture?: string;

    constructor( uploaderId: string, blogTitle: string, blogBody: string, blogDate: Date, blogDateTxt: string, userName: string, userType: string, blogTopics: string[], blogTrendView?: number, userPicture?: string) {
        this.uploaderId = uploaderId;
        this.blogTitle = blogTitle;
        this.blogBody = blogBody;
        this.blogDate = blogDate;
        this.blogDateTxt = blogDateTxt;
        this.blogTrendView = blogTrendView;
        this.userName = userName;
        this.userType = userType;
        this.userPicture = userPicture;
        this.blogTopics = blogTopics;
    }
}

export default BlogViewerModel;