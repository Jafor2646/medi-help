package com.amakakeru.medihelpbackend.controller;

import com.amakakeru.medihelpbackend.dao.DoctorExtraInfoRepo;
import com.amakakeru.medihelpbackend.entity.DoctorExtraInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/")
public class DoctorExtraInfoController {
    @Autowired
    private DoctorExtraInfoRepo doctorExtraInfoRepo;

    @GetMapping("/doctorExtraInfoes")
    public List<DoctorExtraInfo> getAllDoctorExtraInfo(){
        return doctorExtraInfoRepo.findAll();
    }

}
