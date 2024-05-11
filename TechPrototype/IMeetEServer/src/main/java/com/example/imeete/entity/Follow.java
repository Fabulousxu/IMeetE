package com.example.imeete.entity;

import jakarta.persistence.*;

@Entity
public class Follow {
  @EmbeddedId private FollowId followId;
}
