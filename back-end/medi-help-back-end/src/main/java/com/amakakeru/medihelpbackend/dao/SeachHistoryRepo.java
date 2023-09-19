package com.amakakeru.medihelpbackend.dao;

import com.amakakeru.medihelpbackend.entity.SearchHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SeachHistoryRepo extends JpaRepository<SearchHistory, Integer> {
}
