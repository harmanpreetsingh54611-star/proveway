# Express.js Crash Course - Complete Notes
## Based on CodersGyan Video (Nov 6, 2024)

---

## Table of Contents
1. [Introduction & Express Basics](#introduction--express-basics)
2. [Project Setup](#project-setup)
3. [Server Setup](#server-setup)
4. [Routing](#routing)
5. [Middleware (Middlewares)](#middleware)
6. [Request & Response](#request--response)
7. [Status Codes & JSON Responses](#status-codes--json-responses)
8. [Error Handling Middleware](#error-handling-middleware)
9. [JWT Authentication - DETAILED GUIDE](#jwt-authentication---detailed-guide)

---

## Introduction & Express Basics

### What is Express.js?

**Express.js** is a minimal and flexible Node.js web framework that simplifies building REST APIs and web applications.

**Without Express (Core Node.js):**
- You have to write a lot of boilerplate code
- Manual route handling
- Manual middleware management

**With Express:**
- Abstractions and utilities that speed up development
- Built-in features: routing, middleware, error handling

### Key Features of Express.js

| Feature | Description |
|---------|-------------|
| **Fast** | Minimal framework with high performance |
| **Unopinionated** | No strict rules - developer has freedom to structure code as needed |
| **Minimalist** | Only essential features, keeping it lightweight |
| **Routing** | Easy URL-based request handling |
| **Middleware** | Pre-processing requests before handlers |
| **Error Handling** | Built-in error handling mechanisms |

### Express v5 vs v4

**Express v5** is the latest version with improvements over v4. The instructor demonstrates the new approach in v5 for building APIs.

---

## Project Setup

### Prerequisites

- **Node.js version**: 18 or higher
- **npm**: Comes with Node.js

### Step 1: Initialize Node Project

```bash
npm init -y
```

This creates `package.json` with default configuration.

### Step 2: Install Express v5

```bash
npm install express@5
```

**Note:** Installing without version defaults to v4. Specify `@5` for latest version.

### Step 3: Enable ESM (ES Modules) Syntax

In `package.json`, add:

```json
{
  "type": "module"
}
```

This allows you to use modern import/export syntax:
```javascript
import express from 'express';  // ✅ ESM (Modern)
// Instead of:
const express = require('express');  // ❌ CommonJS (Old)
```

### Step 4: Create NPM Scripts

In `package.json`:

```json
{
  "scripts": {
    "dev": "node server.js"
  }
}
```

Run with: `npm run dev`

---

## Server Setup

### Basic Server Implementation

```javascript
// server.js
import express from 'express';

// Create application instance
const app = express();

// Define port
const PORT = process.env.PORT || 4000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
```

### Explanation

| Line | Purpose |
|------|---------|
| `import express from 'express'` | Import Express framework |
| `const app = express()` | Create Express application instance |
| `process.env.PORT \|\| 4000` | Use environment variable or default to 4000 |
| `app.listen(PORT, callback)` | Start listening for requests on specified port |

**Run server:**
```bash
npm run dev
# Output: Server is listening on port 4000
```

**Test in browser:** Navigate to `http://localhost:4000`
- You'll get: **"Cannot GET /"** (No routes defined yet)

---

## Routing

### What is Routing?

Routing determines **which URL maps to which response**. It's crucial for building APIs.

### HTTP Methods

| Method | Purpose | Has Body |
|--------|---------|----------|
| **GET** | Fetch data | ❌ No |
| **POST** | Create data | ✅ Yes |
| **PUT** | Update entire resource | ✅ Yes |
| **PATCH** | Partial update | ✅ Yes |
| **DELETE** | Remove data | ❌ No |

### Basic Routing Syntax

```javascript
app.METHOD(PATH, HANDLER);
```

### Example Routes

#### 1. Root Route (Homepage)

```javascript
app.get('/', (req, res) => {
  res.send('Welcome to Coders Bank');
});
```

**Test:** `http://localhost:4000/`
**Response:** `Welcome to Coders Bank`

#### 2. Health Check Route

```javascript
app.get('/health', (req, res) => {
  res.send('I am healthy');
});
```

**Best Practice:** Always include `/health` endpoint for monitoring systems.

#### 3. API Route

```javascript
app.get('/api/hello', (req, res) => {
  res.send('Hello');
});
```

### Route Parameters (Dynamic URLs)

```javascript
app.get('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`User ID: ${userId}`);
});
```

**Test:** `http://localhost:4000/api/users/123`
**Response:** `User ID: 123`

### Query Parameters

Query parameters come after `?` in URL:

```javascript
app.get('/api/users', (req, res) => {
  console.log(req.query);  // Object of query parameters
  console.log(req.query.name);  // Get specific parameter
  
  res.json({ message: 'Success', data: req.query });
});
```

**Test:** `http://localhost:4000/api/users?name=Rakesh`

**Console output:**
```javascript
{ name: 'Rakesh' }
```

---

## Middleware

### What is Middleware?

**Middleware** are functions that execute **between receiving a request and sending a response**. They intercept requests and can:

- Check authentication tokens
- Validate request data
- Log request information
- Parse request body

### Middleware Flow Analogy

Think of airport security:

1. **Check passport** (Middleware 1)
2. **Check luggage** (Middleware 2)
3. **Board flight** (Handler/Route)

If security check fails at step 1, you never reach the flight.

### Visual Flow

```
Request
   ↓
[Middleware 1] → Process → Call next()
   ↓
[Middleware 2] → Process → Call next()
   ↓
[Route Handler] → Send Response
   ↓
Response
```

### Types of Middleware

#### 1. Global Middleware (Applies to ALL Routes)

```javascript
// Must be declared BEFORE routes
app.use(middleware);

// Built-in JSON parsing middleware
app.use(express.json());
```

#### 2. Route-Specific Middleware (Applies to SPECIFIC Routes)

```javascript
app.post('/api/users', authMiddleware, (req, res) => {
  // authMiddleware only runs for this route
});

// Multiple middlewares
app.post('/api/users', auth1, auth2, handler);
```

### Creating Custom Middleware

```javascript
const requestLogger = (req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  console.log(new Date().toLocaleTimeString());
  
  next();  // ⚠️ CRITICAL: Pass control to next middleware/handler
};

// Apply globally
app.use(requestLogger);

// Or apply to specific route
app.get('/api/users', requestLogger, (req, res) => {
  res.json({ message: 'Hello' });
});
```

### Common Middleware Use Cases

| Use Case | Example |
|----------|---------|
| **Authentication** | Verify JWT token |
| **Validation** | Check request data |
| **Logging** | Track all requests |
| **CORS** | Handle cross-origin requests |
| **Body parsing** | `express.json()` |

### ⚠️ Critical: The `next()` Function

If you create a custom middleware, **you MUST call `next()`** to continue the chain. Otherwise, the request will hang.

```javascript
// ❌ WRONG - Request hangs
const badMiddleware = (req, res, next) => {
  console.log('Processing...');
  // Missing next() call!
};

// ✅ CORRECT - Request continues
const goodMiddleware = (req, res, next) => {
  console.log('Processing...');
  next();  // Pass to next middleware
};
```

---

## Request & Response

### Request Object (req)

The `req` object contains information about the HTTP request:

```javascript
app.post('/api/users', (req, res) => {
  // Get request body (POST data)
  console.log(req.body);  // { name: 'Rakesh' }
  
  // Get query parameters
  console.log(req.query);  // { page: '1' }
  
  // Get URL parameters
  console.log(req.params);  // { id: '123' }
  
  // Get HTTP method
  console.log(req.method);  // 'POST'
  
  // Get request headers
  console.log(req.headers);
});
```

### Response Object (res)

The `res` object sends data back to client:

```javascript
// Send plain text
res.send('Hello World');

// Send JSON
res.json({ message: 'Success', data: {} });

// Send with status code
res.status(201).json({ message: 'Created' });

// Set response header
res.set('Content-Type', 'application/json');

// End response
res.end();
```

### Body Parsing Middleware

By default, Express doesn't parse JSON in request body. Enable it:

```javascript
app.use(express.json());
```

This middleware:
- Checks incoming `Content-Type: application/json`
- Parses JSON string to JavaScript object
- Populates `req.body`

**Without this middleware:**
```javascript
console.log(req.body);  // undefined ❌
```

**With this middleware:**
```javascript
console.log(req.body);  // { name: 'Rakesh' } ✅
```

---

## Status Codes & JSON Responses

### HTTP Status Codes

| Code | Meaning | Use Case |
|------|---------|----------|
| **200** | OK | Successful request |
| **201** | Created | Successful creation |
| **400** | Bad Request | Invalid input |
| **401** | Unauthorized | Missing/invalid auth |
| **403** | Forbidden | Not allowed |
| **404** | Not Found | Resource doesn't exist |
| **500** | Server Error | Internal error |

### Setting Status Code

```javascript
// Default: 200
res.send('Success');

// Explicitly set status
res.status(201).json({ message: 'User created' });

// Chain multiple methods
res.status(400).json({ error: 'Invalid data' });
```

### Response Headers

HTTP headers provide metadata about the response:

```javascript
res.send('Hello');
// Headers automatically set:
// Content-Type: text/plain
// X-Powered-By: Express
```

### JSON Response vs Text

```javascript
// Text response
res.send('Welcome to Bank');
// Header: Content-Type: text/plain

// JSON response
res.json({ message: 'Welcome' });
// Header: Content-Type: application/json
// Automatically converts object to JSON string
```

---

## Error Handling Middleware

### Why Error Handling?

In production, errors will occur (database failures, validation errors, etc.). You need to catch and format them properly.

### Global Error Handler

Express has special syntax for error handlers: **4 parameters instead of 3**.

```javascript
// ⚠️ MUST have exactly 4 parameters: (err, req, res, next)
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  // Set default status if not already set
  const statusCode = err.statusCode || 500;
  
  res.status(statusCode).json({
    error: err.message,
    statusCode: statusCode
  });
});
```

### Throwing Errors in Routes

```javascript
app.post('/api/users', (req, res, next) => {
  try {
    if (!req.body.name) {
      const error = new Error('Name is required');
      error.statusCode = 400;
      throw error;
    }
    
    res.json({ message: 'User created' });
  } catch (error) {
    next(error);  // Pass to error handler middleware
  }
});
```

### Error Handler Placement

```javascript
// Routes must be defined BEFORE error handler
app.get('/', (req, res) => {
  res.send('Home');
});

// Error handler MUST come LAST
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});
```

---

# JWT Authentication - DETAILED GUIDE

**JWT** stands for **JSON Web Token**. It's the standard way to implement authentication in modern APIs.

## Why JWT?

| Traditional Session | JWT Token |
|---|---|
| Server stores user data in memory/database | Token is self-contained, no server storage |
| Scales poorly (server memory) | Scales easily (stateless) |
| Session can be revoked on server | Token valid until expiration |
| Client sends session ID | Client sends token in Authorization header |

## JWT Structure

A JWT has **3 parts** separated by dots:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

Header.Payload.Signature
```

### Part 1: Header

```json
{
  "alg": "HS256",    // Algorithm for signing
  "typ": "JWT"       // Token type
}
```

### Part 2: Payload (Claims)

```json
{
  "id": "123",       // User ID
  "email": "user@example.com",
  "iat": 1516239022,        // Issued at
  "exp": 1516242622         // Expiration time
}
```

### Part 3: Signature

```
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret_key
)
```

The signature ensures the token hasn't been tampered with.

## JWT Implementation in Express

### Step 1: Install JWT Package

```bash
npm install jsonwebtoken
```

### Step 2: User Registration (Create User & Hash Password)

First, install bcrypt for password hashing:

```bash
npm install bcryptjs
```

```javascript
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());

// Simulated database
const users = [];

// User Registration
app.post('/api/auth/register', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    // Validate input
    if (!email || !password) {
      const error = new Error('Email and password required');
      error.statusCode = 400;
      throw error;
    }
    
    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      const error = new Error('User already exists');
      error.statusCode = 409;
      throw error;
    }
    
    // Hash password (bcrypt hashes + adds salt)
    const hashedPassword = await bcrypt.hash(password, 10);
    // 10 is salt rounds (higher = more secure but slower)
    
    // Save user
    const user = {
      id: Date.now().toString(),
      email,
      password: hashedPassword
    };
    users.push(user);
    
    res.status(201).json({
      message: 'User registered successfully',
      userId: user.id
    });
  } catch (error) {
    next(error);
  }
});
```

### Step 3: User Login (Generate JWT Token)

```javascript
app.post('/api/auth/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 401;
      throw error;
    }
    
    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const error = new Error('Invalid password');
      error.statusCode = 401;
      throw error;
    }
    
    // ✅ GENERATE JWT TOKEN
    const token = jwt.sign(
      { 
        id: user.id,
        email: user.email 
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { 
        expiresIn: '7d'  // Token valid for 7 days
      }
    );
    
    res.json({
      message: 'Login successful',
      token: token,
      user: {
        id: user.id,
        email: user.email
      }
    });
  } catch (error) {
    next(error);
  }
});
```

**jwt.sign() Parameters:**

| Parameter | Description |
|-----------|-------------|
| **Payload** | Object with user data (id, email) |
| **Secret** | Secret key for signing (keep safe!) |
| **Options** | `{ expiresIn: '7d' }` - token expires in 7 days |
| **Return** | JWT token string |

### Step 4: Verify JWT Token (Authentication Middleware)

**This is the crucial part for understanding JWT verification:**

```javascript
// Authentication Middleware
const authMiddleware = (req, res, next) => {
  try {
    // Extract token from Authorization header
    // Format: "Bearer <token>"
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      const error = new Error('No token provided');
      error.statusCode = 401;
      throw error;
    }
    
    // Split "Bearer <token>" to get just the token
    const token = authHeader.split(' ')[1];
    
    // ✅ VERIFY AND DECODE JWT TOKEN
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET || 'your-secret-key'
    );
    
    // Attach decoded user info to request object
    // Now route handlers can access req.userId
    req.userId = decodedToken.id;
    req.userEmail = decodedToken.email;
    
    // Continue to next middleware/handler
    next();
    
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      error.message = 'Token has expired';
      error.statusCode = 401;
    } else if (error.name === 'JsonWebTokenError') {
      error.message = 'Invalid token';
      error.statusCode = 401;
    }
    next(error);
  }
};
```

**What happens in jwt.verify():**

1. **Extracts** the 3 parts of token (header, payload, signature)
2. **Calculates** signature using the secret key
3. **Compares** calculated signature with token's signature
4. **Validates** expiration date (iat, exp)
5. **Throws error** if any check fails
6. **Returns decoded payload** if valid

### Step 5: Protected Routes

```javascript
// Public route - anyone can access
app.get('/api/public', (req, res) => {
  res.json({ message: 'Public data' });
});

