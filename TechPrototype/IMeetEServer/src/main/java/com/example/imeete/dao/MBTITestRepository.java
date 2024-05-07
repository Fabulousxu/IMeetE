package com.example.imeete.dao;

import com.example.imeete.entity.MBTITest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MBTITestRepository extends JpaRepository<MBTITest, Integer> {
}
