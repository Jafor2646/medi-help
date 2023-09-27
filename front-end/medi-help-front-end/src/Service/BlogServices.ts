import axios from 'axios'

const USER_API_BASE_URL = "http://localhost:8080/api/blogs";

class BlogService{
    postBlog(blog: any){
        return axios.post(USER_API_BASE_URL, blog);
    }

    upvoteAdded(blogId: any){
        return axios.put(USER_API_BASE_URL + '/upvote/' + blogId);
    }
    downvoteAdded(blogId: any){
        return axios.put(USER_API_BASE_URL + '/downvote/' + blogId);
    }

    viewAdded(blogId: any){
        return axios.put(USER_API_BASE_URL + '/viewCount/' + blogId);
    }
}

export default new BlogService()