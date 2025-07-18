📘 **API Documentation – Checkout Page Management System**

---

### 🔐 Admin Login (Default Credentials)

Use these credentials to log in as admin:

| Field    | Value                                     |
| -------- | ----------------------------------------- |
| Email    | [admin] |
| Password | 123456                                    |

This account grants access to all admin-only features and routes.

---

### 🔑 Authentication API

**Base URL:** `http://localhost:7002/api/auth`

| Method | Endpoint  | Description         |
| ------ | --------- | ------------------- |
| POST   | /register | Register a new user |
| POST   | /login    | Login as user/admin |

**Sample Login Request:**

```json
{
  "email": "admin@admin.com",
  "password": "123456"
}
```

---

### 📦 Checkout Page API

**Base URL:** `http://localhost:7002/api/checkout-pages`

| Method | Endpoint       | Description                           |
| ------ | -------------- | ------------------------------------- |
| POST   | /              | Create a new checkout page            |
| GET    | /user/\:userId | Get all checkout pages for a user     |
| GET    | /\:id          | Get details of a single checkout page |
| PUT    | /\:id          | Update a checkout page                |
| DELETE | /\:id          | Delete a checkout page                |

---

### 🧑‍💼 Role-Based Access API

**Base URL:** `http://localhost:7002/api/users`

| Method | Endpoint | Access     | Description            |
| ------ | -------- | ---------- | ---------------------- |
| GET    | /admin   | Admin Only | Check if user is admin |
| GET    | /user    | Any User   | Check user or admin    |

---

### ⚙️ Admin Management API

**Base URL:** `http://localhost:7002/admin`

| Method | Endpoint       | Description                  |
| ------ | -------------- | ---------------------------- |
| GET    | /              | Get all checkout pages       |
| GET    | /checkout/\:id | Get a specific checkout page |
| PUT    | /checkout/\:id | Update a checkout page       |
| DELETE | /checkout/\:id | Delete a checkout page       |

✅ These routes require admin privileges with a valid JWT token.

**Sample Axios Request (Frontend):**

```js
axios.get('/api/checkout-pages', {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
```

---

### 👤 User Schema (Mongoose)

**File:** `models/User.js`

```js
{
  username: String,       // required, unique
  password: String,       // required (hashed)
  role: "admin" | "user", // enum - required
  createdAt: Date,
  updatedAt: Date
}
```

Used for login, role checks, and checkout ownership.

---

### 📦 Checkout Page Schema (Mongoose)

**File:** `models/Checkout.js`

```js
{
  owner: ObjectId,           // Reference to User
  title: String,
  productname: String,
  productprice: Number,
  productimage: [String],    // Image URLs
  buttonText: String,        // CTA (default: "Buy Now")

  colors: {
    primary: String,         // default: "#4f46e5"
    secondary: String        // default: "#ffffff"
  },

  font: String,              // default: Arial

  formFields: {
    name: Boolean,
    email: Boolean,
    phone: Boolean,
    address: Boolean
  },

  utmParameters: {
    source: String,
    medium: String,
    campaign: String,
    term: String,
    content: String
  },

  createdAt: Date,
  updatedAt: Date
}
```

This schema is used to render dynamic checkout pages with form fields and design options.

---

### 🧑‍💼 Admin Schema (Mongoose)

**File:** `models/Admin.js`

```js
{
  owner: ObjectId,    // Admin user
  checkout: ObjectId  // Checkout page ID
}
```

Helps track which admin manages which checkout pages.

---

### ✅ Frontend Implementation Notes

* Always use `Bearer Token` in headers for protected routes.
* Use `/login` to authenticate and store JWT in `localStorage` or context.
* Admin dashboard should use `/admin/` route to list/manage checkout pages.
* Users can only access their own checkout data via `/api/checkout-pages/user/:userId`
* Use the `formFields` and `colors` config to dynamically render checkout page UI.
* Handle unauthorized access with proper redirects.

---

🧾 End of Documentation
