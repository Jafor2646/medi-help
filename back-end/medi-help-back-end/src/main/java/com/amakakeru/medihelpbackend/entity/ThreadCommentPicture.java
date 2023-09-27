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

    @Column(name = "comment_id")
    private String  commentId;

    @Column(name = "thread_comment_single_picture")
    private String threadCommentSinglePicture;

}
