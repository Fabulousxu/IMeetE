package com.example.imeete.service;

import com.alibaba.fastjson2.JSONObject;
import com.example.imeete.entity.User;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
  JSONObject toJson(User user);

  JSONObject toJson(String userId);
}
