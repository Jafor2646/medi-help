package com.amakakeru.medihelpbackend.entity;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "topic_table")
@Data
public class TopicTable {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "topic_id")
    private Long topicId;

    @Column(name = "topic_name")
    private String topicName;
}
