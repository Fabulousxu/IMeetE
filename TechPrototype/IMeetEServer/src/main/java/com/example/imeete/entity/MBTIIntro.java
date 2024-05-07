package com.example.imeete.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "mbti_intro")
public class MBTIIntro {
  @Id
  @Column(name = "mbti_type")
  public String type;

  @Column(name = "mbti_intro")
  public String intro;
}
