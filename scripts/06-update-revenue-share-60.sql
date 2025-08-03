-- Update revenue share percentage to 60% for all partners
UPDATE partners SET revenue_share_percentage = 60.00;

-- Update the pricing structure table to reflect 60% partner share
UPDATE pricing_structure SET partner_share_percentage = 60.00;

-- Add a comment explaining the revenue model
COMMENT ON COLUMN partners.revenue_share_percentage IS 'Percentage of booking amount that partner receives (60% standard)';
COMMENT ON COLUMN pricing_structure.partner_share_percentage IS 'Standard partner revenue share - 60% of booking amount';

-- Create a view for easy partner earnings calculation
CREATE OR REPLACE VIEW partner_earnings_view AS
SELECT 
    duration_hours,
    base_price,
    insurance_price,
    ROUND(base_price * 0.60, 2) as partner_base_earning,
    ROUND(insurance_price * 0.60, 2) as partner_insurance_earning,
    ROUND(base_price * 0.40, 2) as platform_base_fee,
    ROUND(insurance_price * 0.40, 2) as platform_insurance_fee
FROM pricing_structure 
WHERE is_active = true
ORDER BY duration_hours;

-- Insert some example calculations for reference
INSERT INTO pricing_structure (duration_hours, base_price, insurance_price, partner_share_percentage) VALUES
(1, 20.00, 50.00, 60.00),
(3, 40.00, 90.00, 60.00),
(5, 60.00, 130.00, 60.00)
ON CONFLICT (duration_hours) DO UPDATE SET
    partner_share_percentage = EXCLUDED.partner_share_percentage;
