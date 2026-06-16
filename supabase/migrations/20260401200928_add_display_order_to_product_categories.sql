/*
  # Add Display Order to Product Categories

  1. Changes
    - Add `display_order` column to `product_categories` table with default value of 0
    - Update existing categories with specified order:
      1. Mono Boxes
      2. Rigid Boxes
      3. Die Cut Boxes
      4. Export Boxes
      5. Industrial Packaging
      6. Corrugated Separator
      7. Honeycomb Separator
      8. Honeycomb Paper

  2. Security
    - No RLS changes needed (existing policies remain in place)
*/

-- Add display_order column to product_categories
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'product_categories' AND column_name = 'display_order'
  ) THEN
    ALTER TABLE product_categories ADD COLUMN display_order integer DEFAULT 0 NOT NULL;
  END IF;
END $$;

-- Update existing categories with the specified order
UPDATE product_categories SET display_order = 1 WHERE slug = 'mono-boxes' OR name = 'Mono Boxes';
UPDATE product_categories SET display_order = 2 WHERE slug = 'rigid-boxes' OR name = 'Rigid Boxes';
UPDATE product_categories SET display_order = 3 WHERE slug = 'die-cut-boxes' OR name = 'Die Cut Boxes';
UPDATE product_categories SET display_order = 4 WHERE slug = 'export-boxes' OR name = 'Export Boxes';
UPDATE product_categories SET display_order = 5 WHERE slug = 'industrial-packaging' OR name = 'Industrial Packaging';
UPDATE product_categories SET display_order = 6 WHERE slug = 'corrugated-separator' OR name = 'Corrugated Separator';
UPDATE product_categories SET display_order = 7 WHERE slug = 'honeycomb-separator' OR name = 'Honeycomb Separator';
UPDATE product_categories SET display_order = 8 WHERE slug = 'honeycomb-paper' OR name = 'Honeycomb Paper';
