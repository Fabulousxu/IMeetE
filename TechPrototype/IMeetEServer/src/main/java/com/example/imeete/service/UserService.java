package com.example.imeete.service;

import com.alibaba.fastjson2.JSONArray;
import com.alibaba.fastjson2.JSONObject;
import java.io.IOException;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
  JSONObject login(String userId, String password);

  JSONObject getUserInfo(String userId);

  JSONObject getSelfInfo(String selfId) throws IOException;

  JSONObject getUserPosts(String userId, String selfId);

  JSONArray getSelfPosts(String selfId) throws IOException;

  JSONObject getUserCollects(String userId, String selfId);

  JSONArray getSelfCollects(String selfId) throws IOException;
}
