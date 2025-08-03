-- Insert sample users for partners
INSERT INTO users (email, password_hash, full_name, phone, user_type) VALUES
('partner1@delhi.com', '$2b$10$example_hash_1', 'Rajesh Kumar', '+91-9876543210', 'partner'),
('partner2@mumbai.com', '$2b$10$example_hash_2', 'Priya Sharma', '+91-9876543211', 'partner'),
('partner3@bangalore.com', '$2b$10$example_hash_3', 'Suresh Reddy', '+91-9876543212', 'partner'),
('partner4@chennai.com', '$2b$10$example_hash_4', 'Lakshmi Iyer', '+91-9876543213', 'partner'),
('partner5@jaipur.com', '$2b$10$example_hash_5', 'Vikram Singh', '+91-9876543214', 'partner'),
('partner6@punjab.com', '$2b$10$example_hash_6', 'Gurpreet Kaur', '+91-9876543215', 'partner'),
('partner7@uttarakhand.com', '$2b$10$example_hash_7', 'Mohan Bisht', '+91-9876543216', 'partner'),
('partner8@kolkata.com', '$2b$10$example_hash_8', 'Anita Das', '+91-9876543217', 'partner'),
('partner9@hyderabad.com', '$2b$10$example_hash_9', 'Ravi Chandra', '+91-9876543218', 'partner'),
('partner10@pune.com', '$2b$10$example_hash_10', 'Sneha Patil', '+91-9876543219', 'partner');

-- Insert partners across different cities and categories
INSERT INTO partners (user_id, business_name, business_type, description, address, city, state, pincode, latitude, longitude, contact_phone, contact_email, storage_capacity, price_per_hour, price_per_day, amenities, operating_hours, is_verified) VALUES

-- Delhi NCR Partners
(1, 'Delhi Central Storage Hub', 'travelling', 'Secure baggage storage near New Delhi Railway Station', 'Paharganj, Near New Delhi Railway Station', 'New Delhi', 'Delhi', '110055', 28.6448, 77.2097, '+91-9876543210', 'partner1@delhi.com', 50, 40.00, 150.00, ARRAY['security_camera', 'climate_control', '24x7_access'], '{"monday": {"open": "06:00", "close": "23:00"}, "tuesday": {"open": "06:00", "close": "23:00"}, "wednesday": {"open": "06:00", "close": "23:00"}, "thursday": {"open": "06:00", "close": "23:00"}, "friday": {"open": "06:00", "close": "23:00"}, "saturday": {"open": "06:00", "close": "23:00"}, "sunday": {"open": "06:00", "close": "23:00"}}', true),

(2, 'Connaught Place Business Center', 'business', 'Premium storage facility in the heart of Delhi', 'Connaught Place, Block A', 'New Delhi', 'Delhi', '110001', 28.6315, 77.2167, '+91-9876543220', 'cp.storage@delhi.com', 30, 60.00, 250.00, ARRAY['security_camera', 'climate_control', 'insurance_covered'], '{"monday": {"open": "08:00", "close": "20:00"}, "tuesday": {"open": "08:00", "close": "20:00"}, "wednesday": {"open": "08:00", "close": "20:00"}, "thursday": {"open": "08:00", "close": "20:00"}, "friday": {"open": "08:00", "close": "20:00"}, "saturday": {"open": "09:00", "close": "18:00"}, "sunday": {"open": "10:00", "close": "17:00"}}', true),

-- Jaipur Partners
(5, 'Pink City Tourist Storage', 'tourism', 'Convenient storage near major tourist attractions', 'Near Hawa Mahal, Badi Choupad', 'Jaipur', 'Rajasthan', '302002', 26.9239, 75.8267, '+91-9876543214', 'partner5@jaipur.com', 40, 35.00, 120.00, ARRAY['security_camera', 'tourist_guide'], '{"monday": {"open": "07:00", "close": "22:00"}, "tuesday": {"open": "07:00", "close": "22:00"}, "wednesday": {"open": "07:00", "close": "22:00"}, "thursday": {"open": "07:00", "close": "22:00"}, "friday": {"open": "07:00", "close": "22:00"}, "saturday": {"open": "07:00", "close": "22:00"}, "sunday": {"open": "07:00", "close": "22:00"}}', true),

