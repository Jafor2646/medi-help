class DoctorExtraInfoModel {
  doctorUserId: string;
  medicalRegistrationNumber: string;
  city: string;
  verified?: boolean;
  currentRating?: number;
  constructor(doctorUserId: string, medicalRegistrationNumber: string,city: string, verified: boolean, currentRating: number){
    this.doctorUserId = doctorUserId;
    this.medicalRegistrationNumber = medicalRegistrationNumber;
    this.city = city;
    this.verified = verified;
    this.currentRating = currentRating;
  }
}
export default DoctorExtraInfoModel;