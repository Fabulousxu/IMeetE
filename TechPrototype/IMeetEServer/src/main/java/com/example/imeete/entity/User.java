package com.example.imeete.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "user")
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "user_id")
  public String id;

  @Column(name = "user_nickname")
  public String nickname;

  @Column(name = "user_password")
  public String password;

  @Column(name = "user_mbti")
  public String mbti;
}