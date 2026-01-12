# JWT Authentication - Deep Dive Explanation
## Complete Guide for Interview Preparation

---

## What is JWT? (Simple Explanation)

**JWT = JSON Web Token**

Imagine a **movie ticket**:
- **Ticket issued by cinema** = JWT token issued by server
- **Your name on ticket** = User data inside token
- **Special seal/barcode** = Digital signature
- **Date/time on ticket** = Expiration time
- **You show ticket at entrance** = You send token with each request

**No one can fake your ticket because of the official seal.** Similarly, no one can modify a JWT because of its digital signature.

---

## Why Use JWT Instead of Sessions?

### Traditional Session Approach

```
Client Side                          Server Side
┌─────────────┐                    ┌──────────────┐
│             │    Login Request   │              │
│   Browser   │──────────────────→ │ Check Password
│             │                    │ Create Session
│             │    Session ID      │ Store in RAM/DB
│             │ ←──────────────────│ {sessionId: 123}
└─────────────┘                    └──────────────┘

Problem: Server must store session info
- Memory usage increases
- Database queries on every request
- Scaling is hard (multiple servers need shared storage)
```

### JWT Approach (Better)

```
Client Side                          Server Side
┌─────────────┐                    ┌──────────────┐
│             │    Login Request   │              │
│   Browser   │──────────────────→ │ Check Password
│             │                    │ Create JWT Token
│             │    JWT Token       │ NO storage needed
│             │ ←──────────────────│ {token: "abc..."}
└─────────────┘                    └──────────────┘

Benefit: Server doesn't store anything
- No database queries for auth
- Scales easily (any server can verify)
- Token is self-contained with all user info
```

---

## JWT Token Structure (Most Important!)

A JWT token looks like:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ
```

It has **3 parts separated by dots (.):**

### Part 1: HEADER

**What it contains:** Algorithm and token type

```javascript
{
  "alg": "HS256",     // Signing algorithm
  "typ": "JWT"        // Token type
}
```

**Encoded to:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
```

### Part 2: PAYLOAD (Most Important - Contains User Data)

**What it contains:** Claims about the user

```javascript
{
  "id": "12345",              // User ID
  "email": "user@gmail.com",  // Email
  "name": "Rakesh",           // Name
  "iat": 1704067200,          // Issued At (when token created)
  "exp": 1704153600           // Expiration (when token expires)
}
```

**Encoded to:**
```
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0
```

**Important:** ANYONE can decode this! It's NOT encrypted, just encoded.

```javascript
// This is public - anyone can decode it
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1IiwibmFtZSI6IlJha2VzaCJ9.signature";

const decoded = jwt.decode(token);
console.log(decoded);
// {
//   "id": "12345",
//   "name": "Rakesh"
// }
```

**⚠️ NEVER put passwords or sensitive data in JWT payload!**

### Part 3: SIGNATURE (Most Important - Proof of Authenticity)

**How it's created:**

```javascript
// Step 1: Create signature
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  "secret-key-only-server-knows"
)

// Result:
// TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ
```

**This signature proves:**
- Token wasn't modified
- Server created it (has the secret)
- User can't fake it (doesn't know secret)

---

## JWT Authentication Step-by-Step

### Step 1️⃣: User Registration

```
Client sends:
{
  "email": "user@gmail.com",
  "password": "mypassword123"
}

Server does:
1. Check if user exists
2. Hash password using bcrypt
3. Save user to database
4. Return success message

Database now has:
{
  id: "12345",
  email: "user@gmail.com",
  password: "$2b$10$... (hashed, not plain)" ← Never store plain password!
}
```

**Code Example:**

```javascript
app.post('/api/auth/register', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    // Hash password - convert "mypassword123" to encrypted form
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Save to database
    const user = {
      id: Date.now(),
      email,
      password: hashedPassword  // ✅ Encrypted
    };
    
    res.status(201).json({ 
      message: 'User registered', 
      userId: user.id 
    });
  } catch (error) {
    next(error);
  }
});
```

