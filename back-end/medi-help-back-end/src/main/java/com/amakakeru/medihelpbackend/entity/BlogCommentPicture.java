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

    @Column(name = "replier")
    private String replier;

    @Column(name = "blog_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date blogDate;

    @Column(name = "blog_date_txt")
    private String blogDateTxt;

    @Column(name = "comment_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date commentDate;

    @Column(name = "comment_date_txt")
    private String commentDateTxt;

    @Column(name = "blog_comment_single_picture")
    private String blogCommentSinglePicture;
}
