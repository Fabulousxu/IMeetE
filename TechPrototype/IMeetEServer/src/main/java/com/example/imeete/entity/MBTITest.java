package com.example.imeete.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "mbti_test")
public class MBTITest {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "mbti_test_id")
  public int id;

  @Column(name = "mbti_test_question")
  public String question;
}
