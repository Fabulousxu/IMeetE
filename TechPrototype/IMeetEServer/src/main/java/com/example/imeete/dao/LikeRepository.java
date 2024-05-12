package com.example.imeete.dao;

import com.example.imeete.entity.Like;
import com.example.imeete.entity.idclass.LikeId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeRepository extends JpaRepository<Like, LikeId> {}
