package com.example.imeete.service.impl;

import com.alibaba.fastjson2.JSONObject;
import com.example.imeete.dao.CommentLikeRepository;
import com.example.imeete.dao.CommentRepository;
import com.example.imeete.dao.UserRepository;
import com.example.imeete.entity.Comment;
import com.example.imeete.entity.idclass.CommentLikeId;
import com.example.imeete.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentServiceImpl implements CommentService {
  @Autowired CommentRepository commentRepository;
  @Autowired CommentLikeRepository commentLikeRepository;
  @Autowired UserRepository userRepository;

  public JSONObject toJson(Comment comment) {
    JSONObject json = new JSONObject();
    json.put("id", comment.getCommentId());
    json.put("time", comment.getCreatedAt());
    json.put("content", comment.getContent());
    json.put("likeCount", comment.getLike());
    userRepository
        .findById(comment.getUserId())
        .ifPresent(
            user -> {
              JSONObject userJson = new JSONObject();
              userJson.put("id", user.getUserId());
              userJson.put("nickname", user.getNickname());
              userJson.put("avatar", user.getAvatar());
              userJson.put("mbti", user.getMbti());
              json.put("user", userJson);
            });
    return json;
  }

  public JSONObject toJson(long commentId) {
    Comment comment = commentRepository.findById(commentId).orElse(null);
    return comment == null ? null : toJson(comment);
  }

  public JSONObject toJson(Comment comment, String userId) {
    JSONObject json = toJson(comment);
    json.put(
        "liked",
        commentLikeRepository.existsById(new CommentLikeId(comment.getCommentId(), userId)));
    return json;
  }

  public JSONObject toJson(long commentId, String userId) {
    Comment comment = commentRepository.findById(commentId).orElse(null);
    return comment == null ? null : toJson(comment, userId);
  }
}
