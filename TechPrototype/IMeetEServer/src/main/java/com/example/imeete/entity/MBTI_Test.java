package com.example.imeete.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "mbti_test")
public class MBTI_Test {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "question")
    public String question;
}
