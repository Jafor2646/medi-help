package com.amakakeru.medihelpbackend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Table(name = "blog_history")
@Data
public class Blog {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "blog_id")
    private Integer blogId;

    @Column(name = "uploader_id")
    private String uploaderId;

    @Column(name = "blog_title")
    private String blogTitle;

    @Column(name = "blog_body")
    private String blogBody;

    @Column(name = "blog_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date blogDate;

    @Column(name = "blog_date_txt")
    private String blogDateTxt;

    @Column(name = "blog_view")
    private Integer blogView;

    @Column(name = "blog_trend_view")
    private Integer blogTrendView;

    @Column(name = "blog_upvote")
    private Integer blogUpvote;

    @Column(name = "blog_downvote")
    private Integer blogDownvote;
}
