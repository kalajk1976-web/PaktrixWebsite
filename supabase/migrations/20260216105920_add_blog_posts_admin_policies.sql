/*
  # Add Admin Policies for Blog Posts

  1. Changes
    - Add INSERT policy to allow creating blog posts
    - Add UPDATE policy to allow updating blog posts
    - Add DELETE policy to allow deleting blog posts
    - Update SELECT policy to allow viewing all posts (not just published)

  2. Security Notes
    - These policies allow public access for admin operations
    - The admin panel handles authorization at the application level
    - This matches the pattern used for other admin-managed tables
*/

-- Drop existing SELECT policy and create a new one that shows all posts
DROP POLICY IF EXISTS "Anyone can view published posts" ON blog_posts;

CREATE POLICY "Anyone can view all posts"
  ON blog_posts FOR SELECT
  TO public
  USING (true);

-- Add INSERT policy
CREATE POLICY "Anyone can create blog posts"
  ON blog_posts FOR INSERT
  TO public
  WITH CHECK (true);

-- Add UPDATE policy
CREATE POLICY "Anyone can update blog posts"
  ON blog_posts FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- Add DELETE policy
CREATE POLICY "Anyone can delete blog posts"
  ON blog_posts FOR DELETE
  TO public
  USING (true);
