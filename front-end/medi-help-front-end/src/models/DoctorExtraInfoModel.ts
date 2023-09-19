class DoctorExtraInfoModel {
  doctorUserId: number;
  medicalRegistrationNumber: string;
  city: string;
  currentRating?: number;

  constructor(doctorUserId: number, medicalRegistrationNumber: string,city: string, currentRating: number){
    this.doctorUserId = doctorUserId;
    this.medicalRegistrationNumber = medicalRegistrationNumber;
    this.city = city;
    this.currentRating = currentRating;
  }
}
export default DoctorExtraInfoModel;