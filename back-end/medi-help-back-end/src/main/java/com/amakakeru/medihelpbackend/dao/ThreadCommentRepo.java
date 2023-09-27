package com.amakakeru.medihelpbackend.dao;

import com.amakakeru.medihelpbackend.entity.ThreadComment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ThreadCommentRepo extends JpaRepository<ThreadComment, Integer> {

    Page<ThreadComment> findAllByThreadId(Integer threadId, Pageable pageable);

}
