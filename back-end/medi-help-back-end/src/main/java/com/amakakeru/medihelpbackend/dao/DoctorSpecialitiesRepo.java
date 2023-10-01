package com.amakakeru.medihelpbackend.dao;

import com.amakakeru.medihelpbackend.entity.DoctorSpecialities;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DoctorSpecialitiesRepo extends JpaRepository<DoctorSpecialities, Integer> {
    Page<DoctorSpecialities> findDoctorSpecialitiesByDoctorId(String doctorId, Pageable pageable);
}
