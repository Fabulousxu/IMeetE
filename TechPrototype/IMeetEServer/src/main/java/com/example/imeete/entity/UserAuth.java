package com.example.imeete.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "user_auth")
public class UserAuth {
  @Id private String userId;
  private String password;

  @OneToOne
  @JoinColumn(name = "user_id")
  private User user;
}
