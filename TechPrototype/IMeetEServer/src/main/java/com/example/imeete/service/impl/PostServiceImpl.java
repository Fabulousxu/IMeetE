package com.example.imeete.service.impl;

import com.example.imeete.dao.PostRepository;
import com.example.imeete.entity.Post;
import com.example.imeete.service.PostService;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PostServiceImpl implements PostService {
  @Autowired private PostRepository postRepository;

  public List<Post> getPost(String type, String category, int lastPostId) {
    List<Post> posts;
    if (type.equals("发现")) {
      posts =
          postRepository.findTop10ByIdBeforeOrderByIdDesc(
              lastPostId == 0 ? postRepository.findMaxId() + 1 : lastPostId);
    } else {
      posts = new ArrayList<Post>();
    }
    return posts;
  }
}
