package com.amakakeru.medihelpbackend.controller;

import com.amakakeru.medihelpbackend.dao.DoctorExtraInfoRepo;
import com.amakakeru.medihelpbackend.entity.DoctorExtraInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class DoctorExtraInfoController {
    @Autowired
    private DoctorExtraInfoRepo doctorExtraInfoRepo;

    @GetMapping("/doctorExtraInfoes")
    public List<DoctorExtraInfo> getAllDoctorExtraInfo(){
        return doctorExtraInfoRepo.findAll();
    }

    @PostMapping("/doctorExtraInfoes")
    public DoctorExtraInfo createDoctorExtraInfo(@RequestBody DoctorExtraInfo doctorExtraInfo){
        return doctorExtraInfoRepo.save(doctorExtraInfo);
    }

}
