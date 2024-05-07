package com.example.imeete.service.impl;

import com.alibaba.fastjson2.JSONObject;
import com.example.imeete.dao.UserRepository;
import com.example.imeete.entity.User;
import com.example.imeete.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
  @Autowired
  private UserRepository userRepository;
  public JSONObject getUserInfoJson(String userId) {
    JSONObject info = new JSONObject();
    User user = userRepository.findById(userId).orElse(null);
    if (user == null) return null;
    info.put("nickname", user.getNickname());
    info.put("avatar", user.getAvatar());
    info.put("mbti", user.getMbti());
    info.put("sex", user.getSex());
    info.put("age", user.getAge());
    info.put("area", user.getArea());
    info.put("intro", user.getIntro());
    info.put("followingCount", user.getFollowingCount());
    info.put("followerCount", user.getFollowerCount());
    return info;
  }

}
