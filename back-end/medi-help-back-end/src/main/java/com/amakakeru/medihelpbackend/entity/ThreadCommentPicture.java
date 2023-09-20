package com.amakakeru.medihelpbackend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Table(name = "thread_comment_picture")
@Data
public class ThreadCommentPicture {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "picture_id")
    private Integer pictureId;

    @Column(name = "replier")
    private String  replier;

    @Column(name = "thread_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date threadDate;

    @Column(name = "thread_date_txt")
    private String threadDateTxt;

    @Column(name = "comment_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date commentDate;

    @Column(name = "comment_date_txt")
    private String commentDateTxt;

    @Column(name = "thread_comment_single_picture")
    private String threadCommentSinglePicture;

}
