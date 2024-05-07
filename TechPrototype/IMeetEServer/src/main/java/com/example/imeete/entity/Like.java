package com.example.imeete.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "`like`")
@NoArgsConstructor
@AllArgsConstructor
public class Like {
  @EmbeddedId private LikeId id;
}
