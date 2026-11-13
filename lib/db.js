import mysql from "mysql2/promise";
import pg from "pg";
import fs from "fs/promises";
import path from "path";
import { hashPassword } from "./auth.js";

// Database Configuration (Supports PostgreSQL 18 & MySQL)
const rawDbUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL || "";
const isPg =
  rawDbUrl.startsWith("postgres://") ||
  rawDbUrl.startsWith("postgresql://") ||
  process.env.DB_TYPE === "postgres" ||
  process.env.PGPORT === "5432";

const DB_CONFIG = {
  host: process.env.MYSQL_HOST || process.env.DB_HOST || "localhost",
  port: Number(process.env.MYSQL_PORT || process.env.DB_PORT || 3306),
  user: process.env.MYSQL_USER || process.env.DB_USER || "root",
  password: process.env.MYSQL_PASSWORD || process.env.DB_PASSWORD || "",
  database: process.env.MYSQL_DATABASE || process.env.DB_NAME || "shubhvivah",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 4000,
};

let pool = null;
let activeDbType = null;
let tablesInitialized = false;

// -------------------------------------------------------------
// JSON Storage Helpers
// -------------------------------------------------------------
async function readJsonFile(filename, defaultData = []) {
  try {
    const backupDir = path.join(process.cwd(), "data");
    await fs.mkdir(backupDir, { recursive: true });
    const filePath = path.join(backupDir, filename);
    const content = await fs.readFile(filePath, "utf-8");
    return JSON.parse(content);
  } catch {
    return defaultData;
  }
}

async function writeJsonFile(filename, data) {
  try {
    const backupDir = path.join(process.cwd(), "data");
    await fs.mkdir(backupDir, { recursive: true });
    const filePath = path.join(backupDir, filename);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error(`Error writing to ${filename}:`, err);
  }
}

/**
 * Ensures Super Admin and standard initial records exist
 */
