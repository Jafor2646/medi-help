package com.amakakeru.medihelpbackend.dao;

import com.amakakeru.medihelpbackend.entity.ThreadCommentPicture;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ThreadCommentPictureRepo extends JpaRepository<ThreadCommentPicture, Integer> {
    Page<ThreadCommentPicture> findAllByCommentId(Integer commentId, Pageable pageable);
}