(6, 'Amber Fort Storage Point', 'religious', 'Sacred storage facility near historical sites', 'Amber Fort Road, Amer', 'Jaipur', 'Rajasthan', '302001', 26.9855, 75.8513, '+91-9876543225', 'amber.storage@jaipur.com', 25, 30.00, 100.00, ARRAY['security_camera', 'religious_friendly'], '{"monday": {"open": "06:00", "close": "21:00"}, "tuesday": {"open": "06:00", "close": "21:00"}, "wednesday": {"open": "06:00", "close": "21:00"}, "thursday": {"open": "06:00", "close": "21:00"}, "friday": {"open": "06:00", "close": "21:00"}, "saturday": {"open": "06:00", "close": "21:00"}, "sunday": {"open": "06:00", "close": "21:00"}}', true),

-- Bangalore Partners
(3, 'Bangalore Tech Hub Storage', 'business', 'Modern storage facility in IT corridor', 'Electronic City, Phase 1', 'Bangalore', 'Karnataka', '560100', 12.8456, 77.6603, '+91-9876543212', 'partner3@bangalore.com', 60, 45.00, 180.00, ARRAY['security_camera', 'climate_control', 'wifi'], '{"monday": {"open": "07:00", "close": "22:00"}, "tuesday": {"open": "07:00", "close": "22:00"}, "wednesday": {"open": "07:00", "close": "22:00"}, "thursday": {"open": "07:00", "close": "22:00"}, "friday": {"open": "07:00", "close": "22:00"}, "saturday": {"open": "08:00", "close": "20:00"}, "sunday": {"open": "09:00", "close": "19:00"}}', true),

(7, 'Garden City Tourism Storage', 'tourism', 'Storage facility near Lalbagh and Cubbon Park', 'MG Road, Near Cubbon Park', 'Bangalore', 'Karnataka', '560001', 12.9716, 77.5946, '+91-9876543226', 'garden.storage@bangalore.com', 35, 40.00, 160.00, ARRAY['security_camera', 'tourist_info'], '{"monday": {"open": "06:00", "close": "23:00"}, "tuesday": {"open": "06:00", "close": "23:00"}, "wednesday": {"open": "06:00", "close": "23:00"}, "thursday": {"open": "06:00", "close": "23:00"}, "friday": {"open": "06:00", "close": "23:00"}, "saturday": {"open": "06:00", "close": "23:00"}, "sunday": {"open": "06:00", "close": "23:00"}}', true),

-- Chennai Partners
(4, 'Marina Beach Storage Center', 'tourism', 'Beachside storage facility for tourists', 'Marina Beach Road, Triplicane', 'Chennai', 'Tamil Nadu', '600005', 13.0475, 80.2824, '+91-9876543213', 'partner4@chennai.com', 45, 35.00, 140.00, ARRAY['security_camera', 'beach_access'], '{"monday": {"open": "05:00", "close": "23:00"}, "tuesday": {"open": "05:00", "close": "23:00"}, "wednesday": {"open": "05:00", "close": "23:00"}, "thursday": {"open": "05:00", "close": "23:00"}, "friday": {"open": "05:00", "close": "23:00"}, "saturday": {"open": "05:00", "close": "23:00"}, "sunday": {"open": "05:00", "close": "23:00"}}', true),

(8, 'Kapaleeshwarar Temple Storage', 'religious', 'Sacred storage near ancient temple', 'Mylapore, Near Kapaleeshwarar Temple', 'Chennai', 'Tamil Nadu', '600004', 13.0339, 80.2619, '+91-9876543227', 'temple.storage@chennai.com', 20, 25.00, 80.00, ARRAY['security_camera', 'religious_friendly', 'shoe_storage'], '{"monday": {"open": "04:00", "close": "22:00"}, "tuesday": {"open": "04:00", "close": "22:00"}, "wednesday": {"open": "04:00", "close": "22:00"}, "thursday": {"open": "04:00", "close": "22:00"}, "friday": {"open": "04:00", "close": "22:00"}, "saturday": {"open": "04:00", "close": "22:00"}, "sunday": {"open": "04:00", "close": "22:00"}}', true),

