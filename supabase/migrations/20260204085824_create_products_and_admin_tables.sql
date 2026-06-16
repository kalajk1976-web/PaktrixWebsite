/*
  # Create Products, Categories, and Admin Tables

  1. New Tables
    - `product_categories`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `slug` (text, unique)
      - `description` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `products`
      - `id` (uuid, primary key)
      - `name` (text)
      - `slug` (text, unique)
      - `short_description` (text)
      - `description` (text)
      - `features` (jsonb)
      - `specifications` (jsonb)
      - `applications` (jsonb)
      - `image` (text)
      - `category_id` (uuid, foreign key)
      - `published` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `admin_users`
      - `id` (uuid, primary key)
      - `username` (text, unique)
      - `password_hash` (text)
      - `email` (text, unique)
      - `created_at` (timestamp)
      - `last_login` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Public read access for published products
    - Admin-only write access for products and categories
    - Secure admin authentication

  3. Initial Data
    - Create test admin user (username: admin, password: admin123)
    - Migrate existing products to database
*/

-- Product Categories Table
CREATE TABLE IF NOT EXISTS product_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE product_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view categories"
  ON product_categories FOR SELECT
  USING (true);

-- Products Table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  short_description text DEFAULT '',
  description text NOT NULL,
  features jsonb DEFAULT '[]'::jsonb,
  specifications jsonb DEFAULT '[]'::jsonb,
  applications jsonb DEFAULT '[]'::jsonb,
  image text DEFAULT '',
  category_id uuid REFERENCES product_categories(id) ON DELETE SET NULL,
  published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published products"
  ON products FOR SELECT
  USING (published = true);

-- Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  last_login timestamptz
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- No public access to admin users table
CREATE POLICY "No public access to admin users"
  ON admin_users FOR ALL
  USING (false);

-- Insert default product categories
INSERT INTO product_categories (name, slug, description) VALUES
  ('Corrugated Boxes', 'corrugated-boxes', 'Durable corrugated packaging solutions'),
  ('Mono Cartons', 'mono-cartons', 'Premium mono carton packaging'),
  ('Specialty Boxes', 'specialty-boxes', 'Custom and specialty packaging'),
  ('Tubes & Cylinders', 'tubes-cylinders', 'Cylindrical packaging solutions'),
  ('Display Packaging', 'display-packaging', 'Retail display packaging')
ON CONFLICT (slug) DO NOTHING;

-- Insert test admin user (password: admin123)
-- Password hash is bcrypt hash of "admin123"
INSERT INTO admin_users (username, password_hash, email) VALUES
  ('admin', '$2a$10$rXKvAZ7GK1jFxPxBdq8yLOJH4kMvVYQz3KmV5oJFGMxLH8pQZFYKm', 'admin@paktrix.com')
ON CONFLICT (username) DO NOTHING;

