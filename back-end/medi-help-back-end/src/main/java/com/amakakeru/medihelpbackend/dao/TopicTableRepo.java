package com.amakakeru.medihelpbackend.dao;

import com.amakakeru.medihelpbackend.entity.TopicTable;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TopicTableRepo extends JpaRepository<TopicTable, Long> {
}
