CREATE DATABASE IF NOT EXISTS imeete;
USE imeete;
CREATE TABLE IF NOT EXISTS mbti_test (
    test_id INT PRIMARY KEY AUTO_INCREMENT,
    question TEXT
);

# 清空表
TRUNCATE TABLE mbti_test;

# 插入数据

INSERT INTO mbti_test (question) VALUES
('You find it difficult to introduce yourself to other people.'),
('You often get so lost in thoughts that you ignore or forget your surroundings.'),
('You try to respond to your emails as soon as possible and cannot stand a messy inbox.'),
('You find it easy to stay relaxed and focused even when there is some pressure.'),
('You do not usually initiate conversations.'),
('You rarely do something just out of sheer curiosity.'),
('You feel superior to other people.'),
('Being organized is more important to you than being adaptable.'),
('You are usually highly motivated and energetic.'),
('Winning a debate matters less to you than making sure no one gets upset.'),
('You often feel as if you have to justify yourself to other people.'),
('Your home and work environments are quite tidy.');