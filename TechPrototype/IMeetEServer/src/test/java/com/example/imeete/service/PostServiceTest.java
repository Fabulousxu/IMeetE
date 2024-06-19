package com.example.imeete.service;

import com.example.imeete.dao.PostRepository;
import com.example.imeete.entity.Post;
import java.io.IOException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class PostServiceTest {
  @Autowired private PostService postService;
  @Autowired private PostRepository postRepository;

  @Test
  public void getPostInfoTest() throws IOException {
    Post post = postRepository.findById(0).orElse(null);
    if (post == null) Assertions.assertNull(postService.getPostInfo(0, "u1"));
    post = postRepository.findById(1).orElse(null);
    if (post == null) return;
    int watch = post.getWatch();
    Assertions.assertNotNull(postService.getPostInfo(1, "u1"));
    Assertions.assertEquals(watch + 1, postRepository.findById(1).get().getWatch());
  }

}
