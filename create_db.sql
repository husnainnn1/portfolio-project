CREATE DATABASE IF NOT EXISTS project_food;
USE project_food;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,    -- Unique identifier for each user
    username VARCHAR(50) NOT NULL UNIQUE, -- Username must be unique and not null
    password VARCHAR(255) NOT NULL,       -- Password (hashed), cannot be null
    firstname VARCHAR(255) NOT NULL,      -- First name, cannot be null
    lastname VARCHAR(255) NOT NULL,       -- Last name, cannot be null
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Record creation timestamp
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Last updated timestamp
);

CREATE TABLE posts (
    id INT AUTO_INCREMENT PRIMARY KEY,   -- Unique identifier for each post
    title VARCHAR(100) NOT NULL,         -- Title of the post, must not be null
    content TEXT NOT NULL,               -- Content of the post, must not be null
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Record creation timestamp
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Last updated timestamp
);

CREATE TABLE fast_foods (
    id INT AUTO_INCREMENT PRIMARY KEY,    -- Unique identifier for each fast food item
    title VARCHAR(255) NOT NULL,          -- Title of the fast food item, must not be null
    content VARCHAR(255),                 -- Content/description of the fast food item (optional)
    price FLOAT NOT NULL,                 -- Price of the fast food item, must not be null
    stock INT NOT NULL,                   -- Stock quantity, must not be null
    image VARCHAR(255),                   -- Image URL or path (optional)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Record creation timestamp
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Last updated timestamp
);

ALTER TABLE users
ADD COLUMN createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

ALTER TABLE users
DROP COLUMN createdAt,
DROP COLUMN updatedAt;

ALTER TABLE users
ADD COLUMN createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

CREATE TABLE FastFoods (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content VARCHAR(255),
  price FLOAT NOT NULL,
  stock INT NOT NULL,
  image VARCHAR(255),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- # Create the app user
-- CREATE USER IF NOT EXISTS 'msoha001'@'localhost' IDENTIFIED BY 'abcd'; 
-- GRANT ALL PRIVILEGES ON project_food.* TO ' msoha001'@'localhost';

# Create the app user
CREATE USER IF NOT EXISTS 'bettys_books_app'@'localhost' IDENTIFIED BY 'qwertyuiop'; 
GRANT ALL PRIVILEGES ON bettys_books.* TO ' bettys_books_app'@'localhost';
