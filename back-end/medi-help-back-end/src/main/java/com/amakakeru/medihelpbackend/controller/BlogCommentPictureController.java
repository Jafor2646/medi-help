package com.amakakeru.medihelpbackend.controller;


import com.amakakeru.medihelpbackend.dao.BlogCommentPictureRepo;
import com.amakakeru.medihelpbackend.entity.BlogCommentPicture;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class BlogCommentPictureController {
    @Autowired
    private BlogCommentPictureRepo blogCommentPictureRepo;

    @GetMapping("/blogCommentPicture")
    public Page<BlogCommentPicture> getAllCommentPicture(Pageable pageable){
        return blogCommentPictureRepo.findAll(pageable);
    }

    @PostMapping("/blogCommentPicture")
    public BlogCommentPicture postCommentPicture(@RequestBody BlogCommentPicture blogCommentPicture){
        return blogCommentPictureRepo.save(blogCommentPicture);
    }
}
