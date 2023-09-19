package com.amakakeru.medihelpbackend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Table(name = "thread_topic")
@Data
public class ThreadTopic {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "topic_id")
    private Integer topic_id;

    @Column(name = "uploader_id")
    private String uploader_id;

    @Column(name = "thread_date_topic")
    private Date thread_date_topic;

    @Column(name = "topic_title")
    private String topic_title;
}
