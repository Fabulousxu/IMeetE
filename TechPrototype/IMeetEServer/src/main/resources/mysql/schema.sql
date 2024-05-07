DROP DATABASE IF EXISTS imeete;
CREATE DATABASE imeete;
USE imeete;

# 账户密码表
CREATE TABLE account
(
    account_id       VARCHAR(16) PRIMARY KEY, # 账号
    account_password VARCHAR(16) NOT NULL     # 密码
);

# 用户表
CREATE TABLE user
(
    user_id              VARCHAR(16) PRIMARY KEY, # 账号
    user_nickname        VARCHAR(16) NOT NULL,    # 昵称
    user_avatar          TEXT        NOT NULL,    # 头像URL
    user_mbti            CHAR(4) DEFAULT 'NONE',  # MBTI('NONE':未设定)
    user_sex             TINYINT DEFAULT -1,      # 性别(0:男,1:女,-1:未设定)
    user_age             INT     DEFAULT 0,       # 年龄
    user_area            VARCHAR(32) NOT NULL,    # 地区
    user_intro           TEXT        NOT NULL,    # 个人简介
    user_following_count INT     DEFAULT 0,       # 关注量
    user_follower_count  INT     DEFAULT 0,       # 粉丝量
    FOREIGN KEY (user_id) REFERENCES account (account_id) ON DELETE CASCADE ON UPDATE CASCADE
);

# 关注表
CREATE TABLE follow
(
    followee_id VARCHAR(16) NOT NULL, # 被关注者账号
    follower_id VARCHAR(16) NOT NULL, # 关注者账号
    PRIMARY KEY (followee_id, follower_id),
    FOREIGN KEY (followee_id) REFERENCES user (user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (follower_id) REFERENCES user (user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

# 帖子表
CREATE TABLE post
(
    post_id            INT PRIMARY KEY AUTO_INCREMENT,      # 帖子编号
    user_id            VARCHAR(16) NOT NULL,                # 发帖用户账号
    post_time          TIMESTAMP DEFAULT CURRENT_TIMESTAMP, # 发帖时间
    post_title         TEXT        NOT NULL,                # 帖子标题
    post_cover         TEXT        NOT NULL,                # 封面URL
    post_content       TEXT        NOT NULL,                # 帖子内容
    post_watch_count   INT       DEFAULT 0,                 # 浏览量
    post_like_count    INT       DEFAULT 0,                 # 点赞量
    post_collect_count INT       DEFAULT 0,                 # 收藏量
    post_share_count   INT       DEFAULT 0,                 # 分享量
    post_comment_count INT       DEFAULT 0,                 # 评论量
    FOREIGN KEY (user_id) REFERENCES user (user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

# 点赞表
CREATE TABLE `like`
(
    user_id VARCHAR(16) NOT NULL, # 用户账号
    post_id INT         NOT NULL, # 帖子编号
    PRIMARY KEY (user_id, post_id),
    FOREIGN KEY (user_id) REFERENCES user (user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (post_id) REFERENCES post (post_id) ON DELETE CASCADE ON UPDATE CASCADE
);

# 收藏表
CREATE TABLE collect
(
    user_id VARCHAR(16) NOT NULL, # 用户账号
    post_id INT         NOT NULL, # 帖子编号
    PRIMARY KEY (user_id, post_id),
    FOREIGN KEY (user_id) REFERENCES user (user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (post_id) REFERENCES post (post_id) ON DELETE CASCADE ON UPDATE CASCADE
);

# 评论表
CREATE TABLE comment
(
    comment_id      BIGINT PRIMARY KEY AUTO_INCREMENT,   # 评论编号
    post_id         INT         NOT NULL,                # 帖子编号
    user_id         VARCHAR(16) NOT NULL,                # 评论用户账号
    comment_time    TIMESTAMP DEFAULT CURRENT_TIMESTAMP, # 评论时间
    comment_content TEXT        NOT NULL,                # 评论内容
    FOREIGN KEY (user_id) REFERENCES user (user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (post_id) REFERENCES post (post_id) ON DELETE CASCADE ON UPDATE CASCADE
);

# MBTI介绍表
CREATE TABLE mbti_intro
(
    mbti_type  CHAR(4) PRIMARY KEY NOT NULL,
    mbti_intro TEXT                NOT NULL
);

# MBTI测试表
CREATE TABLE mbti_test
(
    mbti_test_id       INT PRIMARY KEY AUTO_INCREMENT,
    mbti_test_question TEXT NOT NULL
);