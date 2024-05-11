package com.example.imeete.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class User {
  @Id private String userId;
  private String nickname;
  private String avatar;
  private String mbti;
  private int sex;
  private int age;
  private String area;
  private String intro;
  private int following;
  private int follower;
}
