package com.example.imeete.entity;

import jakarta.persistence.*;
import java.util.Date;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Comment {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long commentId;

  private int postId;
  private String userId;
  private Date createdAt;
  private String content;

  @Column(name = "`like`")
  private int like;
}
