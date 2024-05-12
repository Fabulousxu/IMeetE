package com.example.imeete.entity.idclass;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.io.Serializable;
@NoArgsConstructor
@AllArgsConstructor
public class CommentLikeId implements Serializable {
  private long commentId;
  private String userId;
}
