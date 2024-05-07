package com.example.imeete.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "collect")
@NoArgsConstructor
@AllArgsConstructor
public class Collect {
  @EmbeddedId private CollectId id;
}
