package com.example.imeete.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "account")
public class Account {
  @Id
  @Column(name = "account_id")
  private String id;

  @Column(name = "account_password")
  private String password;

  public boolean comparePassword(String password) {
    return this.password.equals(password);
  }
}
