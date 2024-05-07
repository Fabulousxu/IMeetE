package com.example.imeete.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "user")
public class User {
  @Id
  @Column(name = "user_id")
  public String id;

  @Column(name = "user_nickname")
  public String nickname;

  @Column(name = "user_password")
  public String password;

  @Column(name = "user_mbti")
  public String mbti;
}