class HospitalExtraInfoModel {
  hospitalUserId: string;
  website?: string;
  bio?: string;
  status?: string;
  governanceDetails?: string;

  constructor(hospitalUserId: string, website?: string, bio?: string, status?: string, governanceDetails?: string){
    this.hospitalUserId = hospitalUserId;
    this.website = website;
    this.bio = bio;
    this.status = status;
    this.governanceDetails = governanceDetails;
  }
}
export default HospitalExtraInfoModel;