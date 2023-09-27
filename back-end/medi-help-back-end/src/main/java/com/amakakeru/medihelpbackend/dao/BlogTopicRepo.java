package com.amakakeru.medihelpbackend.dao;

import com.amakakeru.medihelpbackend.entity.BlogTopic;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogTopicRepo extends JpaRepository<BlogTopic, Integer> {
    Page<BlogTopic> findByUploaderIdAndBlogDateTopicTxt(String uploaderId, String blogDateTopicTxt, Pageable pageable);
}
