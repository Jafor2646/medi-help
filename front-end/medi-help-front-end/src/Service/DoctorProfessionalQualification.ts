import axios from 'axios'

const USER_API_BASE_URL = "http://localhost:8080/api/doctorProfessionalQualification";

class DoctorProfessionalQualificationService{
    createProfessionalQualification(doctorProfessionalQualification: any){
        return axios.post(USER_API_BASE_URL, doctorProfessionalQualification);
    }
}

export default new DoctorProfessionalQualificationService()