package com.example.imeete.service;

import com.alibaba.fastjson2.JSONObject;
import com.example.imeete.entity.Comment;
import com.example.imeete.entity.Post;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public interface PostService {
  List<Post> getPost(String type, String category, int lastPostId);

  List<Comment> getComment(int postId, long lastCommentId);

  JSONObject toJson(Post post);

  JSONObject toJson(int postId);

  JSONObject toJson(Post post, String userId);

  JSONObject toJson(int postId, String userId);
}
