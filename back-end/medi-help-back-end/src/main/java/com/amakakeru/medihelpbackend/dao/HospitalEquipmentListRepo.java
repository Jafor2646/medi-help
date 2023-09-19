package com.amakakeru.medihelpbackend.dao;

import com.amakakeru.medihelpbackend.entity.HospitalEquipmentList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HospitalEquipmentListRepo extends JpaRepository<HospitalEquipmentList, Integer> {
}
