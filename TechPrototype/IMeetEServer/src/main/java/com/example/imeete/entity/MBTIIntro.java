package com.example.imeete.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "mbti_intro")
public class MBTIIntro {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "mbti_type")
  public String type;

  @Column(name = "mbti_intro")
  public String intro;
}
