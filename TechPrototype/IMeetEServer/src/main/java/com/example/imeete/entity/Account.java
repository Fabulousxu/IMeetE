package com.example.imeete.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Account {
  @Id private String userId;
  private String password;
}
