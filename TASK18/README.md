# Task #18: Creating a RESTful API with Node.js and Testing with POSTMAN

## Objective
Build a RESTful API using Node.js and test it with POSTMAN.

## Project Description
This project is a RESTful Product Management API built with Node.js, Express.js, MongoDB, and JWT authentication. It manages a list of products, where each product contains:

- Name
- Description
- Price
- Category

The API supports CRUD operations and uses MongoDB to persist product data. JWT authentication is added so that only authenticated users can create, update, and delete products.

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token JWT
- bcryptjs
- dotenv
- POSTMAN

## Folder Structure

```text
product-api-task/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── productController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── Product.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── productRoutes.js
│   └── server.js
├── postman/
│   └── Product_API_Postman_Collection.json
├── .env.example
├── package.json
└── README.md
```

## Installation and Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create environment file
Create a `.env` file in the project root and copy the values from `.env.example`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/product_api_db
JWT_SECRET=change_this_secret_key
JWT_EXPIRES_IN=1d
```

### 3. Start MongoDB
Make sure MongoDB is running locally, or replace `MONGO_URI` with your MongoDB Atlas connection string.

### 4. Run the server

```bash
npm start
```

For development mode:

```bash
npm run dev
```

The server runs at:

```text
http://localhost:5000
```

## API Endpoints

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
```

Request body:

```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /api/auth/login
```

Request body:

```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

Successful login returns a JWT token. Use this token for protected product routes.

## Product Endpoints

### Get All Products Public
```http
GET /api/products
```

### Get Single Product Public
```http
GET /api/products/:id
```

### Create Product Protected
```http
POST /api/products
```

Headers:

```text
Authorization: Bearer <JWT_TOKEN>
```

Request body:

```json
{
  "name": "Laptop",
  "description": "High performance laptop",
  "price": 65000,
  "category": "Electronics"
}
```

### Update Product Protected
```http
PUT /api/products/:id
```

Headers:

```text
Authorization: Bearer <JWT_TOKEN>
```

Request body:

```json
{
  "name": "Updated Laptop",
  "description": "Updated laptop description",
  "price": 70000,
  "category": "Electronics"
}
```

### Delete Product Protected
```http
DELETE /api/products/:id
```

Headers:

```text
Authorization: Bearer <JWT_TOKEN>
```

## POSTMAN Testing Documentation

A POSTMAN collection is included in:

```text
postman/Product_API_Postman_Collection.json
```

### Steps to test in POSTMAN

1. Open POSTMAN.
2. Click Import.
3. Import `Product_API_Postman_Collection.json`.
4. Run the Register request.
5. Run the Login request.
6. Copy the token from the login response.
7. Set the token in the collection variable named `token`.
8. Test Create Product.
9. Copy the created product `_id`.
10. Set the copied ID in the collection variable named `productId`.
11. Test Get All Products, Get Product By ID, Update Product, and Delete Product.

## Authentication Rule

Only authenticated users with a valid JWT token can access these routes:

- Create Product
- Update Product
- Delete Product

Public users can access:

- Get All Products
- Get Product By ID

## Conclusion

This task successfully implements a RESTful API using Node.js and Express. It connects to MongoDB for persistent product storage, supports full CRUD operations, includes JWT-based authentication, and provides a POSTMAN collection for endpoint testing and API documentation.
