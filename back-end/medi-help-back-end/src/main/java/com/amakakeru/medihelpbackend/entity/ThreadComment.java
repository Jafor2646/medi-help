package com.amakakeru.medihelpbackend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Table(name = "thread_comment")
@Data
public class ThreadComment {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Integer comment_id;

    @Column(name = "replier")
    private String replier;

    @Column(name = "thread_date")
    private Date thread_date;

    @Column(name = "comment_body")
    private String comment_body;

    @Column(name = "comment_date")
    private Date comment_date;

    @Column(name = "comment_upvote")
    private Integer comment_upvote;

    @Column(name = "comment_downvote")
    private Integer comment_downvote;

}
