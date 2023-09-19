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
    private Integer doctor_profession_id;

    @Column(name = "currently_working_hospital_info_id")
    private String currently_working_hospital_info_id;

    @Column(name = "doctor_user_id")
    private String doctor_user_id;

    @Column(name = "starting_year")
    private Integer starting_year;

    @Column(name = "ending_year")
    private Integer ending_year;
}
