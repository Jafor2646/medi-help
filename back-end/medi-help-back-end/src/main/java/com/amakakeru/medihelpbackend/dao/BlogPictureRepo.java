package com.amakakeru.medihelpbackend.dao;

import com.amakakeru.medihelpbackend.entity.BlogPicture;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogPictureRepo extends JpaRepository<BlogPicture, Integer> {
}
