/*
  # Add Hero Sections and Contact Requests Tables

  ## New Tables
  
  1. `hero_sections`
    - `id` (uuid, primary key)
    - `page` (text) - which page this hero belongs to (home, about, services, etc.)
    - `title` (text)
    - `subtitle` (text)
    - `cta_text` (text) - call to action button text
    - `cta_link` (text) - call to action button link
    - `background_image` (text) - URL to background image
    - `is_active` (boolean) - whether this hero is currently active
    - `created_at` (timestamptz)
    - `updated_at` (timestamptz)

  2. `contact_requests`
    - `id` (uuid, primary key)
    - `name` (text)
    - `email` (text)
    - `phone` (text, optional)
    - `company` (text, optional)
    - `message` (text)
    - `request_type` (text) - type of request (contact, partner, quote, etc.)
    - `status` (text) - status (new, in_progress, resolved)
    - `created_at` (timestamptz)
    - `updated_at` (timestamptz)

  3. `blog_images`
    - `id` (uuid, primary key)
    - `blog_post_id` (uuid, foreign key)
    - `image_url` (text)
    - `caption` (text, optional)
    - `alt_text` (text)
    - `display_order` (integer)
    - `created_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Public read access for active hero sections
  - Public can submit contact requests, only admins can view
  - Public can view images for published blog posts
*/

-- Create hero_sections table
CREATE TABLE IF NOT EXISTS hero_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page text NOT NULL,
  title text NOT NULL,
  subtitle text DEFAULT '',
  cta_text text DEFAULT '',
  cta_link text DEFAULT '',
  background_image text DEFAULT '',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create contact_requests table
CREATE TABLE IF NOT EXISTS contact_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text DEFAULT '',
  company text DEFAULT '',
  message text NOT NULL,
  request_type text DEFAULT 'contact',
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create blog_images table
CREATE TABLE IF NOT EXISTS blog_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  blog_post_id uuid REFERENCES blog_posts(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  caption text DEFAULT '',
  alt_text text DEFAULT '',
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Add author column to blog_posts if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'blog_posts' AND column_name = 'author'
  ) THEN
    ALTER TABLE blog_posts ADD COLUMN author text DEFAULT 'PAKTRIX Team';
  END IF;
END $$;

-- Enable RLS
ALTER TABLE hero_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_images ENABLE ROW LEVEL SECURITY;

-- RLS Policies for hero_sections
CREATE POLICY "Public can view active hero sections"
  ON hero_sections FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage hero sections"
  ON hero_sections FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for contact_requests
CREATE POLICY "Anyone can submit contact requests"
  ON contact_requests FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view contact requests"
  ON contact_requests FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update contact requests"
  ON contact_requests FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete contact requests"
  ON contact_requests FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for blog_images
CREATE POLICY "Public can view blog images for published posts"
  ON blog_images FOR SELECT
  TO public
  USING (
    EXISTS (
      SELECT 1 FROM blog_posts
      WHERE blog_posts.id = blog_images.blog_post_id
      AND blog_posts.published = true
    )
  );

CREATE POLICY "Authenticated users can view all blog images"
  ON blog_images FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert blog images"
  ON blog_images FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update blog images"
  ON blog_images FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete blog images"
  ON blog_images FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_hero_sections_page ON hero_sections(page);
CREATE INDEX IF NOT EXISTS idx_hero_sections_active ON hero_sections(is_active);
CREATE INDEX IF NOT EXISTS idx_contact_requests_status ON contact_requests(status);
CREATE INDEX IF NOT EXISTS idx_contact_requests_created ON contact_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_images_post_id ON blog_images(blog_post_id);
CREATE INDEX IF NOT EXISTS idx_blog_images_order ON blog_images(blog_post_id, display_order);

-- Insert default hero section for home page
INSERT INTO hero_sections (page, title, subtitle, cta_text, cta_link)
VALUES (
  'home',
  'Premium Packaging Solutions for Every Industry',
  'Leading manufacturer of high-quality corrugated boxes and custom packaging solutions. Delivering excellence since 2015.',
  'Get in Touch',
  '/contact'
) ON CONFLICT DO NOTHING;