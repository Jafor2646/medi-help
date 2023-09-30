import axios from 'axios'

const USER_API_BASE_URL = "http://localhost:8080/api/hospitalExtraInfoes";

class HospitalExtraInfoService{

    createHospitalExtraInfo(hospitalExtraInfo: any){
        return axios.post(USER_API_BASE_URL, hospitalExtraInfo);
    }

    addBio (userId: any, newBio: string){
        return axios.put(USER_API_BASE_URL + '/addBio/' + userId, { bio: newBio });
    }
    addWebsite (userId: any, newWebsite: string){
        return axios.put(USER_API_BASE_URL + '/addWebsite/' + userId, { website: newWebsite });
    }
    addGovernanceDetails (userId: any, newgovernanceDetails: string){
        return axios.put(USER_API_BASE_URL + '/addGovernanceDetails/' + userId, { governanceDetails: newgovernanceDetails });
    }
}

export default new HospitalExtraInfoService()