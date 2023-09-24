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
    private Integer pictureId;

    @Column(name = "uploader_id")
    private String uploaderId;

    @Column(name = "thread_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date threadDate;

    @Column(name = "thread_date_txt")
    private String threadDateTxt;

    @Column(name = "thread_single_picture")
    private String threadSinglePicture;
}
