package com.example.imeete.dao;

import com.example.imeete.entity.Follow;
import com.example.imeete.entity.idclass.FollowId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FollowRepository extends JpaRepository<Follow, FollowId> {}
