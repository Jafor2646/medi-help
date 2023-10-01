package com.amakakeru.medihelpbackend.controller;

import com.amakakeru.medihelpbackend.dao.DoctorEducationalQualificationRepo;
import com.amakakeru.medihelpbackend.entity.DoctorEducationalQualification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class DoctorEducationalQualificationController {
    @Autowired
    private DoctorEducationalQualificationRepo doctorEducationalQualificationRepo;

    @GetMapping("/doctorEducationalQualifications")
    public List<DoctorEducationalQualification> getAllEducationalQualifications(){
        return doctorEducationalQualificationRepo.findAll();
    }

    @PostMapping("/doctorEducationalQualifications")
    public DoctorEducationalQualification createDoctorEducationalQualification(@RequestBody DoctorEducationalQualification doctorEducationalQualification){
        return doctorEducationalQualificationRepo.save(doctorEducationalQualification);
    }

}