// Protected route - only authenticated users
app.get('/api/users/:id', authMiddleware, async (req, res, next) => {
  try {
    // req.userId is now available (set by authMiddleware)
    const userId = req.params.id;
    
    // Verify user can only access their own data
    if (req.userId !== userId) {
      const error = new Error('Not authorized');
      error.statusCode = 403;
      throw error;
    }
    
    // Get user from "database"
    const user = users.find(u => u.id === userId);
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }
    
    res.json({
      id: user.id,
      email: user.email
      // Never send password in response!
    });
  } catch (error) {
    next(error);
  }
});

// Logout - invalidate token (server-side optional)
app.post('/api/auth/logout', authMiddleware, (req, res) => {
  // Since JWT is stateless, logout is just client-side
  // Delete token from client storage
  res.json({ message: 'Logged out successfully' });
});
```

## How to Use JWT with API Requests

### 1. Register User

```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{ "email": "user@example.com", "password": "pass123" }'
```

**Response:**
```json
{
  "message": "User registered successfully",
  "userId": "1704067200000"
}
```

### 2. Login (Get Token)

```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{ "email": "user@example.com", "password": "pass123" }'
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "1704067200000",
    "email": "user@example.com"
  }
}
```

### 3. Access Protected Route with Token

```bash
curl -X GET http://localhost:4000/api/users/1704067200000 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response:**
```json
{
  "id": "1704067200000",
  "email": "user@example.com"
}
```

