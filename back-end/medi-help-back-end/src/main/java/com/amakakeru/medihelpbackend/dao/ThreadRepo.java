package com.amakakeru.medihelpbackend.dao;

import com.amakakeru.medihelpbackend.entity.Thread;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ThreadRepo extends JpaRepository<Thread, Long> {
    Page<Thread> findByUploaderIdAndThreadDateTxt(String uploaderId, String threadDateTxt, Pageable pageable);
    List<Thread> findThreadByThreadId(Long threadId);
}
