package com.amakakeru.medihelpbackend.entity;

import lombok.Data;
import jakarta.persistence.*;

@Entity
@Table(name = "hospital_extra_info")
@Data
public class HospitalExtraInfo {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "hospital_user_id")
    private String hospitalUserId;

    @Column(name = "website")
    private String website;

    @Column(name = "bio")
    private String bio;

    @Column(name = "status")
    private String status;

    @Column(name = "governance_details")
    private String governanceDetails;
}
