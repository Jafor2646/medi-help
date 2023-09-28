package com.amakakeru.medihelpbackend.dao;

import com.amakakeru.medihelpbackend.entity.BlogComment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogCommentRepo extends JpaRepository<BlogComment, Integer> {

    Page<BlogComment> findAllByBlogId(Integer blogId, Pageable pageable);
}