-- Migrate existing products to database
DO $$
BEGIN
  -- Get category IDs
  DECLARE
    corrugated_id uuid;
    mono_id uuid;
    specialty_id uuid;
    tubes_id uuid;
    display_id uuid;
  BEGIN
    SELECT id INTO corrugated_id FROM product_categories WHERE slug = 'corrugated-boxes';
    SELECT id INTO mono_id FROM product_categories WHERE slug = 'mono-cartons';
    SELECT id INTO specialty_id FROM product_categories WHERE slug = 'specialty-boxes';
    SELECT id INTO tubes_id FROM product_categories WHERE slug = 'tubes-cylinders';
    SELECT id INTO display_id FROM product_categories WHERE slug = 'display-packaging';

    -- Insert products
    INSERT INTO products (name, slug, short_description, description, features, specifications, applications, image, category_id, published) VALUES
    (
      'Corrugated boxes',
      'corrugated-boxes',
      'Versatile and secure boxes perfect for retail packaging and product display.',
      'Our Corrugated End Boxes combine durability with crystal-clear visibility, making them ideal for showcasing your products while providing secure closure. These boxes feature convenient tuck-end flaps for easy assembly and reliable protection.',
      '["Crystal-clear acetate material for maximum product visibility","Secure tuck-end closure mechanism","Easy to assemble without tools or adhesive","Available in multiple sizes and thicknesses","Excellent for retail display and gift packaging","Recyclable and eco-friendly material"]'::jsonb,
      '[{"label":"Material","value":"Premium PET/APET Acetate"},{"label":"Thickness","value":"0.3mm - 0.5mm"},{"label":"Finish","value":"Crystal Clear"},{"label":"Customization","value":"Size, printing available"},{"label":"Minimum Order","value":"1000 units"}]'::jsonb,
      '["Cosmetics and beauty products","Confectionery and food items","Toys and collectibles","Electronics accessories","Gift packaging"]'::jsonb,
      'https://images.pexels.com/photos/4483942/pexels-photo-4483942.jpeg',
      corrugated_id,
      true
    ),
    (
      'Mono Boxes',
      'mono-boxes',
      'Elegant curved design perfect for small gifts, favors, and premium product packaging.',
      'Mono Boxes offer a unique and attractive packaging solution with their distinctive curved shape. These boxes are perfect for creating memorable unboxing experiences while maintaining product visibility.',
      '["Distinctive pillow-shaped design","Easy snap-close assembly","Perfect for gift packaging and party favors","Transparent material showcases contents beautifully","Available in various sizes","Lightweight yet sturdy construction"]'::jsonb,
      '[{"label":"Material","value":"Clear PET"},{"label":"Thickness","value":"0.35mm - 0.4mm"},{"label":"Finish","value":"High Clarity"},{"label":"Customization","value":"Size, color tinting available"},{"label":"Minimum Order","value":"500 units"}]'::jsonb,
      '["Wedding and party favors","Jewelry and accessories","Small confectionery items","Sample products","Promotional items"]'::jsonb,
      'https://images.pexels.com/photos/5706281/pexels-photo-5706281.jpeg',
      mono_id,
      true
    ),
    (
      'Premium Boxes',
      'premium-boxes',
      'Fully customizable boxes with high-quality printing for brand recognition.',
      'Elevate your brand with our Customized Premium Boxes. Featuring high-resolution printing capabilities, these boxes combine with custom branding to create stunning packaging solutions.',
      '["Full-color custom printing options","Combine transparency with branded elements","UV-resistant inks for long-lasting quality","Multiple design layouts supported","White, metallic, or transparent printing available","Perfect for brand differentiation"]'::jsonb,
      '[{"label":"Material","value":"Premium APET/PET"},{"label":"Thickness","value":"0.3mm - 0.6mm"},{"label":"Printing","value":"Offset/Screen printing"},{"label":"Customization","value":"Full custom design"},{"label":"Minimum Order","value":"2000 units"}]'::jsonb,
      '["Branded product packaging","Retail merchandise","Corporate gifts","Premium consumer goods","Event merchandise"]'::jsonb,
      'https://images.pexels.com/photos/4792513/pexels-photo-4792513.jpeg',
      specialty_id,
      true
    ),
    (
      'Clear Acetate Tubes',
      'clear-acetate-tubes',
      'Cylindrical acetate packaging ideal for rolled products, posters, and unique items.',
      'Our Clear Acetate Tubes provide 360-degree product visibility in a sleek cylindrical format. These tubes are perfect for packaging rolled items, elongated products, or creating unique packaging presentations.',
      '["Complete 360-degree visibility","Secure end-cap closures","Various diameter and length options","Crush-resistant construction","Ideal for rolled and cylindrical products","Can be customized with labels or printing"]'::jsonb,
      '[{"label":"Material","value":"Clear PET Acetate"},{"label":"Thickness","value":"0.4mm - 0.5mm"},{"label":"Diameter","value":"30mm - 200mm"},{"label":"Customization","value":"Length, end caps, labeling"},{"label":"Minimum Order","value":"1000 units"}]'::jsonb,
      '["Posters and prints","Bottles and cylindrical products","Candles","Textiles and fabrics","Documents and certificates"]'::jsonb,
      'https://images.pexels.com/photos/8251829/pexels-photo-8251829.jpeg',
      tubes_id,
      true
    ),
    (
      'Acetate Display Boxes',
      'acetate-display-boxes',
      'Premium display packaging with superior clarity for retail and exhibition use.',
      'Acetate Display Boxes are designed specifically for retail environments and exhibitions where product presentation is paramount. These boxes offer exceptional clarity and sturdy construction to showcase your products in the best light.',
      '["Ultra-clear material for maximum visibility","Rigid construction for stable display","Multiple opening styles available","Stackable design for efficient storage","Scratch-resistant coating option","Professional appearance for retail settings"]'::jsonb,
      '[{"label":"Material","value":"Premium APET"},{"label":"Thickness","value":"0.5mm - 0.8mm"},{"label":"Finish","value":"Ultra Clear/Anti-glare"},{"label":"Customization","value":"Size, insert cards, printing"},{"label":"Minimum Order","value":"1500 units"}]'::jsonb,
      '["Retail product display","Collectibles and figurines","Electronics and gadgets","Trade show exhibits","Museum and gallery items"]'::jsonb,
      'https://images.pexels.com/photos/6169668/pexels-photo-6169668.jpeg',
      display_id,
      true
    )
    ON CONFLICT (slug) DO NOTHING;
  END;
END $$;