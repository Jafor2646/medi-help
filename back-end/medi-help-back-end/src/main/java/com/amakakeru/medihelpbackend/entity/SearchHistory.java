package com.amakakeru.medihelpbackend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "search_history")
@Data
public class SearchHistory {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "search_id")
    private Integer searchId;

    @Column(name = "searcher_id")
    private String searcherId;

    @Column(name = "search_text")
    private String searchText;
}
