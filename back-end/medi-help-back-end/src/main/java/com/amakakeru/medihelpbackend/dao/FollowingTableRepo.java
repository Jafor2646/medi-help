package com.amakakeru.medihelpbackend.dao;

import com.amakakeru.medihelpbackend.entity.FollowingTable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FollowingTableRepo extends JpaRepository<FollowingTable, Integer> {
    Page<FollowingTable> findAllByFollowerId(String followerId, Pageable pageable);
    Page<FollowingTable> findAllByFollowingId(String followingId, Pageable pageable);
}
