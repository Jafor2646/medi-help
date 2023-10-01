class DoctorProfessionalQualificationModel {
  currentlyWorkingHospitalInfoId: string;
  doctorUserId: string;
  startingYear: number;
  endingYear?: number;

  constructor( currentlyWorkingHospitalInfoId: string,doctorUserId: string, startingYear: number, endingYear?: number){
    this.currentlyWorkingHospitalInfoId = currentlyWorkingHospitalInfoId;
    this.doctorUserId = doctorUserId;
    this.startingYear = startingYear;
    this.endingYear = endingYear;
  }
}
export default DoctorProfessionalQualificationModel;