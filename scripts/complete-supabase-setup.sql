-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create or replace the handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, role, phone)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', 'User'),
    CASE 
      WHEN NEW.email = 'admin@rujamashop.com' THEN 'admin'
      WHEN NEW.email = 'mediator1930@gmail.com' THEN 'admin'
      ELSE 'customer'
    END,
    NEW.raw_user_meta_data->>'phone'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample products
INSERT INTO products (name, description, price, category, brand, stock, image_url, status) VALUES
('iPhone 15 Pro Max', 'Latest iPhone with titanium design and A17 Pro chip', 1299.99, 'Smartphones', 'Apple', 25, '/placeholder.svg?height=400&width=400', 'active'),
('Samsung Galaxy S24 Ultra', 'Premium Android phone with S Pen and AI features', 1199.99, 'Smartphones', 'Samsung', 30, '/placeholder.svg?height=400&width=400', 'active'),
('iPhone 15', 'Standard iPhone 15 with USB-C and Dynamic Island', 799.99, 'Smartphones', 'Apple', 40, '/placeholder.svg?height=400&width=400', 'active'),
('Samsung Galaxy A54', 'Mid-range Samsung with great camera and display', 449.99, 'Smartphones', 'Samsung', 50, '/placeholder.svg?height=400&width=400', 'active'),
('AirPods Pro (2nd Gen)', 'Premium wireless earbuds with active noise cancellation', 249.99, 'Accessories', 'Apple', 60, '/placeholder.svg?height=400&width=400', 'active'),
('Samsung Galaxy Buds2 Pro', 'Premium wireless earbuds with 360 Audio', 199.99, 'Accessories', 'Samsung', 45, '/placeholder.svg?height=400&width=400', 'active'),
('iPhone 15 Pro Case', 'Official Apple silicone case for iPhone 15 Pro', 59.99, 'Accessories', 'Apple', 100, '/placeholder.svg?height=400&width=400', 'active'),
('Samsung 45W Charger', 'Fast charging adapter for Samsung devices', 49.99, 'Accessories', 'Samsung', 80, '/placeholder.svg?height=400&width=400', 'active'),
('iPad Air (5th Gen)', 'Powerful tablet with M1 chip and 10.9-inch display', 599.99, 'Tablets', 'Apple', 20, '/placeholder.svg?height=400&width=400', 'active'),
('Samsung Galaxy Tab S9', 'Premium Android tablet with S Pen included', 799.99, 'Tablets', 'Samsung', 15, '/placeholder.svg?height=400&width=400', 'active')
ON CONFLICT DO NOTHING;

-- Grant permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;

-- Update RLS policies to be more permissive for testing
DROP POLICY IF EXISTS "Anyone can view products" ON products;
CREATE POLICY "Anyone can view products" ON products FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage products" ON products;
CREATE POLICY "Admins can manage products" ON products FOR ALL USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

-- Allow authenticated users to insert products (for demo purposes)
CREATE POLICY "Authenticated users can insert products" ON products 
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
