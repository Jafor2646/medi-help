package com.amakakeru.medihelpbackend.dao;

import com.amakakeru.medihelpbackend.entity.Blog;
import com.amakakeru.medihelpbackend.entity.Thread;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BlogRepo extends JpaRepository<Blog, Integer> {

    Page<Blog> findByUploaderIdAndBlogDateTxt(String uploaderId, String blogDateTxt, Pageable pageable);
    List<Blog> findBlogByBlogId(Long blogId);

}
