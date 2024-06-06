package com.example.imeete.controller;

import com.alibaba.fastjson2.JSONObject;
import com.example.imeete.controller.LoginController;
import com.example.imeete.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class LoginControllerTest {

    private MockMvc mockMvc;

    @Mock
    private UserService userService;

    @InjectMocks
    private LoginController loginController;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(loginController).build();
    }

    @Test
    public void login_Success() throws Exception {
        // 构建登录请求
        JSONObject loginRequest = new JSONObject();
        loginRequest.put("id", "user1");
        loginRequest.put("password", "password");

        // 构建服务层的模拟返回值
        JSONObject mockResponse = new JSONObject();
        mockResponse.put("status", "success");
        mockResponse.put("message", "登录成功");

        given(userService.login("user1", "password")).willReturn(mockResponse);

        mockMvc.perform(post("/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(loginRequest.toJSONString()))
                .andExpect(status().isOk())
                .andExpect(content().json(mockResponse.toJSONString()));
    }

    @Test
    public void login_Failure() throws Exception {
        // 构建登录请求
        JSONObject loginRequest = new JSONObject();
        loginRequest.put("id", "user1");
        loginRequest.put("password", "wrongpassword");

        // 构建服务层的模拟返回值
        JSONObject mockResponse = new JSONObject();
        mockResponse.put("status", "failure");
        mockResponse.put("message", "密码错误");

        given(userService.login("user1", "wrongpassword")).willReturn(mockResponse);

        mockMvc.perform(post("/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(loginRequest.toJSONString()))
                .andExpect(status().isOk())
                .andExpect(content().json(mockResponse.toJSONString()));
    }

    @Test
    public void login_UserNotFound() throws Exception {
        // 构建登录请求
        JSONObject loginRequest = new JSONObject();
        loginRequest.put("id", "unknownUser");
        loginRequest.put("password", "password");

        // 构建服务层的模拟返回值
        JSONObject mockResponse = new JSONObject();
        mockResponse.put("status", "failure");
        mockResponse.put("message", "账号不存在");

        given(userService.login("unknownUser", "password")).willReturn(mockResponse);

        mockMvc.perform(post("/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(loginRequest.toJSONString()))
                .andExpect(status().isOk())
                .andExpect(content().json(mockResponse.toJSONString()));
    }
}
