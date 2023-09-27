package com.amakakeru.medihelpbackend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Table(name = "blog_comment_picture")
@Data
public class BlogCommentPicture {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "picture_id")
    private Integer pictureId;

    @Column(name = "blog_comment_id")
    private String blogCommentId;

    @Column(name = "blog_comment_single_picture")
    private String blogCommentSinglePicture;
}
