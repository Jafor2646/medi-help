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
    private Integer thread_id;

    @Column(name = "uploader_id")
    private String uploader_id;

    @Column(name = "thread_title")
    private String thread_title;

    @Column(name = "thread_body")
    private String thread_body;

    @Column(name = "thread_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date thread_date;

    @Column(name = "thread_view")
    private Integer thread_view;

    @Column(name = "thread_trend_view")
    private Integer thread_trend_view;

    @Column(name = "thread_upvote")
    private Integer thread_upvote;

    @Column(name = "thread_downvote")
    private Integer thread_downvote;

}
