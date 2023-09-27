import axios from 'axios'

const USER_API_BASE_URL = "http://localhost:8080/api/blogTopics";

class BlogTopicService{
    createBlogTopic(blogTopic: any){
        return axios.post(USER_API_BASE_URL, blogTopic);
    }
}

export default new BlogTopicService()