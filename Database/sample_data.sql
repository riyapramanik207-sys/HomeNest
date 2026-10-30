USE homenest_db;

-- Insert sample user/owner
INSERT INTO users
(full_name, email, phone, password, role)
VALUES
('Sneha Dey', 'sneha@gmail.com', '9876543210',
 'demo_password', 'OWNER'),
('Priya Das', 'priya@gmail.com', '9876543211',
 'demo_password', 'USER');

-- Insert sample property
INSERT INTO properties
(owner_id, property_name, property_type, description,
 address, city, monthly_rent, gender_preference,
 food_available, wifi_available)
VALUES
(1, 'Sunshine PG', 'PG', 'Comfortable PG accommodation',
 'Chinsurah', 'Hooghly', 8000,
 'ANY', TRUE, TRUE);

-- Insert sample room
INSERT INTO rooms
(property_id, room_type, total_rooms,
 available_rooms, attached_bathroom, monthly_rent)
VALUES
(1, 'DOUBLE', 10, 5, TRUE, 8000);

-- Insert sample booking
INSERT INTO bookings
(user_id, property_id, room_id, check_in_date,
 duration_months, number_of_occupants, total_amount)
VALUES
(2, 1, 1, '2026-11-15', 3, 1, 24000);

-- Insert sample favorite
INSERT INTO favorites (user_id, property_id)
VALUES (2, 1);