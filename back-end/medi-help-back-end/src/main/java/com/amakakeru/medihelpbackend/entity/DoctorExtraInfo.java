package com.amakakeru.medihelpbackend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "doctor_extra_info")
@Data
public class DoctorExtraInfo {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "doctor_user_id")
    private String doctor_user_id;

    @Column(name = "medical_registration_number")
    private String medical_registration_number;

    @Column(name = "city")
    private String city;

    @Column(name = "current_rating")
    private Double current_rating;

}
