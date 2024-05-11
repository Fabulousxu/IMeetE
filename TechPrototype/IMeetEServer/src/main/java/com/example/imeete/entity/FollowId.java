package com.example.imeete.entity;

import jakarta.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class FollowId implements Serializable {
  private String followeeId;
  private String followerId;
}
