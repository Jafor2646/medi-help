import axios from 'axios'

const USER_API_BASE_URL = "http://localhost:8080/api/threads";

class ThreadService{
    postThread(thread: any){
        return axios.post(USER_API_BASE_URL, thread);
    }

    upvoteAdded(threadId: any){
        return axios.put(USER_API_BASE_URL + '/upvote/' + threadId);
    }
    downvoteAdded(threadId: any){
        return axios.put(USER_API_BASE_URL + '/downvote/' + threadId);
    }

    viewAdded(threadId: any){
        return axios.put(USER_API_BASE_URL + '/viewCount/' + threadId);
    }
}

export default new ThreadService()