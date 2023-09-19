class DoctorEducationalQualificationModel {
  doctorIdAuto: number;
  doctorUserId: string;
  degreeTitle: string;
  institution: string;
  passingYear: number;

  constructor(doctorIdAuto: number, doctorUserId: string,degreeTitle: string, institution: string, passingYear: number){
    this.doctorIdAuto = doctorIdAuto;
    this.doctorUserId = doctorUserId;
    this.degreeTitle = degreeTitle;
    this.institution = institution;
    this.passingYear = passingYear;
  }
}
export default DoctorEducationalQualificationModel;