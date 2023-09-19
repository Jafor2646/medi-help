package com.amakakeru.medihelpbackend.dao;

import com.amakakeru.medihelpbackend.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RatingRepo extends JpaRepository<Rating, Integer> {
}
