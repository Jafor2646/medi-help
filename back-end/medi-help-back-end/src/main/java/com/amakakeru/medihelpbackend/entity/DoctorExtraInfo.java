package com.amakakeru.medihelpbackend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "doctor_extra_info")
@Data
public class DoctorExtraInfo {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "doctor_extra_info_id")
    private Long doctorExtraInfoId;

    @Column(name = "doctor_user_id")
    private String doctorUserId;

    @Column(name = "medical_registration_number")
    private String medicalRegistrationNumber;

    @Column(name = "city")
    private String city;

    @Column(name = "verified")
    private  Boolean verified;

    @Column(name = "current_rating")
    private Double currentRating;
}
