package com.amakakeru.medihelpbackend.dao;

import com.amakakeru.medihelpbackend.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User, String> {
    Page<User> findUserByEmail(String email, Pageable pageable);

    @Override
    <S extends User> S save(S entity);
}
