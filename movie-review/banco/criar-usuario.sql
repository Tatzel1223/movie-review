CREATE DATABASE IF NOT EXISTS movie_review;

CREATE USER IF NOT EXISTS 'movie_review_app'@'localhost' IDENTIFIED BY 'MovieReview@2026';

GRANT ALL PRIVILEGES ON movie_review.* TO 'movie_review_app'@'localhost';

FLUSH PRIVILEGES;
