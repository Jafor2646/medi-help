class DoctorProfessionalQualificationModel {
  doctorProfessionId: number;
  currentlyWorkingHospitalInfoId: string;
  doctorUserId: string;
  startingYear: number;
  endingYear?: number;

  constructor(doctorProfessionId: number, currentlyWorkingHospitalInfoId: string,doctorUserId: string, startingYear: number, endingYear: number){
    this.doctorProfessionId = doctorProfessionId;
    this.currentlyWorkingHospitalInfoId = currentlyWorkingHospitalInfoId;
    this.doctorUserId = doctorUserId;
    this.startingYear = startingYear;
    this.endingYear = endingYear;
  }
}
export default DoctorProfessionalQualificationModel;