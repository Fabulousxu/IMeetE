package com.example.imeete.entity;

import com.example.imeete.entity.idclass.CollectId;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@IdClass(CollectId.class)
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Collect {
  @Id private String userId;
  @Id private int postId;
}
