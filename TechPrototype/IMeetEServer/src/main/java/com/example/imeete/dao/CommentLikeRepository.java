package com.example.imeete.dao;

import com.example.imeete.entity.CommentLike;
import com.example.imeete.entity.idclass.CommentLikeId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentLikeRepository extends JpaRepository<CommentLike, CommentLikeId> {}
