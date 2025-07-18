📘 API Documentation – Checkout Page Management System
This documentation provides complete details on how frontend developers can use the backend API endpoints.

🌐 Base URL
arduino
Copy
Edit
http://localhost:7002
All API requests should be prefixed with this base URL.

🔐 AUTHENTICATION ROUTES
Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Login and get token

🔽 Register
bash
Copy
Edit
POST /api/auth/register
Body:

json
Copy
Edit
{
  "username": "john123",
  "email": "john@example.com",
  "password": "123456"
}
🔽 Login
bash
Copy
Edit
POST /api/auth/login
Body:

json
Copy
Edit
{
  "email": "john@example.com",
  "password": "123456"
}
Response:

json
Copy
Edit
{
  "token": "JWT_TOKEN_HERE",
  "user": {
    "_id": "userId",
    "role": "user"
  }
}
🔐 PROTECTED ROUTES (JWT Required in Headers)
Header Format (for all protected routes):

makefile
Copy
Edit
Authorization: Bearer YOUR_JWT_TOKEN
📦 CHECKOUT PAGE ROUTES (Protected + Role-Based)
All routes require token. Use the Authorization header.

🔽 Create Checkout Page
bash
Copy
Edit
POST /api/checkout-pages/
Header: Authorization: Bearer TOKEN
Body:

json
Copy
Edit
{
  "title": "Demo Checkout",
  "amount": 1000,
  "description": "Payment for course"
}
🔽 Get Checkout Pages by User ID
bash
Copy
Edit
GET /api/checkout-pages/user/:userId
🔽 Get Single Checkout Page by ID
bash
Copy
Edit
GET /api/checkout-pages/:id
🔁 Update Checkout Page
bash
Copy
Edit
PUT /api/checkout-pages/:id
Body:

json
Copy
Edit
{
  "title": "Updated Title",
  "amount": 1200
}
❌ Delete Checkout Page
bash
Copy
Edit
DELETE /api/checkout-pages/:id
🧑‍💼 ROLE-BASED ROUTES
Method	Endpoint	Access	Description
GET	/api/users/admin	Admin Only	Admin dashboard view
GET	/api/users/user	Admin/User	User access check

These routes are protected using role-based middleware.

🛠️ ADMIN MANAGEMENT ROUTES
Method	Endpoint	Description
GET	/admin/	Get all checkout pages (admin)
GET	/admin/checkout/:id	Get specific checkout page
PUT	/admin/checkout/:id	Update checkout page (admin)
DELETE	/admin/checkout/:id	Delete checkout page (admin)

