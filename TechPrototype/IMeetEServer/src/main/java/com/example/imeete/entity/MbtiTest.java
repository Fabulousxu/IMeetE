package com.example.imeete.entity;

import jakarta.persistence.*;

@Entity
public class MbtiTest {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int testId;

  private String question;
}
