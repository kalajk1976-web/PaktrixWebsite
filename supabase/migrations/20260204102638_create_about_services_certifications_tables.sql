/*
  # Create About, Services, and Certifications Content Management Tables

  1. New Tables
    - `about_content`
      - `id` (uuid, primary key)
      - `story_title` (text)
      - `story_content` (text)
      - `story_image` (text)
      - `mission_title` (text)
      - `mission_content` (text)
      - `vision_title` (text)
      - `vision_content` (text)
      - `is_active` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `core_values`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `icon_name` (text)
      - `display_order` (integer)
      - `is_active` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `about_stats`
      - `id` (uuid, primary key)
      - `value` (text)
      - `label` (text)
      - `display_order` (integer)
      - `is_active` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `services`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `icon_name` (text)
      - `features` (jsonb)
      - `display_order` (integer)
      - `is_active` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `certifications`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `details` (text)
      - `icon_name` (text)
      - `display_order` (integer)
      - `is_active` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `quality_processes`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `display_order` (integer)
      - `is_active` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for authenticated admin access
*/

-- About Content Table
CREATE TABLE IF NOT EXISTS about_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  story_title text DEFAULT '',
  story_content text DEFAULT '',
  story_image text DEFAULT '',
  mission_title text DEFAULT 'Our Mission',
  mission_content text DEFAULT '',
  vision_title text DEFAULT 'Our Vision',
  vision_content text DEFAULT '',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE about_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active about content"
  ON about_content FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage about content"
  ON about_content FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Core Values Table
CREATE TABLE IF NOT EXISTS core_values (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  description text DEFAULT '',
  icon_name text DEFAULT 'Award',
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE core_values ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active core values"
  ON core_values FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage core values"
  ON core_values FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- About Stats Table
CREATE TABLE IF NOT EXISTS about_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  value text NOT NULL DEFAULT '',
  label text NOT NULL DEFAULT '',
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE about_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active about stats"
  ON about_stats FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage about stats"
  ON about_stats FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Services Table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  description text DEFAULT '',
  icon_name text DEFAULT 'Package',
  features jsonb DEFAULT '[]'::jsonb,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active services"
  ON services FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage services"
  ON services FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Certifications Table
CREATE TABLE IF NOT EXISTS certifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  description text DEFAULT '',
  details text DEFAULT '',
  icon_name text DEFAULT 'Shield',
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active certifications"
  ON certifications FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage certifications"
  ON certifications FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Quality Processes Table
CREATE TABLE IF NOT EXISTS quality_processes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  description text DEFAULT '',
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE quality_processes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active quality processes"
  ON quality_processes FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage quality processes"
  ON quality_processes FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);