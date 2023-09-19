package com.amakakeru.medihelpbackend.dao;

import com.amakakeru.medihelpbackend.entity.BlogTopic;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogTopicRepo extends JpaRepository<BlogTopic, Integer> {
}
