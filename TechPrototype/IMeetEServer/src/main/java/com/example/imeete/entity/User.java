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

  @Column(name = "user_mbti")
  public String mbti;

  @Column(name = "user_area")
  public String area;

  @Column(name = "user_sex")
  public String sex;

  @Column(name = "user_age")
  public int age;

  @Column(name = "user_intro")
  public String intro;

  @Column(name = "user_avatar")
  public String avatar;

  @Column(name = "user_follow_count")
  public int followCount;

  @Column(name = "user_follower_count")
  public int followerCount;
}