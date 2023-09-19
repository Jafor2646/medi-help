package com.amakakeru.medihelpbackend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "following_table")
@Data
public class FollowingTable {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "follow_id")
    private Integer followId;

    @Column(name = "follower_id")
    private String followerId;

    @Column(name = "following_id")
    private String followingId;
}
