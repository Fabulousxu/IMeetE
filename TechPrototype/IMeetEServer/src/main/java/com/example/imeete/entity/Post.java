package com.example.imeete.entity;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
@Table(name = "post")
public class Post {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "post_id")
  public int id;

  @Column(name = "post_title")
  public String title;

  @Column(name = "post_time")
  @Temporal(TemporalType.TIMESTAMP)
  public Timestamp time;

  @Column(name = "post_user_id")
  public String userId;

  @Column(name = "post_content")
  public String content;

  @Column(name = "post_watch")
  public int watch;

  @Column(name = "post_like")
  public int like;

  @Column(name = "post_collect")
  public int collect;

  @Column(name = "post_share")
  public int share;
}
