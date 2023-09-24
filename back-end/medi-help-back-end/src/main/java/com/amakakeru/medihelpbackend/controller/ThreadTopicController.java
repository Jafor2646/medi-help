package com.amakakeru.medihelpbackend.controller;


import com.amakakeru.medihelpbackend.dao.ThreadPictureRepo;
import com.amakakeru.medihelpbackend.dao.ThreadTopicRepo;
import com.amakakeru.medihelpbackend.entity.ThreadPicture;
import com.amakakeru.medihelpbackend.entity.ThreadTopic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class ThreadTopicController {

    @Autowired
    private ThreadTopicRepo threadTopicRepo;

    @GetMapping("/threadTopics")
    public Page<ThreadTopic> getAllThreadPTopic(Pageable pageable){

        return threadTopicRepo.findAll(pageable);
    }

    @PostMapping("/threadTopics")
    public ThreadTopic createThreadTopic(@RequestBody ThreadTopic threadTopic){
        return threadTopicRepo.save(threadTopic);
    }

}