### Step 2️⃣: User Login (Token Generation)

```
Client sends:
{
  "email": "user@gmail.com",
  "password": "mypassword123"
}

Server does:
1. Find user by email
2. Compare plain password with stored hashed password using bcrypt
3. If match: Generate JWT token
4. Return token to client

Client stores token in localStorage/sessionStorage
```

**Code Example:**

```javascript
app.post('/api/auth/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    // Find user in database
    const user = users.find(u => u.email === email);
    if (!user) throw new Error('User not found');
    
    // Compare password
    // bcrypt.compare does: hash(plainPassword) == storedHashedPassword
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error('Invalid password');
    
    // ✅ GENERATE JWT TOKEN
    const token = jwt.sign(
      {
        id: user.id,              // User ID in token
        email: user.email         // Email in token
      },
      'secret-key',              // Secret key (keep safe!)
      {
        expiresIn: '7d'           // Token expires in 7 days
      }
    );
    
    // ✅ Send token to client
    res.json({
      message: 'Login successful',
      token: token,  // Client saves this
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

**What happens in jwt.sign():**

```javascript
jwt.sign(payload, secret, options)

// Creates token with 3 parts:
// 1. Header: { alg: "HS256", typ: "JWT" }
// 2. Payload: { id: "12345", email: "user@gmail.com" }
// 3. Signature: HMACSHA256(header.payload, secret-key)

// Returns: "header.payload.signature"
```

### Step 3️⃣: Client Uses Token in Requests

```
Client stores token (from login response):
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1In0.signature..."

Client sends token in every request:
GET /api/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1In0.signature...

Format is:
Authorization: Bearer <token>
```

**In JavaScript/Frontend:**

```javascript
// After login, store token
const response = await fetch('/api/auth/login', {
  method: 'POST',
  body: JSON.stringify({ email, password })
});
const data = await response.json();
localStorage.setItem('token', data.token);  // ✅ Store token

