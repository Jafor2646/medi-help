package com.amakakeru.medihelpbackend.controller;


import com.amakakeru.medihelpbackend.dao.BlogPictureRepo;
import com.amakakeru.medihelpbackend.entity.BlogPicture;
import com.amakakeru.medihelpbackend.entity.ThreadPicture;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class BlogPictureController {
    @Autowired
    private BlogPictureRepo blogPictureRepo;

    @GetMapping("/blogPictures")
    public Page<BlogPicture> getAllBlogPictures(Pageable pageable){

        return blogPictureRepo.findAll(pageable);
    }

    @PostMapping("/blogPictures")
    public BlogPicture createBlogPicture(@RequestBody BlogPicture blogPicture){
        return blogPictureRepo.save(blogPicture);
    }
}
