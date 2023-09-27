package com.amakakeru.medihelpbackend.controller;


import com.amakakeru.medihelpbackend.dao.BlogRepo;
import com.amakakeru.medihelpbackend.entity.Blog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class BlogController {

    @Autowired
    private BlogRepo blogRepo;

    @GetMapping("/blogs")
    public Page<Blog> getAllBlogs(Pageable pageable){
        return blogRepo.findAll(pageable);
    }

    @PostMapping("/blogs")
    public Blog postBlog(@RequestBody Blog blog){
        return blogRepo.save(blog);
    }

    @PutMapping("/blogs/upvote/{blogId}")
    public ResponseEntity<Blog> upvoteAdded(@PathVariable Long blogId){

        Blog blog = blogRepo.findBlogByBlogId(blogId).get(0);

        Integer votes = blog.getBlogUpvote();
        votes++;
        blog.setBlogUpvote(votes);

        Blog updatedBlog = blogRepo.save(blog);
        return ResponseEntity.ok(updatedBlog);
    }

    @PutMapping("/blogs/downvote/{blogId}")
    public ResponseEntity<Blog> downvoteAdded(@PathVariable Long blogId){

        Blog blog = blogRepo.findBlogByBlogId(blogId).get(0);

        Integer votes = blog.getBlogDownvote();
        votes--;
        blog.setBlogDownvote(votes);

        Blog updatedBlog = blogRepo.save(blog);
        return ResponseEntity.ok(updatedBlog);
    }

    @PutMapping("/blogs/viewCount/{blogId}")
    public ResponseEntity<Blog> viewAdded(@PathVariable Long blogId){

        Blog blog = blogRepo.findBlogByBlogId(blogId).get(0);

        Integer view = blog.getBlogView();
        view++;
        blog.setBlogView(view);

        Blog updatedBlog = blogRepo.save(blog);
        return ResponseEntity.ok(updatedBlog);
    }
}
