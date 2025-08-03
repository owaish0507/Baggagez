-- Remove individual pricing columns since pricing is now standardized
ALTER TABLE partners DROP COLUMN IF EXISTS price_per_hour;
ALTER TABLE partners DROP COLUMN IF EXISTS price_per_day;

-- Add a revenue_share_percentage column (default 70% for partners)
ALTER TABLE partners ADD COLUMN IF NOT EXISTS revenue_share_percentage DECIMAL(5,2) DEFAULT 70.00;

-- Add a pricing_tier column for future flexibility (standard, premium, etc.)
ALTER TABLE partners ADD COLUMN IF NOT EXISTS pricing_tier VARCHAR(20) DEFAULT 'standard';

-- Create a standardized pricing table
CREATE TABLE IF NOT EXISTS pricing_structure (
    id SERIAL PRIMARY KEY,
    duration_hours INTEGER NOT NULL,
    base_price DECIMAL(10,2) NOT NULL,
    insurance_price DECIMAL(10,2) NOT NULL,
    partner_share_percentage DECIMAL(5,2) DEFAULT 70.00,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert standardized pricing structure
INSERT INTO pricing_structure (duration_hours, base_price, insurance_price) VALUES
(2, 30.00, 75.00),
(4, 50.00, 115.00),
(6, 70.00, 155.00),
(8, 90.00, 195.00),
(12, 120.00, 255.00),
(24, 199.00, 350.00)
ON CONFLICT DO NOTHING;

-- Update existing partners to use standard revenue share
UPDATE partners SET 
    revenue_share_percentage = 70.00,
    pricing_tier = 'standard'
WHERE revenue_share_percentage IS NULL OR pricing_tier IS NULL;

-- Add comment explaining the pricing model
COMMENT ON TABLE pricing_structure IS 'Standardized pricing across all partners - ensures fairness and customer trust';
COMMENT ON COLUMN partners.revenue_share_percentage IS 'Percentage of booking amount that partner receives (default 70%)';
