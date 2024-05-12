package com.example.imeete.entity.idclass;

import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public class LikeId implements Serializable {
  private String userId;
  private int postId;
}