// Send token with requests
const token = localStorage.getItem('token');
const response = await fetch('/api/profile', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`  // ✅ Send token
  }
});
```

### Step 4️⃣: Server Verifies Token (Authentication Middleware)

**This is the KEY part - Token Verification!**

```javascript
// Authentication Middleware - Runs before protected routes
const authMiddleware = (req, res, next) => {
  try {
    // Step 1: Extract token from Authorization header
    const authHeader = req.headers.authorization;
    // Format: "Bearer <token>"
    
    if (!authHeader) {
      throw new Error('No token provided');
    }
    
    // Step 2: Remove "Bearer " prefix to get just the token
    const token = authHeader.split(' ')[1];
    // "Bearer abc123.def456.ghi789" → "abc123.def456.ghi789"
    
    // ✅ Step 3: VERIFY TOKEN SIGNATURE
    // This is the most important part!
    const decodedToken = jwt.verify(
      token,
      'secret-key'  // Must be same secret used to sign token
    );
    
    // jwt.verify() does:
    // 1. Split token into 3 parts
    // 2. Recalculate signature using secret
    // 3. Compare calculated signature with token's signature
    // 4. Check if token has expired
    // 5. If valid: return decoded payload
    // 6. If invalid: throw error
    
    // Step 4: Extract user ID from token
    req.userId = decodedToken.id;
    req.userEmail = decodedToken.email;
    
    // Step 5: Continue to next middleware/route handler
    next();
    
  } catch (error) {
    // Token verification failed
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

### Step 5️⃣: Access Protected Routes

```javascript
// Protected route - only accessible with valid token
app.get('/api/profile', authMiddleware, (req, res) => {
  // If code reaches here, token was valid
  // authMiddleware set req.userId
  
  const userId = req.userId;  // From decoded token
  const user = users.find(u => u.id === userId);
  
  res.json({
    id: user.id,
    email: user.email
    // Never send password!
  });
});
```

---

## What Happens If Token is Invalid?

### Scenario 1: User Modifies Token

```
Original token:
eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEyMzQ1In0.abc123...

User modifies payload:
eyJhbGciOiJIUzI1NiJ9.eyJpZCI6Ijk5OTk5In0.abc123...
                            ↑ Changed 12345 to 99999

Server verification:
1. Recalculates signature with new payload
2. Gets: def456...
3. Compares with original signature: abc123...
4. They don't match!
5. Rejects token ❌

Result: "Invalid token - 401 Unauthorized"
```

### Scenario 2: Token is Expired

```
Token created: 2024-01-01 10:00:00
Token expires: 2024-01-08 10:00:00 (7 days later)

Request time: 2024-01-15 10:00:00
              (11 days later)

Server checks exp claim:
- Current time > Expiration time?
- Yes! Token is old
- Reject token ❌

Result: "Token expired - 401 Unauthorized"
        User must login again to get new token
```

### Scenario 3: Wrong Secret Key

```
Token signed with secret: "production-secret-key"

Server tries to verify with: "wrong-secret-key"

1. Recalculates signature with "wrong-secret-key"
2. Gets different signature
3. Doesn't match token's signature
4. Rejects token ❌

Result: "Invalid token - 401 Unauthorized"

This is why:
- Keep secret key safe!
- Never commit to GitHub!
- Use environment variables
```

---

## Common JWT Errors & Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| **No token provided** | Authorization header missing | Add `Authorization: Bearer <token>` header |
| **Invalid token** | Token was modified or corrupted | Login again to get new token |
| **Token expired** | Expiration time has passed | Login again or use refresh token |
| **JsonWebTokenError** | Token format is wrong or secret mismatch | Check token format and secret key |
| **Signature verification failed** | Different secret used for signing | Use same secret for signing and verification |

---

## JWT vs Session Comparison

| Aspect | JWT | Session |
|--------|-----|---------|
| **Storage** | Client-side | Server-side |
| **Scalability** | ✅ Easy (stateless) | ❌ Hard (needs shared storage) |
| **Database hits** | ❌ Less needed | ✅ Every request |
| **Revocation** | ⚠️ Hard (wait for expiry) | ✅ Immediate |
| **Mobile friendly** | ✅ Yes | ❌ Cookies-based |
| **Microservices** | ✅ Great | ❌ Complex |

---

## Best Practices for JWT

### 1. Store Secret Key Safely

```javascript
// ❌ WRONG - Never hardcode!
const token = jwt.sign(payload, 'abc123', { expiresIn: '7d' });

// ✅ CORRECT - Use environment variable
const token = jwt.sign(payload, process.env.JWT_SECRET, { 
  expiresIn: '7d' 
});
```

**In `.env` file:**
```
JWT_SECRET=your-super-long-secret-key-min-32-chars-recommended
JWT_EXPIRY=7d
```

### 2. Never Store Sensitive Data in Payload

```javascript
// ❌ WRONG - Password can be decoded by anyone
jwt.sign({
  id: user.id,
  email: user.email,
  password: user.password  // ❌ NEVER!
}, secret);

// ✅ CORRECT - Only non-sensitive data
jwt.sign({
  id: user.id,
  email: user.email,
  role: 'admin'  // ✅ OK
}, secret);
```

### 3. Use HTTPS for Production

```
HTTP:  Anyone can intercept token ❌
HTTPS: Token encrypted in transit ✅
```

### 4. Set Reasonable Expiration

```javascript
// Short expiration (safer)
jwt.sign(payload, secret, { expiresIn: '15m' })  // 15 minutes

// Long expiration (convenient)
jwt.sign(payload, secret, { expiresIn: '30d' })  // 30 days

// Recommendation:
// Access token: 15 minutes (short)
// Refresh token: 30 days (long) - separate mechanism
```

### 5. Implement Refresh Tokens (Advanced)

```javascript
// Login returns 2 tokens
{
  accessToken: "short-lived-token",      // 15 min
  refreshToken: "long-lived-token"       // 30 days
}

// When access token expires:
POST /api/auth/refresh
Body: { refreshToken: "..." }

// Server returns new access token
{
  accessToken: "new-short-lived-token"
}
```

---

## Interview Questions on JWT

### Q1: How is JWT different from sessions?

**Answer:**
- JWT is stateless (no server storage), sessions are stateful (server stores data)
- JWT scales easily, sessions need shared storage for multiple servers
- JWT is self-contained with all user info, sessions need database lookups
- JWT can't be revoked immediately, sessions can be deleted anytime

### Q2: Why can't you modify a JWT token?

**Answer:**
Token has 3 parts: header.payload.signature
- If you modify payload, signature becomes invalid
- Signature is created by hashing header+payload with a secret key
- Only server knows the secret
- When verifying, server recalculates signature - if it doesn't match, token is rejected

### Q3: What's inside JWT payload?

**Answer:**
User data that doesn't need to be secret:
- User ID
- Email
- Role (admin, user, etc.)
- Issued time (iat)
- Expiration time (exp)

Never put:
- Passwords
- Credit card numbers
- Personal sensitive information

### Q4: How do you verify a JWT token?

**Answer:**
```javascript
jwt.verify(token, secret)
```
It:
1. Splits token into 3 parts
2. Recalculates signature using secret
3. Compares with original signature
4. Checks expiration
5. Returns decoded payload if valid, throws error if invalid

### Q5: What happens after token expires?

**Answer:**
- User gets 401 Unauthorized error
- User must login again to get new token
- OR use refresh token to get new access token (advanced)

---

## Complete Code Example (Copy-Paste Ready)

```javascript
// server.js
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = express();
const users = [];
const JWT_SECRET = 'your-secret-key-change-in-production';

app.use(express.json());

// ============ MIDDLEWARE ============
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
app.post('/api/auth/register', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    const hashed = await bcrypt.hash(password, 10);
    const user = {
      id: Date.now().toString(),
      email,
      password: hashed
    };
    users.push(user);
    
    res.status(201).json({ message: 'Registered', userId: user.id });
  } catch (err) {
    next(err);
  }
});

