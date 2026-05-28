# RBAC Authentication System

A comprehensive JWT Authentication and Role-Based Access Control (RBAC) system built using a Spring Boot backend and a Vite React + TypeScript frontend.

## Tech Stack
- **Backend**: Java 17, Spring Boot, Spring Security, JWT, MySQL, MapStruct, Lombok, Swagger / OpenAPI
- **Frontend**: React 19, TypeScript, Vite, TailwindCSS, React Query, Axios, React Hook Form

## Features
- **User Registration**: Custom registration with role selection (`USER` or `ADMIN`) and client-side credential validations.
- **JWT Authentication**: Secure login and token-based stateful/stateless sessions using HS256 signature algorithms.
- **Role-Based Security**: Role-based access control filters restricting API endpoints on the server.
- **Route Guards**: Secure frontend routing restricting dashboard components to authenticated users.
- **Conditional UI Rendering**: Displays custom resource view cards according to authenticated user authority levels.
- **Swagger Documentation**: Interactive OpenAPI Swagger dashboard to test backend routes easily.
- **Workarounds**: Built-in 404 router redirects to run React Router smoothly on GitHub Pages subfolder hosting.

## Live Demo
- **Frontend**: https://yourusername.github.io/rbac-frontend/
- **Backend Swagger (local)**: http://localhost:8080/swagger-ui.html

---

## Local Setup — Backend

1. Navigate to the root directory.
2. Create the MySQL database:
   ```sql
   CREATE DATABASE rbac_db;
   ```
3. Update [application.properties](src/main/resources/application.properties) with your database credentials and a 256-bit Base64 JWT secret:
   ```properties
   spring.datasource.username=root
   spring.datasource.password=your_password
   jwt.secret=dGhpcy1pcy1hLXNlY3VyZS0yNTYtYml0LXNlY3JldC1rZXktZm9yLWp3dC1hdXRoZW50aWNhdGlvbg==
   ```
4. Build and boot the server:
   ```bash
   mvn spring-boot:run
   ```
5. Test and view documentation at: **http://localhost:8080/swagger-ui.html**

---

## Local Setup — Frontend

1. Navigate to the frontend directory:
   ```bash
   cd rbac-frontend
   ```
2. Create your `.env` configuration file:
   ```env
   VITE_API_BASE_URL=http://localhost:8080
   ```
3. Install dependencies and start the development server:
   ```bash
   npm install
   npm run dev
   ```
4. Open your browser to: **http://localhost:5173**

---

## API Endpoints

| Method | Endpoint | Access / Authority | Description |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/auth/register` | Public | Register new credentials with role mapping. |
| **POST** | `/api/auth/login` | Public | Verify credentials and yield a secure JWT. |
| **GET** | `/api/public` | Public | Accessible resource with no authentication. |
| **GET** | `/api/user` | `USER`, `ADMIN` | Standard resource secured to logged-in users. |
| **GET** | `/api/admin` | `ADMIN` only | Restricted administrative authority dashboard. |

## Screenshots
*[Add screenshots here]*
