class DoctorSpecialitiesModel {
  specialityId: number;
  doctorId: string;
  speciality: string;
  
  

  constructor(specialityId: number, doctorId: string, speciality: string) {
    this.specialityId = specialityId; 
    this.doctorId = doctorId;
    this.speciality = speciality;
  }
}

export default DoctorSpecialitiesModel;