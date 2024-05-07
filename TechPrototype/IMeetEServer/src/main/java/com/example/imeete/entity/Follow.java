package com.example.imeete.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "follow")
@NoArgsConstructor
@AllArgsConstructor
public class Follow {
  @EmbeddedId private FollowId id;
}
