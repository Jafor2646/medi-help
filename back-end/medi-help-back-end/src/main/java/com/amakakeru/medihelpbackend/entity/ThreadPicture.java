package com.amakakeru.medihelpbackend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;

@Entity
@Table(name = "thread_picture")
@Data
public class ThreadPicture {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "picture_id")
    private Integer picture_id;

    @Column(name = "uploader_id")
    private String uploader_id;

    @Column(name = "thread_date")
    private Date thread_date;

    @Column(name = "thread_single_picture")
    private String thread_single_picture;
}
