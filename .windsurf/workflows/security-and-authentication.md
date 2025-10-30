---
description: JWT and OWASP
auto_execution_mode: 1
---

#JWT Authentication Workflow for Windsurf News App
name: Setup JWT Authentication for News App Backend
description: Implement user login, JWT token issuance, and protect news API routes
steps:

  - name: Create login API endpoint
    description: Implement /login endpoint to validate credentials and issue JWT token
    run:
        # Accept username and password in request body
        # Validate credentials against user database
        # If valid, generate JWT signed with server secret,
        include userId and expiry (e.g., 1h)
        # Respond with token JSON { "token": "<jwt_token>" }

  - name: Implement JWT validation middleware
    description: Middleware to verify JWT token on protected routes
    run:
        # Extract JWT token from Authorization header
        (Bearer token)
        # Verify token signature and expiration
        # If valid, attach user info to request object
        # If invalid or missing, respond with 401 Unauthorized error

  - name: Secure news-related API routes
    description: Apply JWT middleware to routes like
    /top-headlines/, /user-preferences/, etc.
    run:
        # Protect endpoints so only authenticated users can
        access personalized news data

  - name: Integrate JWT Auth in News App Frontend (React)
    description: Manage user login and include JWT token in API requests
    steps:

      - name: Build login form and submission handler
        description: Create React login form that sends
        credentials to backend and stores JWT token securely (e.g.,
        localStorage)

      - name: Attach token to news API requests
        description: For authenticated endpoints, include JWT
        token in HTTP Authorization header
      -name: Apply OWASP Top-10 Security Checks on Auth Code
       description: Automate security audit of backend and frontend auth components
       steps:
      -name: Check for injection vulnerabilities in login endpoint
       description: Ensure SQL/NoSQL injection is prevented via prepared statements or ORM safe queries
    run:
        # Validate all user inputs are parameterized
        # Reject raw string concatenation in DB queries

      -name: Confirm JWT secrets stored in `.env` and not hardcoded
       description: Enforce use of environment variables for JWT secret and never commit secrets
       run:
        # Scan codebase: grep -r "secret" . --exclude-dir=node_modules
        # Fail build if secret found in source

      -name: Validate input sanitization and rate limiting to prevent brute-force
       description: Sanitize inputs + implement login rate limiting (e.g., 5 attempts per IP per 15min)
       run:
        # Use express-rate-limit or equivalent
        # Trim & escape username/email fields

      -name: Auto-fix identified issues where possible
       description: Apply automated fixes using linters or security tools (e.g., npm audit fix, ESLint security rules)
    run:
        npm audit fix --force
        # Run secure code analysis tools

       -name: Final Security Audit and Testing
        description: Verify authentication flow and security posture
        steps:
       -name: Test login flow end-to-end and token validation
        description: Simulate valid/invalid logins, expired tokens, malformed JWTs

       -name: Confirm restricted news API routes reject unauthorized requests
        description: Call protected endpoints without token → expect 401

       -name: Ensure no OWASP-flagged security issues remain
        description: Run full OWASP ZAP / dependency-check scan
        # Fail pipeline if critical vulnerabilities detected
