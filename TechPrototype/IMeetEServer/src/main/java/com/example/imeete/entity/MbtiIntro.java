package com.example.imeete.entity;

import jakarta.persistence.*;

@Entity
public class MbtiIntro {
  @Id private String mbti;
  private String intro;
}
