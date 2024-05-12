package com.example.imeete.entity;

import com.example.imeete.entity.idclass.CommentLikeId;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@IdClass(CommentLikeId.class)
@NoArgsConstructor
@AllArgsConstructor
public class CommentLike {
  @Id private Long commentId;
  @Id private String userId;
}
