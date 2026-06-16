/*
  # Add display_order to products table

  1. Changes
    - Add `display_order` column to products table with default value 0
    - Update existing products to set display_order based on created_at
    - Create index on display_order for better query performance
  
  2. Purpose
    - Enable manual ordering of products within categories
    - Allow admin to customize product display sequence
*/

-- Add display_order column to products table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'display_order'
  ) THEN
    ALTER TABLE products ADD COLUMN display_order integer DEFAULT 0;
  END IF;
END $$;

-- Update existing products with incremental display_order based on created_at
WITH numbered_products AS (
  SELECT id, ROW_NUMBER() OVER (PARTITION BY category_id ORDER BY created_at) as row_num
  FROM products
)
UPDATE products p
SET display_order = np.row_num
FROM numbered_products np
WHERE p.id = np.id;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_products_display_order ON products(category_id, display_order);