package com.amakakeru.medihelpbackend.controller;

import com.amakakeru.medihelpbackend.dao.ThreadCommentPictureRepo;
import com.amakakeru.medihelpbackend.entity.ThreadCommentPicture;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class ThreadCommentPictureController {
    @Autowired
    private ThreadCommentPictureRepo threadCommentPictureRepo;

    @GetMapping("/threadCommentPicture")
    public Page<ThreadCommentPicture> getAllCommentPicture(Pageable pageable){
        return threadCommentPictureRepo.findAll(pageable);
    }

    @PostMapping("/threadCommentPicture")
    public ThreadCommentPicture postCommentPicture(@RequestBody ThreadCommentPicture threadCommentPicture){
        return threadCommentPictureRepo.save(threadCommentPicture);
    }
}
