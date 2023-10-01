package com.amakakeru.medihelpbackend.controller;

import com.amakakeru.medihelpbackend.dao.DoctorSpecialitiesRepo;
import com.amakakeru.medihelpbackend.dao.UserRepo;
import com.amakakeru.medihelpbackend.entity.DoctorSpecialities;
import com.amakakeru.medihelpbackend.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class DoctorSpecialitiesController {
    @Autowired
    private DoctorSpecialitiesRepo doctorSpecialitiesRepo;

    @GetMapping("/doctorSpecialities")
    public List<DoctorSpecialities> getAllSpecialities(){
        return doctorSpecialitiesRepo.findAll();
    }

    @PostMapping("/doctorSpecialities")
    public DoctorSpecialities createDoctorSpecialities(@RequestBody DoctorSpecialities doctorSpecialities){
        return doctorSpecialitiesRepo.save(doctorSpecialities);
    }
}
