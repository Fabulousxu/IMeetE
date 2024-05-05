package com.example.imeete.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "mbti_intro")
public class MBTI_Intro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mbti_type")
    public String mbti_type;

    @Column(name = "mbti_intro")
    public String mbti_intro;
}
