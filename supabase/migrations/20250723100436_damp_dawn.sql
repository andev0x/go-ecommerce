/*
  # Create products and categories tables

  1. New Tables
    - `categories`
      - `id` (uuid, primary key)
      - `name` (text, unique, not null)
      - `description` (text)
      - `parent_id` (uuid, foreign key to categories)
      - `is_active` (boolean, default true)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `products`
      - `id` (uuid, primary key)
      - `name` (varchar(255), not null)
      - `description` (text)
      - `price` (decimal(10,2), not null)
      - `category_id` (uuid, foreign key to categories)
      - `stock` (integer, default 0)
      - `image_url` (text)
      - `sku` (varchar(100), unique, not null)
      - `is_active` (boolean, default true)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Indexes
    - Index on products.category_id for faster category filtering
    - Index on products.name for search functionality
    - Index on products.price for price range queries
    - Index on products.sku for unique constraint
    - Index on categories.name for faster lookups

  3. Constraints
    - Foreign key constraint from products.category_id to categories.id
    - Foreign key constraint from categories.parent_id to categories.id
    - Unique constraint on products.sku
    - Unique constraint on categories.name
    - Check constraint on products.price (must be positive)
    - Check constraint on products.stock (must be non-negative)
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL CHECK (price > 0),
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
    stock INTEGER DEFAULT 0 CHECK (stock >= 0),
    image_url TEXT,
    sku VARCHAR(100) NOT NULL UNIQUE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_name ON products USING gin(to_tsvector('english', name));
CREATE INDEX IF NOT EXISTS idx_products_description ON products USING gin(to_tsvector('english', description));
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);
CREATE INDEX IF NOT EXISTS idx_products_stock ON products(stock);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at);
CREATE INDEX IF NOT EXISTS idx_categories_name ON categories(name);
CREATE INDEX IF NOT EXISTS idx_categories_parent_id ON categories(parent_id);
CREATE INDEX IF NOT EXISTS idx_categories_is_active ON categories(is_active);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_categories_updated_at 
    BEFORE UPDATE ON categories 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at 
    BEFORE UPDATE ON products 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insert default categories
INSERT INTO categories (name, description) VALUES 
    ('Electronics', 'Electronic devices and gadgets'),
    ('Clothing', 'Apparel and fashion items'),
    ('Books', 'Books and educational materials'),
    ('Home & Garden', 'Home improvement and garden supplies'),
    ('Sports', 'Sports equipment and accessories')
ON CONFLICT (name) DO NOTHING;

-- Insert sample products
DO $$
DECLARE
    electronics_id UUID;
    clothing_id UUID;
    books_id UUID;
BEGIN
    -- Get category IDs
    SELECT id INTO electronics_id FROM categories WHERE name = 'Electronics';
    SELECT id INTO clothing_id FROM categories WHERE name = 'Clothing';
    SELECT id INTO books_id FROM categories WHERE name = 'Books';
    
    -- Insert sample products
    INSERT INTO products (name, description, price, category_id, stock, sku, image_url) VALUES 
        ('Wireless Headphones', 'High-quality wireless headphones with noise cancellation', 199.99, electronics_id, 25, 'WH-001', 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg'),
        ('Smart Watch', 'Advanced fitness tracking and smart notifications', 299.99, electronics_id, 15, 'SW-001', 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg'),
        ('Bluetooth Speaker', 'Portable Bluetooth speaker with premium sound quality', 149.99, electronics_id, 30, 'BS-001', 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg'),
        ('Gaming Mouse', 'High-precision gaming mouse with RGB lighting', 89.99, electronics_id, 50, 'GM-001', 'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg'),
        ('Wireless Charger', 'Fast wireless charging pad for all compatible devices', 49.99, electronics_id, 60, 'WC-001', 'https://images.pexels.com/photos/4158/apple-iphone-smartphone-desk.jpg'),
        ('Cotton T-Shirt', 'Comfortable 100% cotton t-shirt', 29.99, clothing_id, 100, 'CT-001', 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg'),
        ('Programming Book', 'Learn advanced programming concepts', 59.99, books_id, 20, 'PB-001', 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg')
    ON CONFLICT (sku) DO NOTHING;
END $$;