-- Punjab Partners
(6, 'Golden Temple Storage Service', 'spiritual', 'Spiritual storage facility near Golden Temple', 'Golden Temple Complex, Amritsar', 'Amritsar', 'Punjab', '143006', 31.6200, 74.8765, '+91-9876543215', 'partner6@punjab.com', 100, 20.00, 60.00, ARRAY['security_camera', 'spiritual_friendly', 'free_water'], '{"monday": {"open": "03:00", "close": "24:00"}, "tuesday": {"open": "03:00", "close": "24:00"}, "wednesday": {"open": "03:00", "close": "24:00"}, "thursday": {"open": "03:00", "close": "24:00"}, "friday": {"open": "03:00", "close": "24:00"}, "saturday": {"open": "03:00", "close": "24:00"}, "sunday": {"open": "03:00", "close": "24:00"}}', true),

(9, 'Chandigarh Business Hub', 'business', 'Modern storage in planned city', 'Sector 17, Chandigarh', 'Chandigarh', 'Punjab', '160017', 30.7333, 76.7794, '+91-9876543228', 'business.storage@chandigarh.com', 40, 50.00, 200.00, ARRAY['security_camera', 'climate_control', 'meeting_room'], '{"monday": {"open": "08:00", "close": "20:00"}, "tuesday": {"open": "08:00", "close": "20:00"}, "wednesday": {"open": "08:00", "close": "20:00"}, "thursday": {"open": "08:00", "close": "20:00"}, "friday": {"open": "08:00", "close": "20:00"}, "saturday": {"open": "09:00", "close": "18:00"}, "sunday": {"open": "10:00", "close": "17:00"}}', true),

-- Uttarakhand Partners
(7, 'Rishikesh Spiritual Storage', 'spiritual', 'Peaceful storage for spiritual seekers', 'Laxman Jhula, Rishikesh', 'Rishikesh', 'Uttarakhand', '249302', 30.1040, 78.2932, '+91-9876543216', 'partner7@uttarakhand.com', 30, 25.00, 90.00, ARRAY['security_camera', 'spiritual_friendly', 'yoga_mats'], '{"monday": {"open": "05:00", "close": "22:00"}, "tuesday": {"open": "05:00", "close": "22:00"}, "wednesday": {"open": "05:00", "close": "22:00"}, "thursday": {"open": "05:00", "close": "22:00"}, "friday": {"open": "05:00", "close": "22:00"}, "saturday": {"open": "05:00", "close": "22:00"}, "sunday": {"open": "05:00", "close": "22:00"}}', true),

(10, 'Haridwar Pilgrimage Storage', 'religious', 'Sacred storage for pilgrims', 'Har Ki Pauri, Haridwar', 'Haridwar', 'Uttarakhand', '249401', 29.9457, 78.1642, '+91-9876543229', 'pilgrimage.storage@haridwar.com', 80, 20.00, 70.00, ARRAY['security_camera', 'religious_friendly', 'ganga_aarti_info'], '{"monday": {"open": "04:00", "close": "23:00"}, "tuesday": {"open": "04:00", "close": "23:00"}, "wednesday": {"open": "04:00", "close": "23:00"}, "thursday": {"open": "04:00", "close": "23:00"}, "friday": {"open": "04:00", "close": "23:00"}, "saturday": {"open": "04:00", "close": "23:00"}, "sunday": {"open": "04:00", "close": "23:00"}}', true);

-- Update partner ratings with sample data
UPDATE partners SET rating = 4.5, total_reviews = 25 WHERE id = 1;
UPDATE partners SET rating = 4.8, total_reviews = 42 WHERE id = 2;
UPDATE partners SET rating = 4.3, total_reviews = 18 WHERE id = 3;
UPDATE partners SET rating = 4.6, total_reviews = 31 WHERE id = 4;
UPDATE partners SET rating = 4.4, total_reviews = 22 WHERE id = 5;
UPDATE partners SET rating = 4.9, total_reviews = 67 WHERE id = 6;
UPDATE partners SET rating = 4.7, total_reviews = 38 WHERE id = 7;
UPDATE partners SET rating = 4.2, total_reviews = 15 WHERE id = 8;
UPDATE partners SET rating = 4.5, total_reviews = 29 WHERE id = 9;
UPDATE partners SET rating = 4.8, total_reviews = 45 WHERE id = 10;
