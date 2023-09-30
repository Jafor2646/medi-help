import axios from 'axios'

const USER_API_BASE_URL = "http://localhost:8080/api/hospitalEquipmentList";

class HospitalEquipmentListService{
    createTest(test: any){
        return axios.post(USER_API_BASE_URL, test);
    }
}

export default new HospitalEquipmentListService()