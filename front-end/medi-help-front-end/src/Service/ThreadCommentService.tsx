import axios from 'axios'

const USER_API_BASE_URL = "http://localhost:8080/api/threadComments";

class ThreadCommentService{
    postThreadComment(threadComment: any){
        return axios.post(USER_API_BASE_URL, threadComment);
    }
}

export default new ThreadCommentService()