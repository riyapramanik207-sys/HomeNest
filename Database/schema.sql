CREATE DATABASE IF NOT EXISTS homenest_db;
USE homenest_db;

-- 1. Users and account details
CREATE TABLE IF NOT EXISTS users (
    user_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone VARCHAR(20),
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('USER', 'OWNER', 'ADMIN') DEFAULT 'USER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. PG, hostel and flat listings
CREATE TABLE IF NOT EXISTS properties (
    property_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    owner_id BIGINT NOT NULL,
    property_name VARCHAR(150) NOT NULL,
    location VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    property_type ENUM('PG', 'HOSTEL', 'FLAT') NOT NULL,
    gender_preference ENUM('MALE', 'FEMALE', 'ALL')
        DEFAULT 'ALL',
    room_type ENUM('SINGLE', 'DOUBLE', 'TRIPLE') NOT NULL,
    monthly_rent DECIMAL(10,2) NOT NULL,
    available_rooms INT DEFAULT 0,
    food_available BOOLEAN DEFAULT FALSE,
    wifi_available BOOLEAN DEFAULT FALSE,
    attached_bathroom BOOLEAN DEFAULT FALSE,
    description TEXT,
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES users(user_id)
);

-- 3. Property bookings
CREATE TABLE IF NOT EXISTS bookings (
    booking_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    property_id BIGINT NOT NULL,
    check_in_date DATE NOT NULL,
    duration_months INT NOT NULL,
    occupants INT DEFAULT 1,
    special_requirements TEXT,
    booking_status ENUM(
        'PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'
    ) DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (property_id) REFERENCES properties(property_id)
);

-- 4. Property reviews
CREATE TABLE IF NOT EXISTS reviews (
    review_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    property_id BIGINT NOT NULL,
    rating INT NOT NULL,
    comment TEXT,
    review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (property_id) REFERENCES properties(property_id),
    CHECK (rating BETWEEN 1 AND 5),
    UNIQUE (user_id, property_id)
);

-- 5. Available amenities
CREATE TABLE IF NOT EXISTS amenities (
    amenity_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    amenity_name VARCHAR(100) NOT NULL UNIQUE
);

-- 6. Amenities linked to properties
CREATE TABLE IF NOT EXISTS property_amenities (
    property_id BIGINT NOT NULL,
    amenity_id BIGINT NOT NULL,
    PRIMARY KEY (property_id, amenity_id),
    FOREIGN KEY (property_id)
        REFERENCES properties(property_id) ON DELETE CASCADE,
    FOREIGN KEY (amenity_id)
        REFERENCES amenities(amenity_id) ON DELETE CASCADE
);