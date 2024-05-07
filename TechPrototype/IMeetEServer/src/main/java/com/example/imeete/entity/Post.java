package com.example.imeete.entity;

import jakarta.persistence.*;
import java.util.Date;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "post")
@Getter
@Setter
public class Post {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "post_id")
  private int id;

  @Column(name = "user_id")
  private String userId;

  @Column(name = "post_time")
  @Temporal(TemporalType.TIMESTAMP)
  private Date time;

  @Column(name = "post_title")
  private String title;

  @Column(name = "post_cover")
  private String cover;

  @Column(name = "post_content")
  private String content;

  @Column(name = "post_watch_count")
  private int watchCount;

  @Column(name = "post_like_count")
  private int likeCount;

  @Column(name = "post_collect_count")
  private int collectCount;

  @Column(name = "post_share_count")
  private int shareCount;

  @Column(name = "post_comment_count")
  private int commentCount;
}
