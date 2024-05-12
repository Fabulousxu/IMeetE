package com.example.imeete.service.impl;

import com.alibaba.fastjson2.JSONObject;
import com.example.imeete.dao.*;
import com.example.imeete.entity.idclass.CollectId;
import com.example.imeete.entity.Comment;
import com.example.imeete.entity.idclass.LikeId;
import com.example.imeete.entity.Post;
import com.example.imeete.service.PostService;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PostServiceImpl implements PostService {
  @Autowired private PostRepository postRepository;
  @Autowired private UserRepository userRepository;
  @Autowired private LikeRepository likeRepository;
  @Autowired private CollectRepository collectRepository;
  @Autowired private CommentRepository commentRepository;

  public JSONObject toJson(Post post) {
    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    JSONObject json = new JSONObject();
    json.put("id", post.getPostId());
    json.put("title", post.getTitle());
    json.put("cover", post.getCover());
    json.put("content", post.getContent());
    json.put("time", dateFormat.format(post.getCreatedAt()));
    json.put("watchCount", post.getWatch());
    json.put("likeCount", post.getLike());
    json.put("collectCount", post.getCollect());
    json.put("shareCount", post.getShare());
    json.put("commentCount", post.getComment());
    userRepository
        .findById(post.getUserId())
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

  public JSONObject toJson(int postId) {
    Post post = postRepository.findById(postId).orElse(null);
    return post == null ? null : toJson(post);
  }

  public JSONObject toJson(Post post, String userId) {
    JSONObject json = toJson(post);
    json.put("liked", likeRepository.existsById(new LikeId(userId, post.getPostId())));
    json.put("collected", collectRepository.existsById(new CollectId(userId, post.getPostId())));
    return json;
  }

  public JSONObject toJson(int postId, String userId) {
    Post post = postRepository.findById(postId).orElse(null);
    return post == null ? null : toJson(post, userId);
  }

  public List<Post> getPost(String type, String category, int lastPostId) {
    Integer maxId = postRepository.findMaxId();
    if (maxId == null) return new ArrayList<>();
    return postRepository.findTop10ByPostIdBeforeOrderByPostIdDesc(
        lastPostId == 0 ? maxId + 1 : lastPostId);
  }

  public List<Comment> getComment(int postId, long lastCommentId) {
    Long maxId = commentRepository.findMaxIdByPostId(postId);
    if (maxId == null) return new ArrayList<>();
    return commentRepository.findTop10ByPostIdAndCommentIdBeforeOrderByCommentIdDesc(
        postId, lastCommentId == 0 ? maxId + 1 : lastCommentId);
  }
}
