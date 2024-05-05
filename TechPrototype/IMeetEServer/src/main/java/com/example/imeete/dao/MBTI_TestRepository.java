package com.example.imeete.dao;

import com.example.imeete.entity.MBTI_Test;
import com.example.imeete.entity.MBTI_Intro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MBTI_TestRepository extends JpaRepository<MBTI_Test, Integer> {
}
