package com.example.imeete.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "user")
@Getter
@Setter
public class User {
  @Id
  @Column(name = "user_id")
  private String id;

  @Column(name = "user_nickname")
  private String nickname;

  @Column(name = "user_avatar")
  private String avatar;

  @Column(name = "user_mbti")
  private String mbti;

  @Column(name = "user_sex")
  private int sex;

  @Column(name = "user_age")
  private int age;

  @Column(name = "user_area")
  private String area;

  @Column(name = "user_intro")
  private String intro;

  @Column(name = "user_following_count")
  private int followingCount;

  @Column(name = "user_follower_count")
  private int followerCount;
}
