package com.example.imeete.controller;

import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doThrow;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.standaloneSetup;

import com.alibaba.fastjson2.JSONArray;
import com.alibaba.fastjson2.JSONObject;
import com.example.imeete.controller.UserController;
import com.example.imeete.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockCookie;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

public class UserControllerTest {

  private MockMvc mockMvc;

  @Mock
  private UserService userService;

  @InjectMocks
  private UserController userController;

  @BeforeEach
  public void setup() {
    MockitoAnnotations.openMocks(this);
    mockMvc = standaloneSetup(userController).build();
  }

  @Test
  public void getUserInfo_Success() throws Exception {
    JSONObject mockResponse = new JSONObject();
    mockResponse.put("userId", "user1");
    mockResponse.put("username", "John Doe");

    given(userService.getUserInfo("user1")).willReturn(mockResponse);

    mockMvc.perform(get("/user").param("id", "user1"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.userId").value("user1"))
            .andExpect(jsonPath("$.username").value("John Doe"));
  }


  @Test
  public void getSelfInfo_Success() throws Exception {
    JSONObject mockResponse = new JSONObject();
    mockResponse.put("userId", "user1");
    mockResponse.put("username", "John Doe");

    given(userService.getSelfInfo("user1")).willReturn(mockResponse);

    mockMvc.perform(get("/user/self").cookie(new MockCookie("userId", "user1")))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.userId").value("user1"))
            .andExpect(jsonPath("$.username").value("John Doe"));
  }

  @Test
  public void getUserInfo_NotFound() throws Exception {
    given(userService.getUserInfo("user999")).willReturn(null);

    mockMvc.perform(get("/user")
                    .param("id", "user999"))
            .andExpect(status().isOk())  // 检查状态码为200
            .andExpect(content().string(""));  // 假设当用户不存在时返回空字符串
  }

  @Test
  public void getSelfInfo_Unauthorized() throws Exception {
    given(userService.getSelfInfo("user0")).willReturn(null);  // 假设未授权也返回null

    mockMvc.perform(get("/user/self")
                    .cookie(new MockCookie("userId", "user0")))
            .andExpect(status().isOk())  // 检查状态码为200
            .andExpect(content().string(""));  // 假设未授权时返回空字符串
  }
  @Test
  public void getUserPosts_Success() throws Exception {
    JSONObject mockResponse = new JSONObject();
    mockResponse.put("posts", "Sample posts");

    given(userService.getUserPosts("user1", "user1")).willReturn(mockResponse);

    mockMvc.perform(get("/user/post").param("id", "user1").cookie(new MockCookie("userId", "user1")))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.posts").value("Sample posts"));
  }

  @Test
  public void getSelfPosts_Success() throws Exception {
    JSONArray mockResponse = new JSONArray();
    mockResponse.add("Post 1");
    mockResponse.add("Post 2");

    given(userService.getSelfPosts("user1")).willReturn(mockResponse);

    mockMvc.perform(get("/user/self/post").cookie(new MockCookie("userId", "user1")))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$[0]").value("Post 1"))
            .andExpect(jsonPath("$[1]").value("Post 2"));
  }

  @Test
  public void getUserCollect_Success() throws Exception {
    JSONObject mockResponse = new JSONObject();
    mockResponse.put("collects", "Sample collects");

    given(userService.getUserCollects("user1", "user1")).willReturn(mockResponse);

    mockMvc.perform(get("/user/collect").param("id", "user1").cookie(new MockCookie("userId", "user1")))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.collects").value("Sample collects"));
  }

  @Test
  public void getSelfCollect_Success() throws Exception {
    JSONArray mockResponse = new JSONArray();
    mockResponse.add("Collect 1");
    mockResponse.add("Collect 2");

    given(userService.getSelfCollects("user1")).willReturn(mockResponse);

    mockMvc.perform(get("/user/self/collect").cookie(new MockCookie("userId", "user1")))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$[0]").value("Collect 1"))
            .andExpect(jsonPath("$[1]").value("Collect 2"));
  }

  // Additional tests to cover error paths, input validations, etc. should be added here.
}
