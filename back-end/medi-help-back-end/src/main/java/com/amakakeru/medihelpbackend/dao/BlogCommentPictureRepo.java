package com.amakakeru.medihelpbackend.dao;

import com.amakakeru.medihelpbackend.entity.BlogCommentPicture;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogCommentPictureRepo extends JpaRepository<BlogCommentPicture, Integer> {
    Page<BlogCommentPicture> findAllByBlogCommentId(Integer blogCommentId, Pageable pageable);
}
