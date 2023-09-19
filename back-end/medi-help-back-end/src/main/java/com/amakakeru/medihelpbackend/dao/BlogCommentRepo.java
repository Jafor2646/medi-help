package com.amakakeru.medihelpbackend.dao;

import com.amakakeru.medihelpbackend.entity.BlogComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogCommentRepo extends JpaRepository<BlogComment, Integer> {
}
