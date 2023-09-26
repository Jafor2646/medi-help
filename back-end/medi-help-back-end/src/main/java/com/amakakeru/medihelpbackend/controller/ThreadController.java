package com.amakakeru.medihelpbackend.controller;

import com.amakakeru.medihelpbackend.dao.ThreadRepo;
import com.amakakeru.medihelpbackend.entity.Thread;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class ThreadController {
    @Autowired
    private ThreadRepo threadRepo;

    @GetMapping("/threads")
    public Page<Thread> getAllThreads(Pageable pageable){
        return threadRepo.findAll(pageable);
    }

    @PostMapping("/threads")
    public Thread postThread(@RequestBody Thread thread){
        return threadRepo.save(thread);
    }

    @PutMapping("/threads/upvote/{threadId}")
    public ResponseEntity<Thread> upvoteAdded(@PathVariable Long threadId){

        Thread thread = threadRepo.findThreadByThreadId(threadId).get(0);

        Integer votes = thread.getThreadUpvote();
        votes++;
        thread.setThreadUpvote(votes);

        Thread updatedThread = threadRepo.save(thread);
        return ResponseEntity.ok(updatedThread);
    }

    @PutMapping("/threads/downvote/{threadId}")
    public ResponseEntity<Thread> downvoteAdded(@PathVariable Long threadId){

        Thread thread = threadRepo.findThreadByThreadId(threadId).get(0);

        Integer votes = thread.getThreadDownvote();
        votes--;
        thread.setThreadDownvote(votes);

        Thread updatedThread = threadRepo.save(thread);
        return ResponseEntity.ok(updatedThread);
    }

    @PutMapping("/threads/viewCount/{threadId}")
    public ResponseEntity<Thread> viewAdded(@PathVariable Long threadId){

        Thread thread = threadRepo.findThreadByThreadId(threadId).get(0);

        Integer view = thread.getThreadView();
        view++;
        thread.setThreadView(view);

        Thread updatedThread = threadRepo.save(thread);
        return ResponseEntity.ok(updatedThread);
    }

}
