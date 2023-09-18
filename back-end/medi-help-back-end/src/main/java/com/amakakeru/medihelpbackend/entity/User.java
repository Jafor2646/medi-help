package com.amakakeru.medihelpbackend.entity;

import lombok.Data;
import jakarta.persistence.*;

@Entity
@Table(name = "user")
@Data
public class User {
    @Id
    @Column(name = "user_id")
    private String user_id;

    @Column(name = "user_name")
    private String user_name;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "address")
    private String address;

    @Column(name = "phone")
    private String phone;

    @Column(name = "user_type")
    private String user_type;

    @Column(name = "picture")
    private String picture;

}
