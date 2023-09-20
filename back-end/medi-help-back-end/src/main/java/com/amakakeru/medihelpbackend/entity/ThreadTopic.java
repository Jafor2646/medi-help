package com.amakakeru.medihelpbackend.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.sql.Timestamp;
import java.util.Date;

@Entity
@Table(name = "thread_topic")
@Data
public class ThreadTopic {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "topic_id")
    private Integer topicId;

    @Column(name = "uploader_id")
    private String uploaderId;

    @Column(name = "thread_date_topic")
    @Temporal(TemporalType.TIMESTAMP)
    private Date threadDateTopic;

    @Column(name = "thread_date_topic_txt")
    private String threadDateTopicTxt;

    @Column(name = "topic_title")
    private String topicTitle;
}
