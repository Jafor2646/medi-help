package com.amakakeru.medihelpbackend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.amakakeru.medihelpbackend.entity.DoctorExtraInfo;

import java.util.List;

public interface DoctorExtraInfoRepo extends JpaRepository<DoctorExtraInfo, Long> {
    List<DoctorExtraInfo> findFirstByDoctorUserId(String doctorUserId);

}
