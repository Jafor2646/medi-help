package com.amakakeru.medihelpbackend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Table(name = "thread_history")
@Data
public class Thread {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "thread_id")
    private Long threadId;

    @Column(name = "uploader_id")
    private String uploaderId;

    @Column(name = "thread_title")
    private String threadTitle;

    @Column(name = "thread_body")
    private String threadBody;

    @Column(name = "thread_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date threadDate;

    @Column(name = "thread_date_txt")
    private String threadDateTxt;

    @Column(name = "thread_view")
    private Integer threadView;

    @Column(name = "thread_trend_view")
    private Integer threadTrendView;

    @Column(name = "thread_upvote")
    private Integer threadUpvote;

    @Column(name = "thread_downvote")
    private Integer threadDownvote;

}
