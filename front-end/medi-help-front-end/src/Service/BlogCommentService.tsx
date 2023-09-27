import axios from 'axios'

const USER_API_BASE_URL = "http://localhost:8080/api/blogComments";

class BlogCommentService{
    postBlogComment(blogComment: any){
        return axios.post(USER_API_BASE_URL, blogComment);
    }
}

export default new BlogCommentService()