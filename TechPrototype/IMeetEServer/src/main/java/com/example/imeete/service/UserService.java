package com.example.imeete.service;

import com.alibaba.fastjson2.JSONObject;
import com.example.imeete.entity.Post;
import com.example.imeete.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {
  JSONObject toJson(User user);

  JSONObject toJson(String userId);

  List<Post> getPost(User user);

  List<Post> getPost(String userId);

  List<Post> getCollect(User user);

  List<Post> getCollect(String userId);
}
