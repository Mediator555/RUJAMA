# RUJAMA PHONES SHOP - Minimal Demo

## Overview

This is a minimal demo for RUJAMA PHONES SHOP e-commerce site.

## Setup

### 1. Supabase Setup

- Create a project on [supabase.com](https://supabase.com).
- Run the SQL schema provided to create tables `products` and `orders`.
- Create a public bucket `product-images`.
- Get your Supabase URL and anon & service role keys.

### 2. Backend Setup

```bash
cd server
npm install
cp .env.example .env
# edit .env with your keys
npm run dev
```

Server will start on http://localhost:4000

### 3. Frontend Setup

```bash
cd client
npm install
# create .env with
# VITE_SUPABASE_URL=https://your-project.supabase.co
# VITE_SUPABASE_ANON_KEY=your-anon-key
npm run dev
```

Open http://localhost:5173 (or as Vite shows) in your browser.

## Features

- Basic product listing.
- Admin login and dashboard.
- Backend API proxy to Supabase.
- Minimal styling and React setup.

## Notes

- Extend this demo with product CRUD, image upload, order management.
- Deploy backend separately (Render.com or similar).
- Deploy frontend to Netlify or Vercel.

---
