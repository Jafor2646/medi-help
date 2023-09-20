package com.amakakeru.medihelpbackend.dao;

import com.amakakeru.medihelpbackend.entity.ThreadTopic;
import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.RequestParam;

import java.sql.Timestamp;
import java.util.Date;

public interface ThreadTopicRepo extends JpaRepository<ThreadTopic, Integer> {
    @JsonFormat(pattern="dd-MM-yyyy hh:mm:ss")
    Page<ThreadTopic> findByUploaderIdAndThreadDateTopic(String uploaderId, Date threadDateTopic, Pageable pageable);
}
