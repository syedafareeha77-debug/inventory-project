# My Inventory Project

**Description:**
This is a simple Inventory Management Web Application where you can manage products, categories, suppliers, and stock. Both frontend and backend work together, and data is stored either locally or in a database.

---

## Features

* **Dashboard:** Quick view of products, stock, and statistics.
* **Products:** Add, edit, delete, and search products.
* **Categories:** Create and manage product categories.
* **Suppliers:** Add, update, and delete supplier information.
* **Stock:** Monitor product stock levels and highlight low stock.
* **Users:** View and manage users (protected route).
* **Reports:** Generate reports for products and stock.
* **Settings:** Manage user and app settings.

---

## Technologies Used

### Frontend:

* **React.js:** To build an interactive and responsive user interface.
* **Tailwind CSS:** For quick and modern styling.
* **React Icons:** For icons in buttons and UI.
* **Local Storage:** To store data temporarily when backend is not connected.

### Backend:

* **Node.js:** To run server-side code.
* **Express.js:** To create backend routes and APIs.
* **MongoDB:** To store data like products, categories, users, and suppliers.
* **Mongoose:** To simplify MongoDB queries and define data models.
* **JWT (JSON Web Token):** For user authentication and protecting routes.

---

## Backend Folder Structure

```
backend/
│
├─ controllers/       # Logic for handling API requests (add, update, delete, fetch)
├─ models/            # Data models (schemas)
├─ routes/            # API endpoints (URLs)
├─ middleware/        # Extra logic like authentication
├─ server.js          # Entry point to start the backend server
├─ .env               # Configuration and secret keys (DB URL, JWT secret)
├─ package.json       # Dependencies and scripts
└─ package-lock.json  # Lock file for npm dependencies
```

---

## Frontend Folder Structure

```
frontend/
│
├─ src/               # All React code
│   ├─ components/    # Reusable UI components (e.g., Sidebar, Buttons)
│   ├─ pages/         # App pages (Products, Categories, Suppliers, Stock)
│   ├─ App.js         # Main React component with routing
│   └─ index.js       # Entry point for React app
├─ public/            # Static files (index.html, favicon, etc.)
├─ node_modules/      # Installed packages (auto-generated)
├─ tailwind.config.js # Tailwind CSS configuration
├─ package.json       # Frontend dependencies and scripts
└─ package-lock.json  # Lock file for npm dependencies
```

---

## How to Run

1. Clone the repository.
2. **Backend:**

   ```bash
   cd backend
   npm install
   npm start
   ```
3. **Frontend:**

   ```bash
   cd frontend
   npm install
   npm start
   ```
4. Open your browser at: `http://localhost:3000`

---

## Why These Technologies?

* **React:** Fast and interactive UI with easy state management.
* **Tailwind CSS:** Simple, responsive styling and saves development time.
* **Node + Express:** Lightweight backend and easy API creation.
* **MongoDB + Mongoose:** Flexible NoSQL database, easy setup and queries.
* **JWT:** Secure login and protected routes.

---

