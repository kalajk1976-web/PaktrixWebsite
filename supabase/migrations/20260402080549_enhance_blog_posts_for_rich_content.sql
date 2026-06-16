/*
  # Enhance blog_posts table for rich content support

  1. Changes
    - Add `meta_title` column for SEO title
    - Add `meta_description` column for SEO meta description
    - Add `tags` array column for blog post tags
    - Add `read_time` column for estimated reading time
    - Update `content` to support rich HTML content
    - Add indexes for better query performance
  
  2. Purpose
    - Support WordPress-like blog functionality
    - Enable rich text content with images, links, and tables
    - Improve SEO capabilities
    - Better content organization with tags
*/

-- Add new columns for enhanced blog functionality
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'blog_posts' AND column_name = 'meta_title'
  ) THEN
    ALTER TABLE blog_posts ADD COLUMN meta_title text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'blog_posts' AND column_name = 'meta_description'
  ) THEN
    ALTER TABLE blog_posts ADD COLUMN meta_description text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'blog_posts' AND column_name = 'tags'
  ) THEN
    ALTER TABLE blog_posts ADD COLUMN tags text[] DEFAULT ARRAY[]::text[];
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'blog_posts' AND column_name = 'read_time'
  ) THEN
    ALTER TABLE blog_posts ADD COLUMN read_time integer DEFAULT 5;
  END IF;
END $$;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published, published_at DESC) WHERE published = true;
CREATE INDEX IF NOT EXISTS idx_blog_posts_tags ON blog_posts USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);