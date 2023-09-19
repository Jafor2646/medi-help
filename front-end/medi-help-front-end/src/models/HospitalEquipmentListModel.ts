class HospitalEquipmentListModel {
  hospitalEquipmentId: number;
  hospitalUserId: string;
  eqipmentName: string;
  quantity: number;

  constructor(hospitalEquipmentId: number, hospitalUserId: string,eqipmentName: string, quantity: number){
    this.hospitalEquipmentId = hospitalEquipmentId;
    this.hospitalUserId = hospitalUserId;
    this.eqipmentName = eqipmentName;
    this.quantity = quantity;
  }
}
export default HospitalEquipmentListModel;