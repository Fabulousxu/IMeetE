package com.example.imeete.dao;

import com.example.imeete.entity.MBTI_Intro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MBTI_IntroRepository extends JpaRepository<MBTI_Intro, String> {
}
