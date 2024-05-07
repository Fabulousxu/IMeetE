package com.example.imeete.dao;

import com.example.imeete.entity.Post;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {
  @Query("SELECT MAX(p.id) FROM Post p")
  Integer findMaxId();

  @Query("SELECT MIN(p.id) FROM Post p")
  Integer findMinId();

  List<Post> findTop10ByIdBeforeOrderByIdDesc(int id);
}
