package com.example.imeete.dao;

import com.example.imeete.entity.Comment;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

  @Query("SELECT MAX(comment.commentId) FROM Comment comment WHERE comment.postId = ?1")
  Long findMaxIdByPostId(int postId);

  List<Comment> findTop10ByPostIdAndCommentIdBeforeOrderByCommentIdDesc(
      int postId, long lastCommentId);
}
