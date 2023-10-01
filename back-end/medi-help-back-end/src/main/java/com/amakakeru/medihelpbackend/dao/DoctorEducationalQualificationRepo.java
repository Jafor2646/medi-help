package com.amakakeru.medihelpbackend.dao;

import com.amakakeru.medihelpbackend.entity.DoctorEducationalQualification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorEducationalQualificationRepo extends JpaRepository<DoctorEducationalQualification,Integer> {
    Page<DoctorEducationalQualification> findAllByDoctorUserId(String doctorUserId, Pageable pageable);
}
