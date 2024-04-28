package com.example.imeete.service;

import com.alibaba.fastjson2.JSONArray;
import com.alibaba.fastjson2.JSONObject;

import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;

import static java.nio.file.Files.readString;
import static java.nio.file.Files.writeString;

public class User {
  private static final Map<String, User> usertable = new HashMap<String,
          User>();
  public String userid;
  public String password;
  public String nickname;
  public MBTI mbti;
  public int check;

  private User() {
  }

  /**
   * 向用户表中添加一个新用户
   *
   * @param userid   账号
   * @param password 密码
   * @param nickname 昵称
   * @param mbti     MBTI
   */
  public static void addUser(String userid, String password, String nickname,
                             MBTI mbti) {
    User user = new User();
    user.userid = userid;
    user.password = password;
    user.nickname = nickname;
    user.mbti = mbti;
    user.check = 0;
    usertable.put(userid, user);
  }

  /**
   * 从用户表中删除用户
   *
   * @param userid 账号
   */
  public static void delUser(String userid) {
    usertable.remove(userid);
  }

  /**
   * 从用户表中获取用户
   *
   * @param userid 账号
   * @return 用户
   */
  public static User getUser(String userid) {
    return usertable.get(userid);
  }

  /**
   * 从json文件中获取用户表（在实现数据库之前暂时的方案）
   *
   * @param filename 文件名
   */
  public static void loadFromJson(String filename) {
    try {
      String json = readString(Paths.get(filename));
      JSONArray array = JSONArray.parseArray(json);
      for (Object object : array) {
        JSONObject user = (JSONObject) object;
        String userid = user.getString("userid");
        String password = user.getString("password");
        String nickname = user.getString("nickname");
        MBTI mbti = MBTI.valueOf(user.getString("mbti"));
        addUser(userid, password, nickname, mbti);
      }
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  /**
   * 将用户表保存到json文件（在实现数据库之前暂时的方案）
   *
   * @param filename 文件名
   */
  public static void saveToJson(String filename) {
    JSONArray array = new JSONArray();
    for (User user : usertable.values()) {
      JSONObject object = new JSONObject();
      object.put("userid", user.userid);
      object.put("password", user.password);
      object.put("nickname", user.nickname);
      object.put("mbti", user.mbti.toString());
      array.add(object);
    }
    try {
      String json = array.toJSONString();
      writeString(Paths.get(filename), json);
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}
