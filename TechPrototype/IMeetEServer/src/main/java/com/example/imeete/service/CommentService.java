package com.example.imeete.service;

import com.alibaba.fastjson2.JSONObject;
import com.example.imeete.entity.Comment;
import org.springframework.stereotype.Service;

@Service
public interface CommentService {
  JSONObject toJson(Comment comment);

  JSONObject toJson(long commentId);

  JSONObject toJson(Comment comment, String userId);

  JSONObject toJson(long commentId, String userId);
}
