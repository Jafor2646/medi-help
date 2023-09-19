package com.amakakeru.medihelpbackend.dao;

import com.amakakeru.medihelpbackend.entity.DoctorSpecialities;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorSpecialitiesRepo extends JpaRepository<DoctorSpecialities, Integer> {
}
