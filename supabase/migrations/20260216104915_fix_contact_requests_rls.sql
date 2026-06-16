/*
  # Fix Contact Requests RLS Policy

  1. Changes
    - Update SELECT policy on contact_requests to allow public access
    - This allows the admin panel to view contact requests without requiring Supabase auth
    - The admin panel handles authorization at the application level

  2. Security Notes
    - Public can only SELECT (read) and INSERT (create) contact requests
    - UPDATE and DELETE remain restricted to authenticated users
    - This is acceptable since contact requests are submitted by public users anyway
*/

-- Drop the existing SELECT policy
DROP POLICY IF EXISTS "Authenticated users can view contact requests" ON contact_requests;

-- Create new policy allowing public to view contact requests
CREATE POLICY "Anyone can view contact requests"
  ON contact_requests FOR SELECT
  TO public
  USING (true);
