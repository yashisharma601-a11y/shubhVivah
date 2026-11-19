-- ===================================================================
-- ShubhVivah Wedding Portal - Database Schema
-- Tables:
--   1. users: Stores authenticated accounts (Couples, Vendors, Sellers, Admin)
--   2. vendor_registrations: Stores vendor business registration applications
--   3. services: Wedding services listed by vendors
--   4. products: Wedding supplies listed by sellers
--   5. bookings: Venue and service bookings by couples
--   6. orders: Product orders placed with sellers
--   7. enquiries: Inquiries sent to vendors and sellers
--   8. wishlist: Saved venues and vendors by couples
--   9. checklist: Wedding planning checklist tasks
--  10. budget: Couple wedding budget planner
--  11. reviews: Reviews and ratings for vendors
-- ===================================================================

CREATE DATABASE IF NOT EXISTS shubhvivah
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE shubhvivah;

-- -------------------------------------------------------------
-- 1. Table: users
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  salt VARCHAR(255) NOT NULL,
  user_type ENUM('couple', 'vendor', 'seller', 'admin') NOT NULL,
  business_name VARCHAR(255) NULL,
  category VARCHAR(100) NULL,
  city VARCHAR(100) NULL,
  state VARCHAR(100) NULL,
  address TEXT NULL,
  bride_name VARCHAR(100) NULL,
  groom_name VARCHAR(100) NULL,
  wedding_date VARCHAR(50) NULL,
  wedding_location VARCHAR(255) NULL,
  wedding_budget VARCHAR(50) NULL,
  guest_count VARCHAR(50) NULL,
  avatar_url TEXT NULL,
  bio TEXT NULL,
  gst_number VARCHAR(50) NULL,
  experience_years INT NULL DEFAULT 0,
  status VARCHAR(50) NOT NULL DEFAULT 'active',
  reset_otp VARCHAR(10) NULL,
  reset_otp_expires DATETIME NULL,
  terms_accepted BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  INDEX idx_user_email (email),
  INDEX idx_user_phone (phone),
  INDEX idx_user_type (user_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 2. Table: vendor_registrations
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS vendor_registrations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  business_name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  owner_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  whatsapp VARCHAR(20) NULL,
  website VARCHAR(255) NULL,
  description TEXT NOT NULL,
  country VARCHAR(100) NOT NULL DEFAULT 'India',
  state VARCHAR(100) NOT NULL,
  city VARCHAR(100) NOT NULL,
  address TEXT NOT NULL,
  pincode VARCHAR(20) NOT NULL,
  services_offered TEXT NOT NULL,
  starting_price VARCHAR(100) NOT NULL,
  pricing_type VARCHAR(50) NOT NULL DEFAULT 'Starting From',
  service_areas TEXT NULL,
  experience_years INT NULL DEFAULT 0,
  weddings_completed INT NULL DEFAULT 0,
  logo_url TEXT NULL,
  cover_image_url TEXT NULL,
  portfolio_images JSON NULL,
  instagram_url VARCHAR(255) NULL,
  facebook_url VARCHAR(255) NULL,
  youtube_url VARCHAR(255) NULL,
  working_hours VARCHAR(100) NULL,
  availability VARCHAR(100) NULL,
  preferred_contact VARCHAR(50) NULL DEFAULT 'Phone',
  terms_accepted BOOLEAN NOT NULL DEFAULT TRUE,
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_category (category),
  INDEX idx_city (city),
  INDEX idx_email (email),
  INDEX idx_phone (phone),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 3. Table: services (Vendor Listings)
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  vendor_id INT NOT NULL,
  vendor_name VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT NULL,
  price VARCHAR(100) NOT NULL,
  pricing_type VARCHAR(50) DEFAULT 'Starting From',
  location VARCHAR(255) NULL,
  city VARCHAR(100) NULL,
  images JSON NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'active',
  availability VARCHAR(50) DEFAULT 'Available',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 4. Table: products (Seller Listings)
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  seller_id INT NOT NULL,
  seller_name VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT NULL,
  price DECIMAL(10, 2) NOT NULL,
  discount_price DECIMAL(10, 2) NULL,
  stock INT NOT NULL DEFAULT 0,
  images JSON NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 5. Table: bookings
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS bookings (
  id VARCHAR(50) PRIMARY KEY,
  couple_id INT NOT NULL,
  couple_name VARCHAR(255) NOT NULL,
  couple_email VARCHAR(255) NOT NULL,
  couple_phone VARCHAR(20) NOT NULL,
  vendor_id INT NOT NULL,
  vendor_name VARCHAR(255) NOT NULL,
  service_id INT NOT NULL,
  service_name VARCHAR(255) NOT NULL,
  service_category VARCHAR(100) NOT NULL,
  wedding_date DATE NOT NULL,
  booking_date DATE NOT NULL,
  location VARCHAR(255) NULL,
  amount VARCHAR(100) NOT NULL,
  advance_paid VARCHAR(100) NULL,
  payment_status VARCHAR(50) NOT NULL DEFAULT 'Pending',
  booking_status VARCHAR(50) NOT NULL DEFAULT 'Pending',
  notes TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -------------------------------------------------------------
-- 6. Table: orders
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS orders (
  id VARCHAR(50) PRIMARY KEY,
  seller_id INT NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  delivery_address TEXT NOT NULL,
  product_id INT NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  payment_status VARCHAR(50) NOT NULL DEFAULT 'Pending',
  order_status VARCHAR(50) NOT NULL DEFAULT 'Pending',
  order_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