## JWT Error Scenarios

| Error | Cause | Fix |
|-------|-------|-----|
| **No token provided** | Missing Authorization header | Include `Authorization: Bearer <token>` |
| **Invalid token** | Tampered or corrupted token | Generate new token via login |
| **Token expired** | Token's exp claim has passed | Use refresh token or login again |
| **Wrong signature** | Different secret key used | Use correct JWT_SECRET |

---

## Complete Working Example

```javascript
// server.js - Full JWT Example
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = express();
const users = [];

app.use(express.json());

const JWT_SECRET = 'your-super-secret-key-keep-safe';

// ============ AUTHENTICATION MIDDLEWARE ============
const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error('No token');
    
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// ============ ROUTES ============

// Register
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  users.push({ id: Date.now(), email, password: hashed });
  res.json({ message: 'Registered' });
});

// Login
app.post('/login', async (req, res) => {
  const user = users.find(u => u.email === req.body.email);
  if (!user) return res.status(401).json({ error: 'User not found' });
  
  const valid = await bcrypt.compare(req.body.password, user.password);
  if (!valid) return res.status(401).json({ error: 'Invalid password' });
  
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: '7d'
  });
  res.json({ token });
});

// Protected route
app.get('/profile', authMiddleware, (req, res) => {
  const user = users.find(u => u.id === req.userId);
  res.json({ id: user.id, email: user.email });
});

// Error handler
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

app.listen(4000, () => console.log('Server on port 4000'));
```

