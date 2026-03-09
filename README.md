# 📦 RentFlow - Rental Management System

**RentFlow** is a comprehensive, full-stack rental management platform built with **Next.js 15**, **TypeScript**, and **Supabase**. It facilitates a seamless workflow between Customers, Vendors, and Administrators for renting equipment (electronics, furniture, cameras, etc.).

## 🚀 Features

### 👑 Admin Dashboard
- **Kanban Board:** Visual drag-and-drop style tracking of rental orders (Draft → Quotation → Sale Order → Confirmed → Invoiced).
- **Order Management:** Create and edit rental orders with dynamic pricing, tax calculations, and status updates.
- **Invoice Generation:** Auto-generate invoices from confirmed orders.
- **User Management:** View customers and vendors.

### Vendor Portal
- **Product Management:** Add, edit, and manage rental inventory.
- **Duplicate Prevention:** Smart handling of SKUs to prevent duplicate entries.
- **Image Upload:** Seamless product image uploads using Supabase Storage.

### Customer Experience
- **Browse & Rent:** View available products from multiple vendors.
- **Dynamic Cart:** Real-time calculation of rental costs based on duration (Start Date → End Date).
- **Authentication:** Secure login via Email/Password or Google OAuth.

---

## Tech Stack

- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Database & Auth:** [Supabase](https://supabase.com/) (PostgreSQL)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Notifications:** [React Hot Toast](https://react-hot-toast.com/)

---

## Getting Started

Follow these steps to set up the project locally.

### 1. Clone the Repository

```bash
git clone [https://github.com/your-username/rentflow.git](https://github.com/your-username/rentflow.git)
cd rentflow
2. Install Dependencies
Bash
npm install
# or
yarn install
3. Configure Environment Variables
Create a .env.local file in the root directory and add your Supabase credentials:

Code snippet
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
4. Database Setup (Supabase)
Go to your Supabase SQL Editor and run the following scripts to set up the tables and security policies:

A. Create Tables
SQL
-- Users & Roles
ALTER TABLE auth.users ADD COLUMN IF NOT EXISTS role text DEFAULT 'CUSTOMER';

-- Products
create table products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  sku text unique,
  price numeric,
  stock int,
  category text,
  image_url text,
  vendor_id uuid references auth.users(id),
  created_at timestamp with time zone default now()
);

-- Orders
create table rental_orders (
  id uuid default gen_random_uuid() primary key,
  customer_id uuid references auth.users(id),
  status text default 'Draft',
  total_amount numeric,
  rental_start date,
  rental_end date,
  created_at timestamp with time zone default now()
);

-- Order Items
create table rental_order_items (
  id uuid default gen_random_uuid() primary key,
  order_id uuid references rental_orders(id) on delete cascade,
  product_name text,
  quantity int,
  price numeric
);
B. Storage Bucket (For Images)
SQL
insert into storage.buckets (id, name, public) values ('products', 'products', true);

create policy "Public Access" on storage.objects for all using ( bucket_id = 'products' );
C. Disable RLS (For Development)
Note: For production, you should write specific RLS policies.

SQL
ALTER TABLE products DISABLE ROW LEVEL SECURITY;
ALTER TABLE rental_orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE rental_order_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE auth.users DISABLE ROW LEVEL SECURITY;
5. Run the Application
Bash
npm run dev
Open http://localhost:3000 with your browser to see the result.

Project Structure
Bash
src/
├── app/
│   ├── admin/          # Admin Dashboard (Orders, Invoices)
│   ├── dashboard/      # Customer Dashboard (Cart, Profile)
│   ├── vendor/         # Vendor Dashboard (Products)
│   ├── login/          # Auth Pages
│   └── page.tsx        # Landing Page
├── components/
│   ├── admin/          # Admin specific components (DocumentForm, Kanban)
│   ├── vendor/         # Vendor components (ProductForm)
│   └── ui/             # Reusable UI components
└── utils/
    └── supabase/       # Supabase client configuration
