package com.example.imeete.entity;

import com.example.imeete.entity.idclass.LikeId;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "`like`")
@IdClass(LikeId.class)
@NoArgsConstructor
@AllArgsConstructor
public class Like {
  @Id private String userId;
  @Id private int postId;
}
