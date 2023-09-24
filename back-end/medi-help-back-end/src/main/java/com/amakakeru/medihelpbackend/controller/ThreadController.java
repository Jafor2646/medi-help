package com.amakakeru.medihelpbackend.controller;

import com.amakakeru.medihelpbackend.dao.ThreadRepo;
import com.amakakeru.medihelpbackend.entity.Thread;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
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
}
