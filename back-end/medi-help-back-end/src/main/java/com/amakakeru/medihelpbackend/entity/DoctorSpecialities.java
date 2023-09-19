package com.amakakeru.medihelpbackend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "doctor_specialities")
public class DoctorSpecialities {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "speciality_id")
    private Integer speciality_id;

    @Column(name = "doctor_id")
    private String doctor_id;

    @Column(name = "speciality")
    private String speciality;
}
