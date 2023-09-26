import axios from 'axios'

const USER_API_BASE_URL = "http://localhost:8080/api/threads";

class ThreadService{
    postThread(thread: any){
        return axios.post(USER_API_BASE_URL, thread);
    }
}

export default new ThreadService()