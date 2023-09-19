package com.amakakeru.medihelpbackend.dao;

import com.amakakeru.medihelpbackend.entity.ThreadPicture;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ThreadPictureRepo extends JpaRepository<ThreadPicture, Integer> {
}
