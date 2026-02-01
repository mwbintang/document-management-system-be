# 📁 Document Management System – Backend

Backend service for the **Document Management System**, built with **Express + TypeScript + MySQL**.  
This API handles file & folder nodes, uploads, downloads, pagination, sorting, and Swagger documentation.

---

## 👤 Author

**Bintang Muhammad Wahid**

---

## 🚀 Tech Stack

- **Node.js** (v24.x)
- **Express** (v5)
- **TypeScript**
- **MySQL** (`mysql2`)
- **Multer** (file uploads)
- **Swagger** (`swagger-jsdoc`, `swagger-ui-express`)
- **ESLint**

---

## Project Structure

document-management-system-be/
├─ node_modules/
├─ uploads/
├─ src/
│  ├─ config/
│  │  ├─ env.ts
│  │  └─ swagger.ts
│  │
│  ├─ constants/
│  │  └─ enum.ts
│  │
│  ├─ db/
│  │  ├─ migrations/
│  │  │  ├─ 001_create_users.ts
│  │  │  ├─ 002_create_nodes.ts
│  │  │  └─ index.ts
│  │  │
│  │  ├─ seeders/
│  │  │  ├─ 001_users.seed.ts
│  │  │  └─ index.ts
│  │  │
│  │  └─ connection.ts
│  │
│  ├─ errors/
│  │  └─ AppError.ts
│  │
│  ├─ helpers/
│  │  └─ multer.ts
│  │
│  ├─ interfaces/
│  │  └─ nodes.ts
│  │
│  ├─ middlewares/
│  │  └─ errorHandler.ts
│  │
│  ├─ models/
│  │  ├─ node.model.ts
│  │  └─ user.model.ts
│  │
│  ├─ modules/
│  │  └─ nodes/
│  │     └─ v1/
│  │        ├─ node.controller.ts
│  │        ├─ node.route.ts
│  │        └─ node.service.ts
│  │
│  ├─ repositories/
│  │  └─ node.repository.ts
│  │
│  ├─ utils/
│  │  └─ pagination.ts
│  │
│  ├─ app.ts
│  ├─ index.routes.ts
│  └─ server.ts
│
├─ .env
├─ .env.example
├─ package.json
├─ package-lock.json
├─ tsconfig.json
├─ README.md
├─ .eslintrc.js
└─ .gitignore


## 📦 Installation

```bash
npm install
```

---

## Environment Variables

This project **does not hardcode environment values**.

All environment variables are loaded from `.env`.  
Please refer to **`.env.example`** as the source of truth.

### `.env.example`

```bash
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=document_management_system

NODE_ENV=development
PORT=3001
SERVER_URL=http://localhost:3001
```

---

## 🗄️ Database
Run migrations
```bash
npm run migrate
```

Seed database
```bash
npm run seed
```

---

## ▶️ Running the App

Development:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Production:
```bash
npm start
```

---

### ✅ Quick Start Summary

```bash
npm install
cp .env.example .env
npm run migrate
npm run seed
npm run dev
```


That’s it 🚀

---

## 📚 API Documentation (Swagger)

Swagger UI is available at:

```bash
GET /api-docs
```

---

What’s documented:

- **Nodes** (files & folders)

- **Pagination**

- **Sorting** (orderBy, orderDirection)

- **File upload & download**

- **CRUD operations**

## 🧹 Linting

This project uses ESLint with TypeScript support to enforce:

Consistent code style

Clean imports

Type safety best practices

Reduced runtime bugs

Run lint check:

```bash
npm run lint
```

Auto-fix lint issues:

```bash
npm run lint:fix
```

---

## 📌 Notes

Swagger server URL is driven by .env

Type-safe controllers & services

Ready for frontend integration