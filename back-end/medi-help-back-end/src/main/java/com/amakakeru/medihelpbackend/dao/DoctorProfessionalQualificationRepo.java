package com.amakakeru.medihelpbackend.dao;

import com.amakakeru.medihelpbackend.entity.DoctorProfessionalQualification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DoctorProfessionalQualificationRepo extends JpaRepository<DoctorProfessionalQualification, Integer> {
    Page<DoctorProfessionalQualification> findAllByCurrentlyWorkingHospitalInfoId(String currentlyWorkingHospitalInfoId, Pageable pageable);
}
