import axios from 'axios'

const USER_API_BASE_URL = "http://localhost:8080/api/threadCommentPicture";

class ThreadCommentPicturesService{
    postThreadCommentPicture(threadCommentPicture: any){
        return axios.post(USER_API_BASE_URL, threadCommentPicture);
    }
}

export default new ThreadCommentPicturesService()