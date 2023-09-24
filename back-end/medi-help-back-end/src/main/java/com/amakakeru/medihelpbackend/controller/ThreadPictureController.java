package com.amakakeru.medihelpbackend.controller;


import com.amakakeru.medihelpbackend.dao.ThreadPictureRepo;
import com.amakakeru.medihelpbackend.entity.ThreadPicture;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class ThreadPictureController {

    @Autowired
    private ThreadPictureRepo threadPictureRepo;

    @GetMapping("/threadPictures")
    public Page<ThreadPicture> getAllThreadPictures(Pageable pageable){

        return threadPictureRepo.findAll(pageable);
    }

    @PostMapping("/threadPictures")
    public ThreadPicture createThreadPicture(@RequestBody ThreadPicture threadPicture){
        return threadPictureRepo.save(threadPicture);
    }

}