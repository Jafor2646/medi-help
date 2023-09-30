class HospitalEquipmentListModel {
  hospitalEquipmentId: number;
  hospitalUserId: string;
  equipmentName: string;
  quantity: number;

  constructor(hospitalEquipmentId: number, hospitalUserId: string,equipmentName: string, quantity: number){
    this.hospitalEquipmentId = hospitalEquipmentId;
    this.hospitalUserId = hospitalUserId;
    this.equipmentName = equipmentName;
    this.quantity = quantity;
  }
}
export default HospitalEquipmentListModel;