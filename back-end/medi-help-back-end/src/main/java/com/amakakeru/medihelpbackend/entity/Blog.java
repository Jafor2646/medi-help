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
    private Integer blog_id;

    @Column(name = "uploader_id")
    private String uploader_id;

    @Column(name = "blog_title")
    private String blog_title;

    @Column(name = "blog_body")
    private String blog_body;

    @Column(name = "blog_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date blog_date;

    @Column(name = "blog_view")
    private Integer blog_view;

    @Column(name = "blog_trend_view")
    private Integer blog_trend_view;

    @Column(name = "blog_upvote")
    private Integer blog_upvote;

    @Column(name = "blog_downvote")
    private Integer blog_downvote;
}
