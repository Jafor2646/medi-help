package com.amakakeru.medihelpbackend.dao;

import com.amakakeru.medihelpbackend.entity.Blog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogRepo extends JpaRepository<Blog, Integer> {
}
