package com.amakakeru.medihelpbackend.entity;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "doctor_educational_qualification")
@Data
public class DoctorEducationalQualification {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "doctor_id_auto")
    private Integer doctor_id_auto;

    @Column(name = "doctor_user_id")
    private String doctor_user_id;

    @Column(name = "degree_title")
    private String degree_title;

    @Column(name = "institution")
    private String institution;

    @Column(name = "passing_year")
    private Integer passing_year;
}
