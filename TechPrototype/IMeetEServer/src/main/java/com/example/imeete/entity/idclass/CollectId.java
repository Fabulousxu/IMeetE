package com.example.imeete.entity.idclass;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
public class CollectId implements Serializable {
  private String userId;
  private int postId;
}
