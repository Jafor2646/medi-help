package com.amakakeru.medihelpbackend.dao;

import com.amakakeru.medihelpbackend.entity.ThreadTopic;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ThreadTopicRepo extends JpaRepository<ThreadTopic, Integer> {
}
