import axios from 'axios'

const USER_API_BASE_URL = "http://localhost:8080/api/threadPictures";

class ThreadPictureService{
    createThreadPicture(threadPicture: any){
        return axios.post(USER_API_BASE_URL, threadPicture);
    }
}

export default new ThreadPictureService()