import axios from 'axios'

const USER_API_BASE_URL = "http://localhost:8080/api/doctorEducationalQualification";

class DoctorEducationalQualificationService{
    createEducationalQualification(doctorEducationalQualification: any){
        return axios.post(USER_API_BASE_URL, doctorEducationalQualification);
    }
}

export default new DoctorEducationalQualificationService()