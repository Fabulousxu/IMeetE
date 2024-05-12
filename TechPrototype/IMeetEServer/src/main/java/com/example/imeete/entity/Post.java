package com.example.imeete.entity;

import jakarta.persistence.*;
import java.util.Date;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Getter
@Setter
public class Post {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int postId;

  private String userId;

  private String title;
  private String cover;
  private String content;
  private int watch;

  private int collect;
  private int share;
  private int comment;

  @Column(name = "`like`")
  private int like;

  @CreationTimestamp
  @Temporal(TemporalType.TIMESTAMP)
  private Date createdAt;
}
