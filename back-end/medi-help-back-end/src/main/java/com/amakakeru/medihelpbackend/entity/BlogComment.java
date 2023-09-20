package com.amakakeru.medihelpbackend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Table(name = "blog_comment")
@Data
public class BlogComment {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "blog_comment_id")
    private Integer blog_comment_id;

    @Column(name = "replier")
    private String replier;

    @Column(name = "blog_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date blogDate;

    @Column(name = "blog_date_txt")
    private String blogDateTxt;

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
