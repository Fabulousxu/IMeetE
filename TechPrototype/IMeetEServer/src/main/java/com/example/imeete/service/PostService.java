package com.example.imeete.service;

import com.example.imeete.entity.Post;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface PostService {
  List<Post> getPost(String type, String category, int lastPostId);
}
