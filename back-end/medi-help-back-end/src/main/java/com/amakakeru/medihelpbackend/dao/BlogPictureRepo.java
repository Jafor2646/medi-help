package com.amakakeru.medihelpbackend.dao;

import com.amakakeru.medihelpbackend.entity.BlogPicture;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogPictureRepo extends JpaRepository<BlogPicture, Integer> {
    Page<BlogPicture> findAllByBlogDateTxtAndUploaderId(String blogDateTxt, String uploaderId, Pageable pageable);
}
