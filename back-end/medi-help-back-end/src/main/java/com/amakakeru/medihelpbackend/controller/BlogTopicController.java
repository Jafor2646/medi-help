package com.amakakeru.medihelpbackend.controller;

import com.amakakeru.medihelpbackend.dao.BlogTopicRepo;
import com.amakakeru.medihelpbackend.entity.BlogTopic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class BlogTopicController {
    @Autowired
    private BlogTopicRepo blogTopicRepo;

    @GetMapping("/blogTopics")
    public Page<BlogTopic> getAllBlogTopic(Pageable pageable){

        return blogTopicRepo.findAll(pageable);
    }

    @PostMapping("/blogTopics")
    public BlogTopic createBlogTopic(@RequestBody BlogTopic blogTopic){
        return blogTopicRepo.save(blogTopic);
    }
}
