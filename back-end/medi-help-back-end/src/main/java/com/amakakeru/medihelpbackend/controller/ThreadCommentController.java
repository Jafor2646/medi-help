package com.amakakeru.medihelpbackend.controller;

import com.amakakeru.medihelpbackend.dao.ThreadCommentRepo;
import com.amakakeru.medihelpbackend.entity.ThreadComment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class ThreadCommentController {
    @Autowired
    private ThreadCommentRepo threadCommentRepo;

    @GetMapping("/threadComments")
    public Page<ThreadComment> getAllThreadComments(Pageable pageable){
        return threadCommentRepo.findAll(pageable);
    }

    @PostMapping("/threadComments")
    public ThreadComment postThreadComment(@RequestBody ThreadComment threadComment){
        return threadCommentRepo.save(threadComment);
    }
}
