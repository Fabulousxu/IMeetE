package com.example.imeete.dao;

import com.example.imeete.entity.Collect;
import com.example.imeete.entity.idclass.CollectId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CollectRepository extends JpaRepository<Collect, CollectId> {
  List<Collect> findByUserIdOrderByPostIdDesc(String userId);
}
