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
    private Integer doctorIdAuto;

    @Column(name = "doctor_user_id")
    private String doctorUserId;

    @Column(name = "degree_title")
    private String degreeTitle;

    @Column(name = "institution")
    private String institution;

    @Column(name = "passing_year")
    private Integer passingYear;
}
