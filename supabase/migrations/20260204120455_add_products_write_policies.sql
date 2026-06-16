/*
  # Add Write Policies for Products and Categories

  ## Changes
  
  This migration adds INSERT, UPDATE, and DELETE policies for:
  - `products` table
  - `product_categories` table
  
  These policies allow all write operations with the anon key (which will be used by admin panel).
  In production, these should be more restrictive and validate admin credentials.

  ## Security Note
  
  Currently using permissive policies for development.
  For production, implement proper admin authentication checks.
*/

-- Products table write policies
CREATE POLICY "Allow all inserts on products"
  ON products FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow all updates on products"
  ON products FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all deletes on products"
  ON products FOR DELETE
  USING (true);

-- Product categories write policies
CREATE POLICY "Allow all inserts on categories"
  ON product_categories FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow all updates on categories"
  ON product_categories FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all deletes on categories"
  ON product_categories FOR DELETE
  USING (true);

-- Allow viewing all products (not just published) for admin panel
CREATE POLICY "Allow viewing all products"
  ON products FOR SELECT
  USING (true);

-- Drop the old restrictive SELECT policy
DROP POLICY IF EXISTS "Anyone can view published products" ON products;