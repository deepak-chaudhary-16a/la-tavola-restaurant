# La Tavola — MERN Stack Restaurant Website

A full-stack restaurant website (major project) built with **MongoDB, Express, React, Node.js**.
Matches the "Flavor / La Tavola" restaurant design — Home, Menu, About, Gallery, Contact, Table
Reservations — plus real backend functionality: user authentication, an admin panel with menu
CRUD, reservation management, and a contact-message inbox.

## Features

- **Public site:** Home, Menu (filterable by category), About, Gallery, Contact form, Reserve-a-Table form
- **Auth:** Signup / Login with JWT, passwords hashed with bcrypt
- **User account:** "My Reservations" page showing a logged-in user's bookings and their status
- **Admin panel** (`/admin`, admin role only):
  - Menu Items — add / edit / delete / mark available / feature on homepage
  - Reservations — view all, filter by status, change status (pending/confirmed/cancelled), delete
  - Messages — view contact-form submissions, mark read, delete
- Reservation and contact forms work whether or not the visitor is logged in

## Tech stack

- **Frontend:** React 18 + Vite, React Router, Tailwind CSS, Axios
- **Backend:** Node.js, Express, Mongoose (MongoDB), JWT, bcryptjs
- **Database:** MongoDB (local or MongoDB Atlas)

## Project structure

```
mern-restaurant/
├── backend/
│   ├── config/db.js
│   ├── controllers/        # auth, menu, reservation, contact
│   ├── middleware/         # auth (protect/adminOnly), errorHandler
│   ├── models/              # User, MenuItem, Reservation, Contact
│   ├── routes/
│   ├── seed.js              # populates demo menu items
│   ├── server.js
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── api/axios.js
    │   ├── components/       # Navbar, Footer, ProtectedRoute, admin/*
    │   ├── context/AuthContext.jsx
    │   ├── pages/            # Home, Menu, About, Gallery, Contact, Reserve,
    │   │                      # Login, Signup, MyReservations, Admin
    │   ├── App.jsx
    │   └── main.jsx
    └── .env.example
```

## Setup

### Prerequisites

- Node.js 18+
- A MongoDB instance — either install MongoDB locally, or create a free cluster at
  [MongoDB Atlas](https://www.mongodb.com/atlas) and copy its connection string.

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/la_tavola   # or your Atlas connection string
JWT_SECRET=some_long_random_string
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
ADMIN_SETUP_KEY=pick_a_secret_setup_key
```

Seed some demo menu items (optional but recommended):

```bash
npm run seed
```

Start the API:

```bash
npm run dev      # nodemon, auto-restarts on changes
# or
npm start
```

The API runs at `http://localhost:5000`. Check `http://localhost:5000/api/health`.

### 2. Create your admin account

The signup form always creates a normal `user`. To get an `admin` account (needed for
`/admin`), call the one-time setup endpoint with the `ADMIN_SETUP_KEY` you set above —
easiest via curl, Postman, or Thunder Client:

```bash
curl -X POST http://localhost:5000/api/auth/create-admin \
  -H "Content-Type: application/json" \
  -d '{"name":"Admin","email":"admin@latavola.com","password":"changeme123","setupKey":"pick_a_secret_setup_key"}'
```

Then log in on the site with that email/password — you'll see "Admin Panel" in the navbar.

### 3. Frontend

```bash
cd frontend
npm install
cp .env.example .env    # VITE_API_URL=http://localhost:5000/api
npm run dev
```

Open `http://localhost:5173`.

## Building for production

```bash
cd frontend
npm run build       # outputs static files to frontend/dist
```

Deploy `backend` to any Node host (Render, Railway, an EC2/VPS, etc.) with a MongoDB
Atlas connection string, and deploy `frontend/dist` to any static host (Netlify, Vercel,
same server) — just point `VITE_API_URL` at your deployed backend's `/api` URL before building.

## Notes for your project report / viva

- Passwords are never stored in plain text (bcrypt hash, `select: false` on the schema field).
- Routes are protected with JWT middleware; admin-only routes additionally check `role === "admin"`.
- The reservation and contact endpoints accept anonymous submissions too (so the public forms
  work without forcing a login), but automatically link a reservation to the logged-in user's
  account when a valid token is present (`optionalAuth` middleware).
- Menu categories (Antipasti / Primi / Secondi / Dolci) are enforced at the schema level with a
  Mongoose enum, matching the tabs shown on the Menu page.
- Gallery photos are currently placeholders — swap in real images in `src/pages/Gallery.jsx`.