---

## Summary: Express.js Core Concepts

| Concept | Purpose | Key Points |
|---------|---------|-----------|
| **Routing** | Map URLs to handlers | Different HTTP methods (GET, POST, etc.) |
| **Middleware** | Process requests | Runs before route handlers |
| **Request/Response** | Handle data flow | req.body, res.json() |
| **Status Codes** | HTTP semantics | 200, 201, 400, 401, 500 |
| **Error Handling** | Catch exceptions | Global middleware with 4 params |
| **JWT Authentication** | Secure APIs | Token-based stateless auth |

---

## Resources

- **Official Express Docs:** https://expressjs.com
- **JWT Introduction:** https://jwt.io
- **JWT Video by CodersGyan:** https://youtu.be/IHc9iYj5wp0
- **Full Stack Course:** https://codersgyan.com/c/fullstack-js-engineer

---

## Key Takeaways

✅ Express is minimal but powerful for building APIs
✅ Middleware is essential for cross-cutting concerns
✅ Always use middleware in correct order (before routes, error handler last)
✅ JWT is stateless - no server-side session storage needed
✅ Always verify JWT tokens in protected routes
✅ Hash passwords with bcrypt, never store plain text
✅ Handle errors gracefully with proper status codes
✅ Follow HTTP conventions (GET for fetching, POST for creating)

---

**Created:** January 2026
**Based on:** Express.js Crash Course by CodersGyan (2024)