async function ensureSeedData() {
  const adminEmail = (process.env.ADMIN_EMAIL || "admin@shubhvivah.com").toLowerCase().trim();
  const adminPassword = process.env.ADMIN_PASSWORD || "Admin@123";
  const adminPhone = process.env.ADMIN_PHONE || "9999999999";
  const adminName = process.env.ADMIN_NAME || "ShubhVivah Super Admin";
  const adminId = Number(process.env.ADMIN_ID) || 100;

  const users = await readJsonFile("users.json");
  const existingAdminIdx = users.findIndex(
    (u) => u.user_type === "admin" || u.email.toLowerCase() === adminEmail || u.phone === adminPhone
  );

  const { hash, salt } = hashPassword(adminPassword);

  const adminRecord = {
    id: existingAdminIdx !== -1 ? users[existingAdminIdx].id : adminId,
    name: adminName,
    email: adminEmail,
    phone: adminPhone,
    password_hash: hash,
    salt: salt,
    user_type: "admin",
    business_name: "ShubhVivah Corporate",
    category: "Platform Administration",
    city: "New Delhi",
    status: "active",
    reset_otp: null,
    reset_otp_expires: null,
    terms_accepted: true,
    created_at: existingAdminIdx !== -1 ? users[existingAdminIdx].created_at : new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  if (existingAdminIdx === -1) {
    users.push(adminRecord);
  } else {
    users[existingAdminIdx] = {
      ...users[existingAdminIdx],
      ...adminRecord,
    };
  }
  await writeJsonFile("users.json", users);

  // Sync admin to PostgreSQL/MySQL if database is connected
  try {
    const existingInDb = await runDbQuery("SELECT id FROM users WHERE email = ? OR user_type = 'admin' LIMIT 1", [adminEmail]);
    if (existingInDb && (!existingInDb.rows || existingInDb.rows.length === 0)) {
      await runDbQuery(
        `INSERT INTO users (name, email, phone, password_hash, salt, user_type, business_name, category, city, status, terms_accepted)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [adminName, adminEmail, adminPhone, hash, salt, "admin", "ShubhVivah Corporate", "Platform Administration", "New Delhi", "active", 1]
      );
    }
  } catch {
    // Database sync is optional fallback
  }

  // Seed Services
  const services = await readJsonFile("services.json");
  if (services.length === 0) {
    const defaultServices = [
      {
        id: 1,
        vendor_id: 2, // Vikram Singh
        vendor_name: "Royal Heritage Captures",
        name: "Royal Royal Palace Wedding Cinematography",
        category: "Photographer",
        description: "Complete pre-wedding, candid photography, 4K cinematic film with drone shoots.",
        price: "₹85,000 / day",
        pricing_type: "Starting From",
        location: "Udaipur & Pan India",
        city: "Udaipur",
        images: [
          "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
          "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
        ],
        status: "active",
        availability: "Available",
        created_at: new Date().toISOString()
      },
      {
        id: 2,
        vendor_id: 4, // Sunita Mehandi Art
        vendor_name: "Sunita Mehandi Artistry",
        name: "Bridal Marwari & Arabic Mehndi Package",
        category: "Mehndi Artist",
        description: "Organic bridal henna with intricate storytelling designs, Radha-Krishna motifs and guest artists.",
        price: "₹15,000",
        pricing_type: "Fixed Price",
        location: "Jaipur",
        city: "Jaipur",
        images: [
          "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80"
        ],
        status: "active",
        availability: "Available",
        created_at: new Date().toISOString()
      }
    ];
    await writeJsonFile("services.json", defaultServices);
  }

  // Seed Products
  const products = await readJsonFile("products.json");
  if (products.length === 0) {
    const defaultProducts = [
      {
        id: 1,
        seller_id: 3, // Ramesh Dairy & Water
        seller_name: "Shree Krishna Water & Dairy Supplies",
        name: "20L RO Chilled Water Camper (Bulk Wedding Supply)",
        category: "Water Camper Supplier",
        description: "Hygienic 20-litre purified water campers delivered with dispenser stands directly to banquet halls and lawns.",
        price: 45,
        discount_price: 35,
        stock: 500,
        images: [
          "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80"
        ],
        status: "active",
        created_at: new Date().toISOString()
      },
      {
        id: 2,
        seller_id: 3,
        seller_name: "Shree Krishna Water & Dairy Supplies",
        name: "Fresh Malai Paneer & Desi Ghee (Per 10 Kg Pack)",
        category: "Dairy Products",
        description: "100% pure cow ghee tins and fresh malai paneer packed for high-volume wedding catering feasts.",
        price: 3800,
        discount_price: 3450,
        stock: 80,
        images: [
          "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80"
        ],
        status: "active",
        created_at: new Date().toISOString()
      }
    ];
    await writeJsonFile("products.json", defaultProducts);
  }

  // Seed Bookings
  const bookings = await readJsonFile("bookings.json");
  if (bookings.length === 0) {
    const defaultBookings = [
      {
        id: "BK-1001",
        couple_id: 1, // Aditi & Aarav
        couple_name: "Aditi & Aarav",
        couple_email: "aditi.aarav@example.com",
        couple_phone: "9876543211",
        vendor_id: 2,
        vendor_name: "Royal Heritage Captures",
        service_id: 1,
        service_name: "Royal Palace Wedding Cinematography",
        service_category: "Photographer",
        wedding_date: "2026-11-28",
        booking_date: "2026-10-25",
        location: "The Oberoi Udaivilas, Udaipur",
        amount: "₹85,000",
        advance_paid: "₹35,000",
        payment_status: "Partial",
        booking_status: "Confirmed",
        notes: "3-day coverage including Sangeet, Mehendi and Royal Baraat procession.",
        created_at: new Date().toISOString()
      },
      {
        id: "BK-1002",
        couple_id: 1,
        couple_name: "Aditi & Aarav",
        couple_email: "aditi.aarav@example.com",
        couple_phone: "9876543211",
        vendor_id: 4,
        vendor_name: "Sunita Mehandi Artistry",
        service_id: 2,
        service_name: "Bridal Marwari & Arabic Mehndi Package",
        service_category: "Mehndi Artist",
        wedding_date: "2026-11-26",
        booking_date: "2026-10-27",
        location: "Udaipur Heritage Villa",
        amount: "₹15,000",
        advance_paid: "₹5,000",
        payment_status: "Partial",
        booking_status: "Pending",
        notes: "Bridal hands and feet plus 10 family members.",
        created_at: new Date().toISOString()
      }
    ];
    await writeJsonFile("bookings.json", defaultBookings);
  }

  // Seed Orders
  const orders = await readJsonFile("orders.json");
  if (orders.length === 0) {
    const defaultOrders = [
      {
        id: "ORD-9021",
        seller_id: 3,
        customer_name: "Aditi & Aarav",
        customer_email: "aditi.aarav@example.com",
        customer_phone: "9876543211",
        delivery_address: "Lawn A, The Oberoi Udaivilas, Haridas Ji Ki Magri, Udaipur",
        product_id: 1,
        product_name: "20L RO Chilled Water Camper (Bulk Wedding Supply)",
        quantity: 120,
        unit_price: 35,
        total_amount: 4200,
        payment_status: "Paid",
        order_status: "Processing",
        order_date: "2026-10-28",
        created_at: new Date().toISOString()
      }
    ];
    await writeJsonFile("orders.json", defaultOrders);
  }

  // Seed Wishlist
  const wishlist = await readJsonFile("wishlist.json");
  if (wishlist.length === 0) {
    const defaultWishlist = [
      {
        id: 1,
        couple_id: 1,
        item_type: "venue",
        item_id: "v-1",
        title: "Jai Mahal Palace",
        category: "Heritage Palaces & Forts",
        price: "₹4,50,000 / day",
        location: "Jaipur, Rajasthan",
        image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
        created_at: new Date().toISOString()
      },
      {
        id: 2,
        couple_id: 1,
        item_type: "vendor",
        item_id: 2,
        title: "Royal Heritage Captures",
        category: "Wedding Photographers",
        price: "₹85,000 / day",
        location: "Udaipur, Rajasthan",
        image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
        created_at: new Date().toISOString()
      }
    ];
    await writeJsonFile("wishlist.json", defaultWishlist);
  }

  // Seed Checklist
  const checklist = await readJsonFile("checklist.json");
  if (checklist.length === 0) {
    const defaultChecklist = [
      { id: 1, couple_id: 1, task: "Finalize Royal Wedding Venue & Sign Contract", category: "Venue", due_date: "2026-08-15", completed: true },
      { id: 2, couple_id: 1, task: "Book Wedding Photographer & Cinematographer", category: "Vendors", due_date: "2026-09-01", completed: true },
      { id: 3, couple_id: 1, task: "Select Bridal Lehenga & Groom Sherwani", category: "Attire", due_date: "2026-09-20", completed: true },
      { id: 4, couple_id: 1, task: "Send Digital E-invitations on WhatsApp", category: "Invites", due_date: "2026-10-15", completed: false },
      { id: 5, couple_id: 1, task: "Confirm Water Camper & Catering Dairy Supplies", category: "Suppliers", due_date: "2026-10-30", completed: false },
      { id: 6, couple_id: 1, task: "Schedule Makeup & Hair Trial Session", category: "Grooming", due_date: "2026-11-10", completed: false },
    ];
    await writeJsonFile("checklist.json", defaultChecklist);
  }

  // Seed Budget
  const budget = await readJsonFile("budget.json");
  if (budget.length === 0) {
    const defaultBudget = [
      { id: 1, couple_id: 1, category: "Venue & Banquets", allocated_amount: 1200000, spent_amount: 950000, notes: "Palace lawn + 25 rooms" },
      { id: 2, couple_id: 1, category: "Catering & Feasts", allocated_amount: 800000, spent_amount: 600000, notes: "Veg multi-cuisine buffet" },
      { id: 3, couple_id: 1, category: "Photography & Video", allocated_amount: 200000, spent_amount: 85000, notes: "Cinematic drone + traditional" },
      { id: 4, couple_id: 1, category: "Decoration & Florals", allocated_amount: 400000, spent_amount: 250000, notes: "Royal Marigold & Rose theme" },
      { id: 5, couple_id: 1, category: "Bridal & Groom Wear", allocated_amount: 300000, spent_amount: 280000, notes: "Designer attire & accessories" },
    ];
    await writeJsonFile("budget.json", defaultBudget);
  }

  // Seed Enquiries
  const enquiries = await readJsonFile("enquiries.json");
  if (enquiries.length === 0) {
    const defaultEnquiries = [
      {
        id: 1,
        couple_id: 1,
        target_type: "vendor",
        target_id: 2,
        target_name: "Royal Heritage Captures",
        user_name: "Aditi & Aarav",
        user_email: "aditi.aarav@example.com",
        user_phone: "9876543211",
        service_or_product: "Royal Royal Palace Wedding Cinematography",
        message: "Are you available for drone shoots on 27th & 28th November in Udaipur?",
        status: "Replied",
        reply_message: "Yes Aditi & Aarav, our drone crew is available. Looking forward to capturing your wedding!",
        replied_at: new Date().toISOString(),
        created_at: new Date(Date.now() - 2 * 86400000).toISOString()
      }
    ];
    await writeJsonFile("enquiries.json", defaultEnquiries);
  }

  // Seed Reviews
  const reviews = await readJsonFile("reviews.json");
  if (reviews.length === 0) {
    const defaultReviews = [
      {
        id: 1,
        vendor_id: 2,
        couple_name: "Neha & Siddharth",
        couple_email: "neha.sid@example.com",
        rating: 5,
        review_text: "Vikram and his team are extraordinary! Every royal moment was captured like a Sanjay Leela Bhansali movie.",
        reply_text: "Thank you so much Neha & Siddharth! Wishing you both a lifetime of happiness.",
        created_at: new Date(Date.now() - 5 * 86400000).toISOString()
      }
    ];
    await writeJsonFile("reviews.json", defaultReviews);
  }
}

// Ensure seed data executes on server startup
ensureSeedData().catch(console.error);

// -------------------------------------------------------------
// Database Pool Initializer (PostgreSQL 18 & MySQL with Fallback)
// -------------------------------------------------------------
async function getPool() {
  if (pool) return pool;

  // 1. Try PostgreSQL (from DATABASE_URL or PostgreSQL env settings)
  if (isPg || rawDbUrl) {
    try {
      let pgConfig = {};
      if (
        rawDbUrl &&
        (rawDbUrl.startsWith("postgres://") || rawDbUrl.startsWith("postgresql://")) &&
        !rawDbUrl.includes("YOUR_PASSWORD")
      ) {
        pgConfig = { connectionString: rawDbUrl };
      } else {
        const pass = process.env.PGPASSWORD || process.env.DB_PASSWORD || "";
        if (pass && pass !== "YOUR_PASSWORD") {
          pgConfig = {
            host: process.env.PGHOST || process.env.DB_HOST || "localhost",
            port: Number(process.env.PGPORT || process.env.DB_PORT || 5432),
            user: process.env.PGUSER || process.env.DB_USER || "postgres",
            password: pass,
            database: process.env.PGDATABASE || process.env.DB_NAME || "shubhvivah",
          };
        }
      }

      if (pgConfig.connectionString || (pgConfig.host && pgConfig.password)) {
        pgConfig.connectionTimeoutMillis = 3000;
        const pgPool = new pg.Pool(pgConfig);
        const testClient = await pgPool.connect();
        await testClient.query("SELECT 1;");
        testClient.release();

        pool = pgPool;
        activeDbType = "postgres";

        if (!tablesInitialized) {
          await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
              id SERIAL PRIMARY KEY,
              name VARCHAR(255) NOT NULL,
              email VARCHAR(255) NOT NULL UNIQUE,
              phone VARCHAR(20) NOT NULL,
              password_hash VARCHAR(255) NOT NULL,
              salt VARCHAR(255) NOT NULL,
              user_type VARCHAR(50) NOT NULL,
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
              experience_years INT DEFAULT 0,
              status VARCHAR(50) DEFAULT 'active',
              reset_otp VARCHAR(10) NULL,
              reset_otp_expires TIMESTAMP NULL,
              terms_accepted BOOLEAN DEFAULT TRUE,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
          `);

          await pool.query(`
            CREATE TABLE IF NOT EXISTS vendor_registrations (
              id SERIAL PRIMARY KEY,
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
              experience_years INT DEFAULT 0,
              weddings_completed INT DEFAULT 0,
              logo_url TEXT NULL,
              cover_image_url TEXT NULL,
              portfolio_images JSONB NULL,
              instagram_url VARCHAR(255) NULL,
              facebook_url VARCHAR(255) NULL,
              youtube_url VARCHAR(255) NULL,
              working_hours VARCHAR(100) NULL,
              availability VARCHAR(100) NULL,
              preferred_contact VARCHAR(50) DEFAULT 'Phone',
              terms_accepted BOOLEAN DEFAULT TRUE,
              status VARCHAR(50) DEFAULT 'pending',
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
          `);

          await pool.query(`
            CREATE TABLE IF NOT EXISTS chatbot_inquiries (
              id SERIAL PRIMARY KEY,
              full_name VARCHAR(255) NOT NULL,
              mobile_number VARCHAR(20) NOT NULL,
              email VARCHAR(255) NULL,
              looking_for VARCHAR(50) NOT NULL,
              age VARCHAR(20) NULL,
              preferred_location VARCHAR(255) NULL,
              query TEXT NOT NULL,
              source VARCHAR(100) NOT NULL DEFAULT 'Sathi AI Chatbot',
              conversation_summary TEXT NULL,
              status VARCHAR(50) NOT NULL DEFAULT 'New',
              admin_remarks TEXT NULL,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
          `);

          tablesInitialized = true;
          console.log("✅ Connected to PostgreSQL 18 database (shubhvivah) successfully.");
        }

        return pool;
      }
    } catch (pgError) {
      console.warn("⚠️ PostgreSQL connection note (fallback to JSON):", pgError.message);
    }
  }

  // 2. Try MySQL if configured
  try {
    const serverConnection = await mysql.createConnection({
      host: DB_CONFIG.host,
      port: DB_CONFIG.port,
      user: DB_CONFIG.user,
      password: DB_CONFIG.password,
      connectTimeout: DB_CONFIG.connectTimeout,
    });

    await serverConnection.query(
      `CREATE DATABASE IF NOT EXISTS \`${DB_CONFIG.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
    );
    await serverConnection.end();

    pool = mysql.createPool(DB_CONFIG);
    activeDbType = "mysql";

    if (!tablesInitialized) {
      // 1. Users Table
      await pool.query(`
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
      `);

      // 2. Vendor Registrations Table
      await pool.query(`
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
          INDEX idx_phone (phone)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
      `);

      tablesInitialized = true;
    }

    return pool;
  } catch {
    pool = null;
    activeDbType = null;
    return null;
  }
}

export async function runDbQuery(sql, values = []) {
  const active = await getPool();
  if (!active) return null;

  try {
    if (activeDbType === "postgres") {
      let paramCount = 1;
      const pgSql = sql.replace(/\?/g, () => `$${paramCount++}`);
      return await active.query(pgSql, values);
    } else {
      return await active.query(sql, values);
    }
  } catch (e) {
    console.warn("DB query warning:", e.message);
    return null;
  }
}

// -------------------------------------------------------------
// User Authentication & Profile Queries
// -------------------------------------------------------------
export async function createUser(userData) {
  const formattedUser = {
    name: userData.name.trim(),
    email: userData.email.toLowerCase().trim(),
    phone: userData.phone.trim(),
    password_hash: userData.password_hash,
    salt: userData.salt,
    user_type: userData.user_type, // 'couple' | 'vendor' | 'seller' | 'admin'
    business_name: userData.business_name || null,
    category: userData.category || null,
    city: userData.city || null,
    state: userData.state || null,
    address: userData.address || null,
    bride_name: userData.bride_name || null,
    groom_name: userData.groom_name || null,
    wedding_date: userData.wedding_date || null,
    wedding_location: userData.wedding_location || null,
    wedding_budget: userData.wedding_budget || null,
    guest_count: userData.guest_count || null,
    avatar_url: userData.avatar_url || null,
    bio: userData.bio || null,
    gst_number: userData.gst_number || null,
    experience_years: Number(userData.experience_years) || 0,
    status: userData.status || "active",
    reset_otp: null,
    reset_otp_expires: null,
    terms_accepted: userData.terms_accepted ?? true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const users = await readJsonFile("users.json");
  const exists = users.find(
    (u) =>
      u.email.toLowerCase() === formattedUser.email ||
      u.phone === formattedUser.phone
  );
  if (exists) {
    throw new Error("An account with this email address or mobile number already exists.");
  }

  const newUser = {
    id: users.length > 0 ? Math.max(...users.map((u) => u.id || 0)) + 1 : 1,
    ...formattedUser,
  };
  users.push(newUser);
  await writeJsonFile("users.json", users);

  const query = `
    INSERT INTO users (
      name, email, phone, password_hash, salt, user_type, business_name, category, city, state, address, terms_accepted
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    formattedUser.name,
    formattedUser.email,
    formattedUser.phone,
    formattedUser.password_hash,
    formattedUser.salt,
    formattedUser.user_type,
    formattedUser.business_name,
    formattedUser.category,
    formattedUser.city,
    formattedUser.state,
    formattedUser.address,
    formattedUser.terms_accepted ? 1 : 0,
  ];
  await runDbQuery(query, values);

  return newUser;
}

export async function findUserByEmailOrPhone(identifier) {
  if (!identifier) return null;
  const clean = identifier.toLowerCase().trim();
  const phoneClean = identifier.replace(/[^0-9]/g, "");
  const adminUsername = (process.env.ADMIN_USERNAME || "admin").toLowerCase().trim();
  const adminId = String(process.env.ADMIN_ID || "100").trim();

  const users = await readJsonFile("users.json");
  return (
    users.find((u) => {
      if (u.email && u.email.toLowerCase() === clean) return true;
      if (phoneClean && u.phone && u.phone.replace(/[^0-9]/g, "") === phoneClean) return true;
      if (u.phone && u.phone === clean) return true;
      if (u.user_type === "admin") {
        if (clean === "admin" || clean === adminUsername || clean === adminId) return true;
      }
      return false;
    }) || null
  );
}

export async function findUserById(id) {
  if (!id) return null;
  const users = await readJsonFile("users.json");
  return users.find((u) => u.id === Number(id)) || null;
}

export async function getAllUsers() {
  return await readJsonFile("users.json");
}

export async function updateUser(userId, updateData) {
  const users = await readJsonFile("users.json");
  const idx = users.findIndex((u) => u.id === Number(userId));
  if (idx === -1) return null;

  users[idx] = {
    ...users[idx],
    ...updateData,
    updated_at: new Date().toISOString(),
  };

  await writeJsonFile("users.json", users);

  await runDbQuery(
    `UPDATE users SET name = ?, phone = ?, city = ?, business_name = ?, category = ?, updated_at = NOW() WHERE id = ?`,
    [users[idx].name, users[idx].phone, users[idx].city, users[idx].business_name, users[idx].category, userId]
  );

  return users[idx];
}

export async function updateUserPassword(userId, password_hash, salt) {
  const users = await readJsonFile("users.json");
  const userIdx = users.findIndex((u) => u.id === Number(userId));
  if (userIdx !== -1) {
    users[userIdx].password_hash = password_hash;
    users[userIdx].salt = salt;
    users[userIdx].reset_otp = null;
    users[userIdx].reset_otp_expires = null;
    users[userIdx].updated_at = new Date().toISOString();
    await writeJsonFile("users.json", users);
  }
  return true;
}

export async function setUserResetOtp(userId, otp, expiresAt) {
  const users = await readJsonFile("users.json");
  const userIdx = users.findIndex((u) => u.id === Number(userId));
  if (userIdx !== -1) {
    users[userIdx].reset_otp = otp;
    users[userIdx].reset_otp_expires = expiresAt.toISOString();
    await writeJsonFile("users.json", users);
  }
  return true;
}

// -------------------------------------------------------------
// Vendor Services Queries
// -------------------------------------------------------------
export async function getServices(vendorId = null) {
  const services = await readJsonFile("services.json");
  if (vendorId) {
    return services.filter((s) => s.vendor_id === Number(vendorId));
  }
  return services;
}

export async function saveService(serviceData) {
  const services = await readJsonFile("services.json");
  let savedService;

  if (serviceData.id) {
    const idx = services.findIndex((s) => s.id === Number(serviceData.id));
    if (idx !== -1) {
      services[idx] = {
        ...services[idx],
        ...serviceData,
        updated_at: new Date().toISOString(),
      };
      savedService = services[idx];
    }
  }

  if (!savedService) {
    const newId = services.length > 0 ? Math.max(...services.map((s) => s.id || 0)) + 1 : 1;
    savedService = {
      id: newId,
      ...serviceData,
      status: serviceData.status || "active",
      created_at: new Date().toISOString(),
    };
    services.unshift(savedService);
  }

  await writeJsonFile("services.json", services);
  return savedService;
}

export async function deleteService(id, vendorId = null) {
  const services = await readJsonFile("services.json");
  const filtered = services.filter((s) => {
    if (vendorId) return !(s.id === Number(id) && s.vendor_id === Number(vendorId));
    return s.id !== Number(id);
  });
  await writeJsonFile("services.json", filtered);
  return true;
}

// -------------------------------------------------------------
// Seller Products Queries
// -------------------------------------------------------------
export async function getProducts(sellerId = null) {
  const products = await readJsonFile("products.json");
  if (sellerId) {
    return products.filter((p) => p.seller_id === Number(sellerId));
  }
  return products;
}

export async function saveProduct(productData) {
  const products = await readJsonFile("products.json");
  let savedProduct;

  if (productData.id) {
    const idx = products.findIndex((p) => p.id === Number(productData.id));
    if (idx !== -1) {
      products[idx] = {
        ...products[idx],
        ...productData,
        updated_at: new Date().toISOString(),
      };
      savedProduct = products[idx];
    }
  }

  if (!savedProduct) {
    const newId = products.length > 0 ? Math.max(...products.map((p) => p.id || 0)) + 1 : 1;
    savedProduct = {
      id: newId,
      ...productData,
      status: productData.status || "active",
      created_at: new Date().toISOString(),
    };
    products.unshift(savedProduct);
  }

  await writeJsonFile("products.json", products);
  return savedProduct;
}

export async function deleteProduct(id, sellerId = null) {
  const products = await readJsonFile("products.json");
  const filtered = products.filter((p) => {
    if (sellerId) return !(p.id === Number(id) && p.seller_id === Number(sellerId));
    return p.id !== Number(id);
  });
  await writeJsonFile("products.json", filtered);
  return true;
}

// -------------------------------------------------------------
// Bookings Queries
// -------------------------------------------------------------
export async function getBookings({ coupleId, vendorId } = {}) {
  const bookings = await readJsonFile("bookings.json");
  return bookings.filter((b) => {
    if (coupleId && b.couple_id !== Number(coupleId)) return false;
    if (vendorId && b.vendor_id !== Number(vendorId)) return false;
    return true;
  });
}

export async function saveBooking(bookingData) {
  const bookings = await readJsonFile("bookings.json");
  const newBooking = {
    id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
    ...bookingData,
    booking_status: bookingData.booking_status || "Pending",
    payment_status: bookingData.payment_status || "Pending",
    created_at: new Date().toISOString(),
  };
  bookings.unshift(newBooking);
  await writeJsonFile("bookings.json", bookings);
  return newBooking;
}

export async function updateBookingStatus(bookingId, status) {
  const bookings = await readJsonFile("bookings.json");
  const idx = bookings.findIndex((b) => String(b.id) === String(bookingId));
  if (idx !== -1) {
    bookings[idx].booking_status = status;
    bookings[idx].updated_at = new Date().toISOString();
    await writeJsonFile("bookings.json", bookings);
    return bookings[idx];
  }
  return null;
}

// -------------------------------------------------------------
// Orders Queries
// -------------------------------------------------------------
export async function getOrders({ sellerId, customerEmail } = {}) {
  const orders = await readJsonFile("orders.json");
  return orders.filter((o) => {
    if (sellerId && o.seller_id !== Number(sellerId)) return false;
    if (customerEmail && o.customer_email?.toLowerCase() !== customerEmail.toLowerCase()) return false;
    return true;
  });
}

export async function updateOrderStatus(orderId, status) {
  const orders = await readJsonFile("orders.json");
  const idx = orders.findIndex((o) => String(o.id) === String(orderId));
  if (idx !== -1) {
    orders[idx].order_status = status;
    orders[idx].updated_at = new Date().toISOString();
    await writeJsonFile("orders.json", orders);
    return orders[idx];
  }
  return null;
}

// -------------------------------------------------------------
// Enquiries Queries
// -------------------------------------------------------------
export async function getEnquiries({ coupleId, targetId, targetType } = {}) {
  const enquiries = await readJsonFile("enquiries.json");
  return enquiries.filter((e) => {
    if (coupleId && e.couple_id !== Number(coupleId)) return false;
    if (targetId && e.target_id !== Number(targetId)) return false;
    if (targetType && e.target_type !== targetType) return false;
    return true;
  });
}

export async function saveEnquiry(data) {
  const enquiries = await readJsonFile("enquiries.json");
  const newEnquiry = {
    id: enquiries.length > 0 ? Math.max(...enquiries.map((e) => e.id || 0)) + 1 : 1,
    ...data,
    status: "New",
    reply_message: null,
    created_at: new Date().toISOString(),
  };
  enquiries.unshift(newEnquiry);
  await writeJsonFile("enquiries.json", enquiries);
  return newEnquiry;
}

export async function replyEnquiry(enquiryId, replyMessage) {
  const enquiries = await readJsonFile("enquiries.json");
  const idx = enquiries.findIndex((e) => e.id === Number(enquiryId));
  if (idx !== -1) {
    enquiries[idx].reply_message = replyMessage;
    enquiries[idx].status = "Replied";
    enquiries[idx].replied_at = new Date().toISOString();
    await writeJsonFile("enquiries.json", enquiries);
    return enquiries[idx];
  }
  return null;
}

// -------------------------------------------------------------
// Couple Planning Tools: Wishlist, Checklist, Budget
// -------------------------------------------------------------
export async function getWishlist(coupleId) {
  const list = await readJsonFile("wishlist.json");
  return list.filter((w) => w.couple_id === Number(coupleId));
}

export async function addToWishlist(item) {
  const list = await readJsonFile("wishlist.json");
  const exists = list.some((w) => w.couple_id === Number(item.couple_id) && w.item_id === item.item_id);
  if (exists) return false;

  const newItem = {
    id: list.length > 0 ? Math.max(...list.map((w) => w.id || 0)) + 1 : 1,
    ...item,
    created_at: new Date().toISOString(),
  };
  list.unshift(newItem);
  await writeJsonFile("wishlist.json", list);
  return newItem;
}

export async function removeFromWishlist(id, coupleId) {
  const list = await readJsonFile("wishlist.json");
  const filtered = list.filter((w) => !(w.id === Number(id) && w.couple_id === Number(coupleId)));
  await writeJsonFile("wishlist.json", filtered);
  return true;
}

export async function getChecklist(coupleId) {
  const items = await readJsonFile("checklist.json");
  return items.filter((c) => c.couple_id === Number(coupleId));
}

export async function saveChecklistItem(item) {
  const items = await readJsonFile("checklist.json");
  let saved;
  if (item.id) {
    const idx = items.findIndex((c) => c.id === Number(item.id));
    if (idx !== -1) {
      items[idx] = { ...items[idx], ...item };
      saved = items[idx];
    }
  }
  if (!saved) {
    saved = {
      id: items.length > 0 ? Math.max(...items.map((c) => c.id || 0)) + 1 : 1,
      ...item,
      completed: item.completed ?? false,
      created_at: new Date().toISOString(),
    };
    items.push(saved);
  }
  await writeJsonFile("checklist.json", items);
  return saved;
}

export async function toggleChecklistItem(id, coupleId) {
  const items = await readJsonFile("checklist.json");
  const idx = items.findIndex((c) => c.id === Number(id) && c.couple_id === Number(coupleId));
  if (idx !== -1) {
    items[idx].completed = !items[idx].completed;
    await writeJsonFile("checklist.json", items);
    return items[idx];
  }
  return null;
}

export async function deleteChecklistItem(id, coupleId) {
  const items = await readJsonFile("checklist.json");
  const filtered = items.filter((c) => !(c.id === Number(id) && c.couple_id === Number(coupleId)));
  await writeJsonFile("checklist.json", filtered);
  return true;
}

export async function getBudgetItems(coupleId) {
  const items = await readJsonFile("budget.json");
  return items.filter((b) => b.couple_id === Number(coupleId));
}

export async function saveBudgetItem(item) {
  const items = await readJsonFile("budget.json");
  let saved;
  if (item.id) {
    const idx = items.findIndex((b) => b.id === Number(item.id));
    if (idx !== -1) {
      items[idx] = { ...items[idx], ...item };
      saved = items[idx];
    }
  }
  if (!saved) {
    saved = {
      id: items.length > 0 ? Math.max(...items.map((b) => b.id || 0)) + 1 : 1,
      ...item,
      created_at: new Date().toISOString(),
    };
    items.push(saved);
  }
  await writeJsonFile("budget.json", items);
  return saved;
}

export async function deleteBudgetItem(id, coupleId) {
  const items = await readJsonFile("budget.json");
  const filtered = items.filter((b) => !(b.id === Number(id) && b.couple_id === Number(coupleId)));
  await writeJsonFile("budget.json", filtered);
  return true;
}

// -------------------------------------------------------------
// Vendor Reviews & Availability Queries
// -------------------------------------------------------------
export async function getReviews(vendorId) {
  const reviews = await readJsonFile("reviews.json");
  return reviews.filter((r) => r.vendor_id === Number(vendorId));
}

export async function replyReview(reviewId, replyText) {
  const reviews = await readJsonFile("reviews.json");
  const idx = reviews.findIndex((r) => r.id === Number(reviewId));
  if (idx !== -1) {
    reviews[idx].reply_text = replyText;
    await writeJsonFile("reviews.json", reviews);
    return reviews[idx];
  }
  return null;
}

// -------------------------------------------------------------
// Vendor Registrations & Contact Inquiries
// -------------------------------------------------------------
export async function getVendorRegistrations() {
  return await readJsonFile("vendor_registrations.json");
}

export async function updateVendorRegistrationStatus(id, status) {
  const list = await readJsonFile("vendor_registrations.json");
  const idx = list.findIndex((v) => v.id === Number(id));
  if (idx !== -1) {
    list[idx].status = status;
    list[idx].updated_at = new Date().toISOString();
    await writeJsonFile("vendor_registrations.json", list);
    return list[idx];
  }
  return null;
}

export async function saveVendorRegistration(vendorData) {
  const backupDir = path.join(process.cwd(), "data");
  await fs.mkdir(backupDir, { recursive: true });
  const backupFile = path.join(backupDir, "vendor_registrations.json");

  let existing = [];
  try {
    const fileData = await fs.readFile(backupFile, "utf-8");
    existing = JSON.parse(fileData);
  } catch {
    existing = [];
  }

  const newRecord = {
    id: existing.length + 1,
    ...vendorData,
    created_at: new Date().toISOString(),
    status: "pending",
  };

  existing.unshift(newRecord);
  await fs.writeFile(backupFile, JSON.stringify(existing, null, 2), "utf-8");
  return { success: true, id: newRecord.id, storage: "local_backup" };
}

export async function saveContactInquiry(inquiryData) {
  const backupDir = path.join(process.cwd(), "data");
  await fs.mkdir(backupDir, { recursive: true });
  const backupFile = path.join(backupDir, "contact_inquiries.json");

  let existing = [];
  try {
    const fileData = await fs.readFile(backupFile, "utf-8");
    existing = JSON.parse(fileData);
  } catch {
    existing = [];
  }

  const newRecord = {
    id: existing.length + 1,
    ...inquiryData,
    submitted_at: new Date().toISOString(),
    status: "new",
  };

  existing.unshift(newRecord);
  await fs.writeFile(backupFile, JSON.stringify(existing, null, 2), "utf-8");
  return newRecord;
}

// -------------------------------------------------------------
// Sathi AI Chatbot Inquiries
// -------------------------------------------------------------
export async function getChatbotInquiries() {
  return await readJsonFile("chatbot_inquiries.json");
}

export async function saveChatbotInquiry(data) {
  const backupDir = path.join(process.cwd(), "data");
  await fs.mkdir(backupDir, { recursive: true });

  const chatbotFile = path.join(backupDir, "chatbot_inquiries.json");
  const contactFile = path.join(backupDir, "contact_inquiries.json");

  let existing = [];
  try {
    const fileData = await fs.readFile(chatbotFile, "utf-8");
    existing = JSON.parse(fileData);
  } catch {
    existing = [];
  }

  // Duplicate check within 2 minutes for same phone
  const twoMinutesAgo = Date.now() - 2 * 60 * 1000;
  const isDuplicate = existing.some((item) => {
    const itemTime = new Date(item.submitted_at || item.created_at || 0).getTime();
    return (
      item.mobile_number === data.mobileNumber &&
      itemTime > twoMinutesAgo
    );
  });

  if (isDuplicate) {
    const existingRecord = existing.find((item) => item.mobile_number === data.mobileNumber);
    return {
      success: true,
      duplicate: true,
      id: existingRecord?.id || "SATHI-DUP",
      message: "A match inquiry with this mobile number was recently submitted. Our team is already reviewing it!",
    };
  }

  const newId = existing.length > 0 ? Math.max(...existing.map((e) => Number(e.id) || 0)) + 1 : 1;
  const timestamp = new Date().toISOString();

  const formattedRecord = {
    id: newId,
    full_name: (data.fullName || "").trim(),
    name: (data.fullName || "").trim(),
    mobile_number: (data.mobileNumber || "").trim(),
    phone: (data.mobileNumber || "").trim(),
    email: (data.email || "").trim(),
    looking_for: data.lookingFor || "Bride",
    age: data.age ? String(data.age).trim() : "",
    preferred_location: (data.preferredLocation || "").trim(),
    city: (data.preferredLocation || "").trim(),
    query: (data.query || "").trim(),
    message: `[Matrimonial Inquiry - Looking for: ${data.lookingFor || "Partner"}${data.age ? `, Age: ${data.age}` : ""}${data.preferredLocation ? `, Location: ${data.preferredLocation}` : ""}]\n\nRequirement: ${(data.query || "").trim()}`,
    source: "Sathi AI Chatbot",
    conversation_summary: (data.conversationSummary || "").trim(),
    status: "New", // 'New' | 'Contacted' | 'In Progress' | 'Resolved'
    submitted_at: timestamp,
    created_at: timestamp,
  };

  existing.unshift(formattedRecord);
  await fs.writeFile(chatbotFile, JSON.stringify(existing, null, 2), "utf-8");

  // Also sync to contact_inquiries.json for unified admin views
  try {
    let contactExisting = [];
    try {
      const cData = await fs.readFile(contactFile, "utf-8");
      contactExisting = JSON.parse(cData);
    } catch {
      contactExisting = [];
    }
    contactExisting.unshift({
      ...formattedRecord,
      userType: "couple",
      couple_name: formattedRecord.full_name,
      couple_phone: formattedRecord.mobile_number,
      couple_email: formattedRecord.email,
    });
    await fs.writeFile(contactFile, JSON.stringify(contactExisting, null, 2), "utf-8");
  } catch (err) {
    console.warn("Contact inquiries sync notice:", err.message);
  }

  // Also sync to PostgreSQL if connected
  try {
    await runDbQuery(
      `INSERT INTO chatbot_inquiries (
        full_name, mobile_number, email, looking_for, age, preferred_location, query, source, conversation_summary, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        formattedRecord.full_name,
        formattedRecord.mobile_number,
        formattedRecord.email || null,
        formattedRecord.looking_for,
        formattedRecord.age || null,
        formattedRecord.preferred_location || null,
        formattedRecord.query,
        "Sathi AI Chatbot",
        formattedRecord.conversation_summary || null,
        "New",
      ]
    );
  } catch (dbErr) {
    console.warn("PostgreSQL chatbot inquiry sync note:", dbErr.message);
  }

  return {
    success: true,
    id: newId,
    data: formattedRecord,
    message: "Inquiry saved successfully",
  };
}

export async function updateChatbotInquiryStatus(id, status, remarks = "") {
  const backupDir = path.join(process.cwd(), "data");
  const chatbotFile = path.join(backupDir, "chatbot_inquiries.json");
  const contactFile = path.join(backupDir, "contact_inquiries.json");

  let existing = [];
  try {
    const fileData = await fs.readFile(chatbotFile, "utf-8");
    existing = JSON.parse(fileData);
  } catch {
    existing = [];
  }

  const idx = existing.findIndex((e) => String(e.id) === String(id));
  if (idx !== -1) {
    existing[idx].status = status;
    if (remarks) existing[idx].admin_remarks = remarks;
    existing[idx].updated_at = new Date().toISOString();
    await fs.writeFile(chatbotFile, JSON.stringify(existing, null, 2), "utf-8");

    // Also update in contact_inquiries if present
    try {
      const cData = await fs.readFile(contactFile, "utf-8");
      const cList = JSON.parse(cData);
      const cIdx = cList.findIndex((c) => String(c.id) === String(id) && c.source === "Sathi AI Chatbot");
      if (cIdx !== -1) {
        cList[cIdx].status = status;
        if (remarks) cList[cIdx].admin_remarks = remarks;
        await fs.writeFile(contactFile, JSON.stringify(cList, null, 2), "utf-8");
      }
    } catch {}

    // Update in PostgreSQL
    try {
      await runDbQuery(
        `UPDATE chatbot_inquiries SET status = ?, admin_remarks = ?, updated_at = NOW() WHERE id = ?`,
        [status, remarks || null, Number(id)]
      );
    } catch {}

    return existing[idx];
  }
  return null;
}

// -------------------------------------------------------------
// OTP Verification Queries
// -------------------------------------------------------------
export async function saveOtpVerification({ target, type, otp, expiresAt }) {
  const records = await readJsonFile("otp_verifications.json", []);
  const cleanTarget = target.toLowerCase().trim();
  const existingIdx = records.findIndex((r) => r.target.toLowerCase() === cleanTarget);

  const newEntry = {
    target: cleanTarget,
    type,
    otp,
    expiresAt: expiresAt.toISOString(),
    verified: false,
    updated_at: new Date().toISOString(),
  };

  if (existingIdx !== -1) {
    records[existingIdx] = newEntry;
  } else {
    records.push(newEntry);
  }

  await writeJsonFile("otp_verifications.json", records);
  return true;
}

export async function verifyOtpCode(target, otp) {
  const records = await readJsonFile("otp_verifications.json", []);
  const cleanTarget = target.toLowerCase().trim();
  const found = records.find((r) => r.target.toLowerCase() === cleanTarget);

  if (!found) return false;
  if (found.otp !== otp.trim()) return false;
  if (new Date(found.expiresAt).getTime() < Date.now()) return false;

  found.verified = true;
  await writeJsonFile("otp_verifications.json", records);
  return true;
}

// -------------------------------------------------------------
// Extended Registration Profiles (Couple, Seller, Vendor, Partner Preferences, Documents)
// -------------------------------------------------------------
export async function saveCoupleProfile(profileData) {
  const profiles = await readJsonFile("couple_profiles.json", []);
  const idx = profiles.findIndex((p) => p.userId === Number(profileData.userId));
  const record = {
    ...profileData,
    userId: Number(profileData.userId),
    updated_at: new Date().toISOString(),
  };
  if (idx !== -1) {
    profiles[idx] = { ...profiles[idx], ...record };
  } else {
    profiles.push({ ...record, created_at: new Date().toISOString() });
  }
  await writeJsonFile("couple_profiles.json", profiles);
  return record;
}

export async function saveSellerProfile(profileData) {
  const profiles = await readJsonFile("seller_profiles.json", []);
  const idx = profiles.findIndex((p) => p.userId === Number(profileData.userId));
  const record = {
    ...profileData,
    userId: Number(profileData.userId),
    updated_at: new Date().toISOString(),
  };
  if (idx !== -1) {
    profiles[idx] = { ...profiles[idx], ...record };
  } else {
    profiles.push({ ...record, created_at: new Date().toISOString() });
  }
  await writeJsonFile("seller_profiles.json", profiles);
  return record;
}

export async function saveVendorProfile(profileData) {
  const profiles = await readJsonFile("vendor_profiles.json", []);
  const idx = profiles.findIndex((p) => p.userId === Number(profileData.userId));
  const record = {
    ...profileData,
    userId: Number(profileData.userId),
    updated_at: new Date().toISOString(),
  };
  if (idx !== -1) {
    profiles[idx] = { ...profiles[idx], ...record };
  } else {
    profiles.push({ ...record, created_at: new Date().toISOString() });
  }
  await writeJsonFile("vendor_profiles.json", profiles);
  return record;
}

export async function savePartnerPreferences(prefData) {
  const prefs = await readJsonFile("partner_preferences.json", []);
  const idx = prefs.findIndex((p) => p.userId === Number(prefData.userId));
  const record = {
    ...prefData,
    userId: Number(prefData.userId),
    updated_at: new Date().toISOString(),
  };
  if (idx !== -1) {
    prefs[idx] = { ...prefs[idx], ...record };
  } else {
    prefs.push({ ...record, created_at: new Date().toISOString() });
  }
  await writeJsonFile("partner_preferences.json", prefs);
  return record;
}

export async function saveUserDocuments(docData) {
  const docs = await readJsonFile("user_documents.json", []);
  const newDoc = {
    id: docs.length > 0 ? Math.max(...docs.map((d) => d.id || 0)) + 1 : 1,
    ...docData,
    userId: Number(docData.userId),
    created_at: new Date().toISOString(),
  };
  docs.push(newDoc);
  await writeJsonFile("user_documents.json", docs);
  return newDoc;
}

export async function saveWeddingDetails(weddingData) {
  const details = await readJsonFile("wedding_details.json", []);
  const idx = details.findIndex((d) => d.userId === Number(weddingData.userId));
  const record = {
    ...weddingData,
    userId: Number(weddingData.userId),
    updated_at: new Date().toISOString(),
  };
  if (idx !== -1) {
    details[idx] = { ...details[idx], ...record };
  } else {
    details.push({ ...record, created_at: new Date().toISOString() });
  }
  await writeJsonFile("wedding_details.json", details);
  return record;
}

export async function saveCustomerPreferences(prefData) {
  const prefs = await readJsonFile("customer_service_preferences.json", []);
  const idx = prefs.findIndex((p) => p.userId === Number(prefData.userId));
  const record = {
    ...prefData,
    userId: Number(prefData.userId),
    updated_at: new Date().toISOString(),
  };
  if (idx !== -1) {
    prefs[idx] = { ...prefs[idx], ...record };
  } else {
    prefs.push({ ...record, created_at: new Date().toISOString() });
  }
  await writeJsonFile("customer_service_preferences.json", prefs);
  return record;
}

export async function saveVendorPackage(pkgData) {
  const pkgs = await readJsonFile("vendor_packages.json", []);
  const newPkg = {
    id: pkgs.length > 0 ? Math.max(...pkgs.map((p) => p.id || 0)) + 1 : 1,
    ...pkgData,
    userId: Number(pkgData.userId),
    created_at: new Date().toISOString(),
  };
  pkgs.push(newPkg);
  await writeJsonFile("vendor_packages.json", pkgs);
  return newPkg;
}

export async function saveVendorPortfolio(portfolioData) {
  const portfolios = await readJsonFile("vendor_portfolios.json", []);
  const idx = portfolios.findIndex((p) => p.userId === Number(portfolioData.userId));
  const record = {
    ...portfolioData,
    userId: Number(portfolioData.userId),
    updated_at: new Date().toISOString(),
  };
  if (idx !== -1) {
    portfolios[idx] = { ...portfolios[idx], ...record };
  } else {
    portfolios.push({ ...record, created_at: new Date().toISOString() });
  }
  await writeJsonFile("vendor_portfolios.json", portfolios);
  return record;
}


