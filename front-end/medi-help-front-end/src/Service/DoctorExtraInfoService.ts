import axios from 'axios'

const USER_API_BASE_URL = "http://localhost:8080/api/doctorExtraInfoes";

class DoctorExtraInfoService{
    createDoctorExtraInfo(doctorExtraInfo: any){
        return axios.post(USER_API_BASE_URL, doctorExtraInfo);
    }
}

export default new DoctorExtraInfoService()