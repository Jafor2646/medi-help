package com.amakakeru.medihelpbackend.dao;

import com.amakakeru.medihelpbackend.entity.HospitalEquipmentList;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HospitalEquipmentListRepo extends JpaRepository<HospitalEquipmentList, Integer> {
    Page<HospitalEquipmentList> findAllByHospitalUserId(String hospitalId, Pageable pageable);
}
