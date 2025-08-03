-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    user_type VARCHAR(20) DEFAULT 'traveler', -- 'traveler' or 'partner'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create partners table
CREATE TABLE IF NOT EXISTS partners (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    business_name VARCHAR(255) NOT NULL,
    business_type VARCHAR(100) NOT NULL, -- 'travelling', 'tourism', 'business', 'marketing', 'religious', 'spiritual'
    description TEXT,
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    contact_phone VARCHAR(20) NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    storage_capacity INTEGER DEFAULT 10,
    price_per_hour DECIMAL(10, 2) DEFAULT 50.00,
    price_per_day DECIMAL(10, 2) DEFAULT 200.00,
    amenities TEXT[], -- Array of amenities like 'security_camera', 'climate_control', etc.
    operating_hours JSONB, -- Store opening/closing hours for each day
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    rating DECIMAL(3, 2) DEFAULT 0.00,
    total_reviews INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    partner_id INTEGER REFERENCES partners(id) ON DELETE CASCADE,
    booking_reference VARCHAR(50) UNIQUE NOT NULL,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    check_in_time TIME,
    check_out_time TIME,
    number_of_bags INTEGER NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'confirmed', 'checked_in', 'checked_out', 'cancelled'
    special_instructions TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    booking_id INTEGER REFERENCES bookings(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    partner_id INTEGER REFERENCES partners(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_partners_city ON partners(city);
CREATE INDEX IF NOT EXISTS idx_partners_business_type ON partners(business_type);
CREATE INDEX IF NOT EXISTS idx_partners_location ON partners(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_bookings_dates ON bookings(check_in_date, check_out_date);
