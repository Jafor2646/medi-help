import axios from 'axios'

const USER_API_BASE_URL = "http://localhost:8080/api/blogPictures";

class BlogPictureService{
    createBlogPicture(blogPicture: any){
        return axios.post(USER_API_BASE_URL, blogPicture);
    }
}

export default new BlogPictureService()