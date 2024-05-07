package com.example.imeete.entity;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "comment")
public class Comment {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "comment_id")
  public int id;

  @Column(name = "post_id")
  public int postId;

  @Column(name = "user_id")
  public String userId;

  @Column(name = "comment_time")
  @Temporal(TemporalType.TIMESTAMP)
  public Date time;

  @Column(name = "comment_content")
  public String content;
}
