package com.amakakeru.medihelpbackend.entity;

import jakarta.persistence.*;
import lombok.Data;

import javax.lang.model.element.Name;
import java.util.Date;

@Entity
@Table(name="rating")
@Data
public class Rating {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "rating_id")
    private Integer ratingId;

    @Column(name = "rating_uploader")
    private String ratingUploader;

    @Column(name = "rating_getter")
    private String ratingGetter;

    @Column(name = "rating_value")
    private Double ratingValue;

    @Column(name = "rating_time")
    @Temporal(TemporalType.TIMESTAMP)
    private Date ratingTime;

    @Column(name = "rating_text")
    private String ratingText;

    @Column(name = "rating_picture")
    private String ratingPicture;
}
