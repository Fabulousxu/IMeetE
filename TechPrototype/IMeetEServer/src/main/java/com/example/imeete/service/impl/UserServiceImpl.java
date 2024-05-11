package com.example.imeete.service.impl;

import com.alibaba.fastjson2.JSONObject;
import com.example.imeete.dao.UserRepository;
import com.example.imeete.entity.User;
import com.example.imeete.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
  @Autowired private UserRepository userRepository;

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
}
