package com.amakakeru.medihelpbackend.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.amakakeru.medihelpbackend.entity.DoctorExtraInfo;
public interface DoctorExtraInfoRepo extends JpaRepository<DoctorExtraInfo, String> {
}
