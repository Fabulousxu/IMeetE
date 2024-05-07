package com.example.imeete.dao;

import com.example.imeete.entity.MBTIIntro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MBTIIntroRepository extends JpaRepository<MBTIIntro, String> {
}
