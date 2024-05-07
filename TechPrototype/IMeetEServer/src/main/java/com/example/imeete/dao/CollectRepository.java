package com.example.imeete.dao;

import com.example.imeete.entity.Collect;
import com.example.imeete.entity.CollectId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CollectRepository extends JpaRepository<Collect, CollectId> {}
