package com.amakakeru.medihelpbackend.entity;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "hospital_equipment_list")
@Data
public class HospitalEquipmentList {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="hospital_equipment_id")
    private Integer hospitalEquipmentId;

    @Column(name = "hospital_user_id")
    private String hospitalUserId;

    @Column(name = "equipment_name")
    private String equipmentName;

    @Column(name = "quantity")
    private Integer quantity;
}
