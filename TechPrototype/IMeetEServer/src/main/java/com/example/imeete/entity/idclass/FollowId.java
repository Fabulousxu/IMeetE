package com.example.imeete.entity.idclass;

import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public class FollowId implements Serializable {
  private String followeeId;
  private String followerId;
}
