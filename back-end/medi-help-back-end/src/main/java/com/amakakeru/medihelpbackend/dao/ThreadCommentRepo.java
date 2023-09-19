package com.amakakeru.medihelpbackend.dao;

import com.amakakeru.medihelpbackend.entity.ThreadComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ThreadCommentRepo extends JpaRepository<ThreadComment, Integer> {
}
