DROP DATABASE IF EXISTS imeete;
CREATE DATABASE imeete;
USE imeete;

# 账户密码表
CREATE TABLE account
(
    user_id  VARCHAR(16) PRIMARY KEY, # 账号
    password VARCHAR(16) NOT NULL     # 密码
);

# 用户表
CREATE TABLE user
(
    user_id   VARCHAR(16) PRIMARY KEY, # 账号
    nickname  VARCHAR(16) NOT NULL,    # 昵称
    avatar    TEXT        NOT NULL,    # 头像URL
    mbti      CHAR(4) DEFAULT 'NONE',  # MBTI('NONE':未设定)
    sex       TINYINT DEFAULT -1,      # 性别(0:男,1:女,-1:未设定)
    age       INT     DEFAULT 0,       # 年龄
    area      VARCHAR(32) NOT NULL,    # 地区
    intro     TEXT        NOT NULL,    # 个人简介
    following INT     DEFAULT 0,       # 关注量
    follower  INT     DEFAULT 0        # 粉丝量
);

# 关注表
CREATE TABLE follow
(
    followee_id VARCHAR(16) NOT NULL, # 被关注者账号
    follower_id VARCHAR(16) NOT NULL, # 关注者账号
    PRIMARY KEY (followee_id, follower_id)
);

# 帖子表
CREATE TABLE post
(
    post_id    INT PRIMARY KEY AUTO_INCREMENT,      # 帖子编号
    user_id    VARCHAR(16) NOT NULL,                # 发帖用户账号
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, # 发帖时间
    title      TEXT        NOT NULL,                # 帖子标题
    cover      TEXT        NOT NULL,                # 封面URL
    content    TEXT        NOT NULL,                # 帖子内容
    watch      INT       DEFAULT 0,                 # 浏览量
    `like`     INT       DEFAULT 0,                 # 点赞量
    collect    INT       DEFAULT 0,                 # 收藏量
    share      INT       DEFAULT 0,                 # 分享量
    comment    INT       DEFAULT 0,                 # 评论量
    mbti       CHAR(4)   DEFAULT 'NONE'             # MBTI('NONE':未设定)
);

# 点赞表
CREATE TABLE `like`
(
    user_id VARCHAR(16) NOT NULL, # 用户账号
    post_id INT         NOT NULL, # 帖子编号
    PRIMARY KEY (user_id, post_id)
);

# 收藏表
CREATE TABLE collect
(
    user_id VARCHAR(16) NOT NULL, # 用户账号
    post_id INT         NOT NULL, # 帖子编号
    PRIMARY KEY (user_id, post_id)
);

# 评论表
CREATE TABLE comment
(
    comment_id BIGINT PRIMARY KEY AUTO_INCREMENT,   # 评论编号
    post_id    INT         NOT NULL,                # 帖子编号
    user_id    VARCHAR(16) NOT NULL,                # 评论用户账号
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, # 评论时间
    content    TEXT        NOT NULL,                # 评论内容
    `like`     INT       DEFAULT 0                  # 点赞量
);

# 评论点赞表
CREATE TABLE comment_like
(
    comment_id BIGINT      NOT NULL, # 评论编号
    user_id    VARCHAR(16) NOT NULL, # 用户账号
    PRIMARY KEY (comment_id, user_id)
);

# MBTI介绍表
CREATE TABLE mbti_intro
(
    mbti  CHAR(4) PRIMARY KEY NOT NULL, # MBTI类型
    intro TEXT                NOT NULL  # MBTI介绍
);

# MBTI测试表
CREATE TABLE mbti_test
(
    test_id  INT PRIMARY KEY AUTO_INCREMENT, # 测试编号
    question TEXT NOT NULL                   # 测试问题
);