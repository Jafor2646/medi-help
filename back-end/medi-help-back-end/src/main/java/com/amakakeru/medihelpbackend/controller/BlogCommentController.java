package com.amakakeru.medihelpbackend.controller;


import com.amakakeru.medihelpbackend.dao.BlogCommentRepo;
import com.amakakeru.medihelpbackend.entity.BlogComment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class BlogCommentController {
    @Autowired
    private BlogCommentRepo blogCommentRepo;

    @GetMapping("/blogComments")
    public Page<BlogComment> getAllBlogComments(Pageable pageable){
        return blogCommentRepo.findAll(pageable);
    }

    @PostMapping("/blogComments")
    public BlogComment postBlogComment(@RequestBody BlogComment blogComment) {
        return blogCommentRepo.save(blogComment);
    }
}
