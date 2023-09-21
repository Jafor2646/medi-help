package com.amakakeru.medihelpbackend.dao;

import com.amakakeru.medihelpbackend.entity.ThreadPicture;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ThreadPictureRepo extends JpaRepository<ThreadPicture, Integer> {
    Page<ThreadPicture> findAllByThreadDateTxtAndUploaderId(String threadDateTxt, String uploaderId, Pageable pageable);
}
