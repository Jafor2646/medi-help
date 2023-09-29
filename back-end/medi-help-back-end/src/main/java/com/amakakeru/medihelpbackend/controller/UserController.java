package com.amakakeru.medihelpbackend.controller;


import com.amakakeru.medihelpbackend.dao.UserRepo;
import com.amakakeru.medihelpbackend.entity.Thread;
import com.amakakeru.medihelpbackend.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class UserController {

    @Autowired
    private UserRepo userRepo;

    @GetMapping("/users")
    public List<User> getAllUser(){
        return userRepo.findAll();
    }

    @PostMapping("/users")
    public User createUser(@RequestBody User user){
        return userRepo.save(user);
    }

    @PutMapping("/users/changeDP/{userId}")
    public ResponseEntity<User> dpChanged(@PathVariable String userId, @RequestBody Map<String, String> pictureMap){

        User user = userRepo.findByUserId(userId).get(0);

        user.setPicture(pictureMap.get("picture"));

        User updatedUser = userRepo.save(user);
        return ResponseEntity.ok(updatedUser);
    }

    @PutMapping("/users/changeAddress/{userId}")
    public ResponseEntity<User> addressChanged(@PathVariable String userId, @RequestBody Map<String, String> addressMap){

        User user = userRepo.findByUserId(userId).get(0);

        user.setAddress(addressMap.get("address"));

        User updatedUser = userRepo.save(user);
        return ResponseEntity.ok(updatedUser);
    }

    @PutMapping("/users/changePhone/{userId}")
    public ResponseEntity<User> phoneChanged(@PathVariable String userId, @RequestBody Map<String, String> phoneMap){

        User user = userRepo.findByUserId(userId).get(0);

        user.setPhone(phoneMap.get("phone"));

        User updatedUser = userRepo.save(user);
        return ResponseEntity.ok(updatedUser);
    }
}
