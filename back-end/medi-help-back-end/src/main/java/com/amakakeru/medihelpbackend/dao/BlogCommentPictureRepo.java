package com.amakakeru.medihelpbackend.dao;

import com.amakakeru.medihelpbackend.entity.BlogCommentPicture;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogCommentPictureRepo extends JpaRepository<BlogCommentPicture, Integer> {
}
