package com.amakakeru.medihelpbackend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Table(name = "blog_picture")
@Data
public class BlogPicture {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "picture_id")
    private Integer pictureId;

    @Column(name = "uploader_id")
    private String uploaderId;

    @Column(name = "blog_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date blogDate;

    @Column(name = "blog_date_txt")
    private String blogDateTxt;

    @Column(name = "blog_single_picture")
    private String blogSinglePicture;
}
