package com.amakakeru.medihelpbackend.entity;

import lombok.Data;
import jakarta.persistence.*;

@Entity
@Table(name = "hospital_extra_info")
@Data
public class HospitalUser {
    @Id
    @Column(name = "hospital_user_id")
    private String hospital_user_id;

    @Column(name = "website")
    private String website;

    @Column(name = "bio")
    private String bio;
}
