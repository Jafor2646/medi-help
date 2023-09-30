package com.amakakeru.medihelpbackend.dao;

import com.amakakeru.medihelpbackend.entity.HospitalExtraInfo;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HospitalExtraInfoRepo extends JpaRepository<HospitalExtraInfo, Long>{
    List<HospitalExtraInfo> findFirstByHospitalUserId(String hospitalUserId);

}
