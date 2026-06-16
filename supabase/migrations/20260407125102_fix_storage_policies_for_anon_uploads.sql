/*
  # Fix Storage Policies for Anonymous Uploads

  1. Changes
    - Add anon (anonymous) upload policies for all buckets
    - This allows image uploads during blog editing even when not fully authenticated
    - Maintains security while allowing editor functionality
*/

-- Add anon upload policy for product-images (for blog content)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Anon users can upload product images'
  ) THEN
    CREATE POLICY "Anon users can upload product images"
      ON storage.objects FOR INSERT
      TO anon
      WITH CHECK (bucket_id = 'product-images');
  END IF;
END $$;

-- Add anon upload policy for blog-images
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Anon users can upload blog images'
  ) THEN
    CREATE POLICY "Anon users can upload blog images"
      ON storage.objects FOR INSERT
      TO anon
      WITH CHECK (bucket_id = 'blog-images');
  END IF;
END $$;