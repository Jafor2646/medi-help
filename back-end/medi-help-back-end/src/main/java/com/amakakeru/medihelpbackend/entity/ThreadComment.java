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
    private Integer commentId;

    @Column(name = "replier")
    private String replier;

    @Column(name = "thread_id")
    private Integer threadId;

    @Column(name = "comment_body")
    private String commentBody;

    @Column(name = "comment_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date commentDate;

    @Column(name = "comment_date_txt")
    private String commentDateTxt;

    @Column(name = "comment_upvote")
    private Integer commentUpvote;

    @Column(name = "comment_downvote")
    private Integer commentDownvote;

}
