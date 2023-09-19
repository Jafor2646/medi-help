package com.amakakeru.medihelpbackend.entity;

import jakarta.persistence.*;
import lombok.Data;

import javax.lang.model.element.Name;

@Entity
@Table(name = "doctor_professional_qualification")
@Data
public class DoctorProfessionalQualification {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "doctor_profession_id")
    private Integer doctorProfessionId;

    @Column(name = "currently_working_hospital_info_id")
    private String currentlyWorkingHospitalInfoId;

    @Column(name = "doctor_user_id")
    private String doctorUserId;

    @Column(name = "starting_year")
    private Integer startingYear;

    @Column(name = "ending_year")
    private Integer endingYear;
}
