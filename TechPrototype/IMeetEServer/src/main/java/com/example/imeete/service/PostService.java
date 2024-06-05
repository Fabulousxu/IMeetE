package com.example.imeete.service;

import com.alibaba.fastjson2.JSONArray;
import com.alibaba.fastjson2.JSONObject;
import com.example.imeete.entity.Post;
import java.io.IOException;
import java.util.List;
import java.util.Set;
import org.springframework.stereotype.Service;

@Service
public interface PostService {
  JSONObject getPostInfo(int postId, String selfId) throws IOException;

  JSONArray getComments(int postId, long lastCommentId, String selfId) throws IOException;

  JSONObject post(String selfId, String title, String cover, String content);

  JSONObject comment(int postId, String selfId, String content);

  JSONObject like(int postId, String selfId);

  JSONObject dislike(int postId, String selfId);

  JSONObject collect(int postId, String selfId);

  JSONObject uncollect(int postId, String selfId);

  JSONArray getPost(String type, String category, int lastPostId, String selfId);

  JSONArray getPostByMbti(Set<String> mbti, int lastPostId, String selfId);
}
