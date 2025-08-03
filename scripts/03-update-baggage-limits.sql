-- Add baggage limit columns to partners table
ALTER TABLE partners ADD COLUMN IF NOT EXISTS max_baggage_limit INTEGER DEFAULT 20;
ALTER TABLE partners ADD COLUMN IF NOT EXISTS current_available_bags INTEGER DEFAULT 20;

-- Update existing partners with realistic baggage limits
UPDATE partners SET 
  max_baggage_limit = CASE 
    WHEN business_type = 'railway' THEN 50
    WHEN business_type = 'business' THEN 30
    WHEN business_type = 'tourism' THEN 40
    WHEN business_type = 'religious' THEN 60
    WHEN business_type = 'spiritual' THEN 80
    WHEN business_type = 'marketing' THEN 25
    ELSE 30
  END,
  current_available_bags = CASE 
    WHEN business_type = 'railway' THEN 45
    WHEN business_type = 'business' THEN 25
    WHEN business_type = 'tourism' THEN 35
    WHEN business_type = 'religious' THEN 55
    WHEN business_type = 'spiritual' THEN 75
    WHEN business_type = 'marketing' THEN 20
    ELSE 25
  END;

-- Add baggage calculation function
CREATE OR REPLACE FUNCTION calculate_baggage_slots(requested_bags INTEGER)
RETURNS INTEGER AS $$
BEGIN
  -- If odd number, round up to next even number
  IF requested_bags % 2 = 1 THEN
    RETURN requested_bags + 1;
  ELSE
    RETURN requested_bags;
  END IF;
END;
$$ LANGUAGE plpgsql;
