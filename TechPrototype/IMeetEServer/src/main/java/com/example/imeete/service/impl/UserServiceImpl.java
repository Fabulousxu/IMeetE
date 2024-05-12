package com.example.imeete.service.impl;

import com.alibaba.fastjson2.JSONObject;
import com.example.imeete.dao.CollectRepository;
import com.example.imeete.dao.PostRepository;
import com.example.imeete.dao.UserRepository;
import com.example.imeete.entity.Collect;
import com.example.imeete.entity.Post;
import com.example.imeete.entity.User;
import com.example.imeete.service.UserService;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
  @Autowired private UserRepository userRepository;
  @Autowired private PostRepository postRepository;
  @Autowired private CollectRepository collectRepository;

  public JSONObject toJson(User user) {
    JSONObject json = new JSONObject();
    json.put("userId", user.getUserId());
    json.put("nickname", user.getNickname());
    json.put("avatar", user.getAvatar());
    json.put("mbti", user.getMbti());
    json.put("sex", user.getSex());
    json.put("age", user.getAge());
    json.put("area", user.getArea());
    json.put("intro", user.getIntro());
    json.put("followingCount", user.getFollowing());
    json.put("followerCount", user.getFollower());
    return json;
  }

  public JSONObject toJson(String userId) {
    User user = userRepository.findById(userId).orElse(null);
    return user == null ? null : toJson(user);
  }

  public List<Post> getPost(User user) {
    return postRepository.findByUserIdOrderByPostIdDesc(user.getUserId());
  }

  public List<Post> getPost(String userId) {
    User user = userRepository.findById(userId).orElse(null);
    return user == null ? null : getPost(user);
  }

  public List<Post> getCollect(User user) {
    List<Collect> collects = collectRepository.findByUserIdOrderByPostIdDesc(user.getUserId());
    List<Post> posts = new ArrayList<>();
    for (Collect collect : collects)
      postRepository.findById(collect.getPostId()).ifPresent(posts::add);
    return posts;
  }

  public List<Post> getCollect(String userId) {
    User user = userRepository.findById(userId).orElse(null);
    return user == null ? null : getCollect(user);
  }
}
