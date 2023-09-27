import axios from 'axios'

const USER_API_BASE_URL = "http://localhost:8080/api/blogCommentPicture";

class BlogCommentPicturesService{
    postBlogCommentPicture(blogCommentPicture: any){
        return axios.post(USER_API_BASE_URL, blogCommentPicture);
    }
}

export default new BlogCommentPicturesService()