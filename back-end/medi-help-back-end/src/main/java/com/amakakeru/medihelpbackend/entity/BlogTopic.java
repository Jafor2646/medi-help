package com.amakakeru.medihelpbackend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Table(name = "blog_topic")
@Data
public class BlogTopic {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "topic_id")
    private Integer topicId;

    @Column(name = "uploader_id")
    private String uploaderId;

    @Column(name = "blog_date_topic")
    @Temporal(TemporalType.TIMESTAMP)
    private Date blogDateTopic;

    @Column(name = "blog_date_topic_txt")
    private String blogDateTopicTxt;

    @Column(name = "topic_title")
    private String topicTitle;
}
