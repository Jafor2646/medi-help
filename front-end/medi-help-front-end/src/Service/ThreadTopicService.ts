import axios from 'axios'

const USER_API_BASE_URL = "http://localhost:8080/api/threadTopics";

class ThreadTopicService{
    createThreadTopic(threadTopic: any){
        return axios.post(USER_API_BASE_URL, threadTopic);
    }
}

export default new ThreadTopicService()