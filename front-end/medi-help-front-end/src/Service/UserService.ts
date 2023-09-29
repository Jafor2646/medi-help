import axios from 'axios'

const USER_API_BASE_URL = "http://localhost:8080/api/users";

class UserService{
    createUser(user: any){
        return axios.post(USER_API_BASE_URL, user);
    }

    dpChanged (userId: any, newDp: string){
        return axios.put(USER_API_BASE_URL + '/changeDP/' + userId, { picture: newDp });
    }

    addressChanged (userId: any, newAddress: string){
        return axios.put(USER_API_BASE_URL + '/changeAddress/' + userId, { address: newAddress });
    }
    phoneChanged (userId: any, newPhone: string){
        return axios.put(USER_API_BASE_URL + '/changePhone/' + userId, { phone: newPhone });
    }
}

export default new UserService()