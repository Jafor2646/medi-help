package com.amakakeru.medihelpbackend.controller;

import com.amakakeru.medihelpbackend.dao.HospitalExtraInfoRepo;
import com.amakakeru.medihelpbackend.entity.HospitalExtraInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/")
public class HospitalExtraInfoController {
    @Autowired
    private HospitalExtraInfoRepo hospitalExtraInfoRepo;

    @GetMapping("/hospitalExtraInfoes")
    public List<HospitalExtraInfo > getAllHospitalExtraInfo(){
        return hospitalExtraInfoRepo.findAll();
    }

    @PostMapping("/hospitalExtraInfoes")
    public HospitalExtraInfo createHospitalExtraInfo(@RequestBody HospitalExtraInfo hospitalExtraInfo){
        return hospitalExtraInfoRepo.save(hospitalExtraInfo);
    }

    @PutMapping("/hospitalExtraInfoes/addBio/{userId}")
    public ResponseEntity<HospitalExtraInfo> addBio(@PathVariable String userId, @RequestBody Map<String, String> bioMap){

        HospitalExtraInfo hospitalExtraInfo = hospitalExtraInfoRepo.findFirstByHospitalUserId(userId).get(0);

        hospitalExtraInfo.setBio(bioMap.get("bio"));

        HospitalExtraInfo updatedHospitalExtraInfo = hospitalExtraInfoRepo.save(hospitalExtraInfo);
        return ResponseEntity.ok(updatedHospitalExtraInfo);
    }

    @PutMapping("/hospitalExtraInfoes/addWebsite/{userId}")
    public ResponseEntity<HospitalExtraInfo> addWebsite(@PathVariable String userId, @RequestBody Map<String, String> websiteMap){

        HospitalExtraInfo hospitalExtraInfo = hospitalExtraInfoRepo.findFirstByHospitalUserId(userId).get(0);

        hospitalExtraInfo.setWebsite(websiteMap.get("website"));

        HospitalExtraInfo updatedHospitalExtraInfo = hospitalExtraInfoRepo.save(hospitalExtraInfo);
        return ResponseEntity.ok(updatedHospitalExtraInfo);
    }

    @PutMapping("/hospitalExtraInfoes/addGovernanceDetails/{userId}")
    public ResponseEntity<HospitalExtraInfo> addGovernanceDetails(@PathVariable String userId, @RequestBody Map<String, String> governanceDetailsMap){

        HospitalExtraInfo hospitalExtraInfo = hospitalExtraInfoRepo.findFirstByHospitalUserId(userId).get(0);

        hospitalExtraInfo.setGovernanceDetails(governanceDetailsMap.get("governanceDetails"));

        HospitalExtraInfo updatedHospitalExtraInfo = hospitalExtraInfoRepo.save(hospitalExtraInfo);
        return ResponseEntity.ok(updatedHospitalExtraInfo);
    }
}
