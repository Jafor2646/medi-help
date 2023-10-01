package com.amakakeru.medihelpbackend.controller;

import com.amakakeru.medihelpbackend.dao.DoctorProfessionalQualificationRepo;
import com.amakakeru.medihelpbackend.entity.DoctorProfessionalQualification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class DoctorProfessionalQualificationController {
    @Autowired
    private DoctorProfessionalQualificationRepo doctorProfessionalQualificationRepo;

    @GetMapping("/doctorProfessionalQualifications")
    public List<DoctorProfessionalQualification> getAllProfessionalQualifications(){
        return doctorProfessionalQualificationRepo.findAll();
    }

    @PostMapping("/doctorProfessionalQualifications")
    public DoctorProfessionalQualification createDoctorProfessionalQualification(@RequestBody DoctorProfessionalQualification doctorProfessionalQualification){
        return doctorProfessionalQualificationRepo.save(doctorProfessionalQualification);
    }

}
