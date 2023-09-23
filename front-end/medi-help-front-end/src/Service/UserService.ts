import axios from 'axios'

const USER_API_BASE_URL = "http://localhost:8080/api/users";

class UserService{
    createUser(user: any){
        return axios.post(USER_API_BASE_URL, user);
    }
}

export default new UserService()