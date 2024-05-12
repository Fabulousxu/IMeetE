package com.example.imeete.entity;

import com.example.imeete.entity.idclass.FollowId;
import jakarta.persistence.*;

@Entity
@IdClass(FollowId.class)
public class Follow {
  @Id private String followeeId;
  @Id private String followerId;
}