// Login
app.post('/api/auth/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    const user = users.find(u => u.email === email);
    if (!user) throw new Error('User not found');
    
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error('Invalid password');
    
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.json({ token, user: { id: user.id, email: user.email } });
  } catch (err) {
    next(err);
  }
});

// Protected route
app.get('/api/profile', authMiddleware, (req, res) => {
  const user = users.find(u => u.id === req.userId);
  res.json({ id: user.id, email: user.email });
});

// Error handler
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({ error: err.message });
});

app.listen(4000, () => console.log('Server on 4000'));
```

---

## Quick Reference Cheat Sheet

```javascript
// Generate token
jwt.sign(payload, secret, { expiresIn: '7d' })

// Verify token
jwt.verify(token, secret)

// Decode without verification (public)
jwt.decode(token)

// Extract token from header
const token = req.headers.authorization?.split(' ')[1]

// Hash password
await bcrypt.hash(plainPassword, 10)

// Compare passwords
await bcrypt.compare(plainPassword, hashedPassword)

// Send token to client
res.json({ token: token })

// Send Authorization header in requests
fetch('/api/profile', {
  headers: { 'Authorization': `Bearer ${token}` }
})
```

---

## Summary

1. **JWT = 3 parts:** Header.Payload.Signature
2. **Payload contains user data** - anyone can decode
3. **Signature proves authenticity** - only server can verify
4. **Flow:** Register → Login (get token) → Send token in requests → Middleware verifies → Access protected routes
5. **Verification:** jwt.verify() recalculates signature and compares
6. **Benefits:** Stateless, scalable, mobile-friendly
7. **Keep safe:** Secret key, don't store passwords/sensitive data

Good luck with your interviews! 🚀
