package com.amakakeru.medihelpbackend.dao;

import com.amakakeru.medihelpbackend.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {
    Page<User> findUserByEmail(String email, Pageable pageable);
    Page<User> findUserByUserId(String userId, Pageable pageable);
}
