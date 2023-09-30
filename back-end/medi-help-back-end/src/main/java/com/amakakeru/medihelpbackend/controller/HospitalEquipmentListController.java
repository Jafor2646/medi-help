package com.amakakeru.medihelpbackend.controller;

import com.amakakeru.medihelpbackend.dao.HospitalEquipmentListRepo;
import com.amakakeru.medihelpbackend.entity.HospitalEquipmentList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class HospitalEquipmentListController {
    @Autowired
    private HospitalEquipmentListRepo hospitalEquipmentListRepo;

    @GetMapping("/hospitalEquipmentList")
    public List<HospitalEquipmentList> getAllHospitalEquipmentList(){
        return hospitalEquipmentListRepo.findAll();
    }

    @PostMapping("/hospitalEquipmentList")
    public HospitalEquipmentList createHospitalEquipmentList(@RequestBody HospitalEquipmentList hospitalEquipmentList){
        return hospitalEquipmentListRepo.save(hospitalEquipmentList);
    }
}
