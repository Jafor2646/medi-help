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
    private Integer hospital_equipment_id;

    @Column(name = "hospital_user_id")
    private String hospital_user_id;

    @Column(name = "equipment_name")
    private String equipment_name;

    @Column(name = "quantity")
    private Integer quantity;
}
