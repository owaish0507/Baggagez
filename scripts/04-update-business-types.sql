-- Update business_type column to accommodate new types
ALTER TABLE partners ALTER COLUMN business_type TYPE VARCHAR(100);

-- Add a custom_business_type column for "other" category
ALTER TABLE partners ADD COLUMN IF NOT EXISTS custom_business_type VARCHAR(255);

-- Update existing partners with new business types
UPDATE partners SET business_type = 'cafe' WHERE business_type = 'travelling';
UPDATE partners SET business_type = 'store' WHERE business_type = 'tourism';
UPDATE partners SET business_type = 'office' WHERE business_type = 'business';
UPDATE partners SET business_type = 'supermarket' WHERE business_type = 'marketing';
UPDATE partners SET business_type = 'temple' WHERE business_type = 'religious';
UPDATE partners SET business_type = 'temple' WHERE business_type = 'spiritual';

-- Add some sample partners with new business types
INSERT INTO partners (user_id, business_name, business_type, description, address, city, state, pincode, latitude, longitude, contact_phone, contact_email, max_baggage_limit, current_available_bags, price_per_hour, price_per_day, amenities, operating_hours, is_verified) VALUES

-- Cafe Partners
(1, 'Starbucks Connaught Place', 'cafe', 'Premium coffee shop with secure baggage storage for customers', 'Connaught Place, Block B', 'New Delhi', 'Delhi', '110001', 28.6315, 77.2167, '+91-9876543230', 'storage@starbucks-cp.com', 20, 18, 45.00, 180.00, ARRAY['security_camera', 'wifi', 'charging_points', 'restroom_facilities'], '{"monday": {"open": "07:00", "close": "23:00"}, "tuesday": {"open": "07:00", "close": "23:00"}, "wednesday": {"open": "07:00", "close": "23:00"}, "thursday": {"open": "07:00", "close": "23:00"}, "friday": {"open": "07:00", "close": "23:00"}, "saturday": {"open": "07:00", "close": "23:00"}, "sunday": {"open": "08:00", "close": "22:00"}}', true),

-- Store Partners
(2, 'Big Bazaar Storage Point', 'supermarket', 'Hypermarket with dedicated customer baggage storage area', 'Select City Walk Mall, Saket', 'New Delhi', 'Delhi', '110017', 28.5245, 77.2066, '+91-9876543231', 'storage@bigbazaar-saket.com', 60, 55, 35.00, 140.00, ARRAY['security_camera', 'climate_control', 'shopping_area', 'food_court'], '{"monday": {"open": "10:00", "close": "22:00"}, "tuesday": {"open": "10:00", "close": "22:00"}, "wednesday": {"open": "10:00", "close": "22:00"}, "thursday": {"open": "10:00", "close": "22:00"}, "friday": {"open": "10:00", "close": "22:00"}, "saturday": {"open": "10:00", "close": "22:00"}, "sunday": {"open": "10:00", "close": "22:00"}}', true),

-- Showroom Partners
(3, 'Maruti Suzuki Showroom Storage', 'showroom', 'Car showroom with customer convenience baggage storage', 'Rajouri Garden', 'New Delhi', 'Delhi', '110027', 28.6467, 77.1200, '+91-9876543232', 'storage@maruti-rajouri.com', 30, 28, 40.00, 160.00, ARRAY['security_camera', 'climate_control', 'parking_available', 'wifi'], '{"monday": {"open": "09:00", "close": "19:00"}, "tuesday": {"open": "09:00", "close": "19:00"}, "wednesday": {"open": "09:00", "close": "19:00"}, "thursday": {"open": "09:00", "close": "19:00"}, "friday": {"open": "09:00", "close": "19:00"}, "saturday": {"open": "09:00", "close": "19:00"}, "sunday": {"open": "10:00", "close": "18:00"}}', true),

-- Locker Facility
(4, 'Smart Lockers Central Delhi', 'locker', 'Self-service smart locker facility for travelers', 'Karol Bagh Metro Station', 'New Delhi', 'Delhi', '110005', 28.6508, 77.1901, '+91-9876543233', 'info@smartlockers-kb.com', 100, 85, 25.00, 100.00, ARRAY['24x7_access', 'cctv_monitoring', 'public_transport', 'atm_nearby'], '{"monday": {"open": "00:00", "close": "23:59"}, "tuesday": {"open": "00:00", "close": "23:59"}, "wednesday": {"open": "00:00", "close": "23:59"}, "thursday": {"open": "00:00", "close": "23:59"}, "friday": {"open": "00:00", "close": "23:59"}, "saturday": {"open": "00:00", "close": "23:59"}, "sunday": {"open": "00:00", "close": "23:59"}}', true),

-- Hotel Partners
(5, 'Hotel Ashoka Storage Service', 'hotel', 'Luxury hotel offering baggage storage for non-guests', 'Chanakyapuri', 'New Delhi', 'Delhi', '110021', 28.5984, 77.1892, '+91-9876543234', 'concierge@hotelashoka.com', 40, 35, 60.00, 240.00, ARRAY['security_camera', 'climate_control', 'insurance_covered', 'restroom_facilities'], '{"monday": {"open": "06:00", "close": "24:00"}, "tuesday": {"open": "06:00", "close": "24:00"}, "wednesday": {"open": "06:00", "close": "24:00"}, "thursday": {"open": "06:00", "close": "24:00"}, "friday": {"open": "06:00", "close": "24:00"}, "saturday": {"open": "06:00", "close": "24:00"}, "sunday": {"open": "06:00", "close": "24:00"}}', true);

-- Update ratings for new partners
UPDATE partners SET rating = 4.6, total_reviews = 32 WHERE business_name = 'Starbucks Connaught Place';
UPDATE partners SET rating = 4.3, total_reviews = 28 WHERE business_name = 'Big Bazaar Storage Point';
UPDATE partners SET rating = 4.4, total_reviews = 19 WHERE business_name = 'Maruti Suzuki Showroom Storage';
UPDATE partners SET rating = 4.7, total_reviews = 41 WHERE business_name = 'Smart Lockers Central Delhi';
UPDATE partners SET rating = 4.8, total_reviews = 35 WHERE business_name = 'Hotel Ashoka Storage Service';
