class DoctorEducationalQualificationModel {
  doctorUserId: string;
  degreeTitle: string;
  institution: string;
  passingYear: number;

  constructor(doctorUserId: string,degreeTitle: string, institution: string, passingYear: number){
    this.doctorUserId = doctorUserId;
    this.degreeTitle = degreeTitle;
    this.institution = institution;
    this.passingYear = passingYear;
  }
}
export default DoctorEducationalQualificationModel;