package com.amakakeru.medihelpbackend.dao;

import com.amakakeru.medihelpbackend.entity.Thread;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ThreadRepo extends JpaRepository<Thread, String> {
}
