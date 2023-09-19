package com.amakakeru.medihelpbackend.dao;

import com.amakakeru.medihelpbackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User, String> {
}
