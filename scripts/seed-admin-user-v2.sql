-- Update the handle_new_user function to include the new admin email
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', 'User'),
    CASE 
      WHEN NEW.email = 'admin@rujamashop.com' THEN 'admin'
      WHEN NEW.email = 'mediator1930@gmail.com' THEN 'admin'
      ELSE 'customer'
    END
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create or update the admin profile for mediator1930@gmail.com
-- Note: This will be automatically created when the user signs up through Supabase Auth
-- But we can prepare the profile structure

-- If you want to manually insert the profile (after the user is created in auth.users):
-- INSERT INTO public.profiles (id, name, role) 
-- VALUES ('user-id-from-auth-users', 'Admin User', 'admin')
-- ON CONFLICT (id) DO UPDATE SET role = 'admin';

-- Grant necessary permissions for the admin role
GRANT ALL ON public.profiles TO authenticated;
GRANT ALL ON public.products TO authenticated;
GRANT ALL ON public.orders TO authenticated;
