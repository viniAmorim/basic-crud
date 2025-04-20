## 🧠 Basic CRUD API

This is a RESTful API built with **Node.js**, **TypeScript**, and **Express**, implementing a complete user management system with authentication, admin authorization, and API documentation using Swagger.

---

### 🚀 Technologies

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [TypeORM](https://typeorm.io/)
- [SQLite or Postgres](https://www.sqlite.org/index.html)
- [JWT](https://jwt.io/)
- [TSyringe](https://github.com/microsoft/tsyringe)
- [Swagger](https://swagger.io/)
- [Jest](https://jestjs.io/) — Automated tests
- ESLint, Prettier — Code formatting and linting

---

### 📦 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/your-repo.git
cd your-repo

# Install dependencies
npm install

# Configure the database
cp ormconfig.example.json ormconfig.json
# Edit the config according to your environment

# Run migrations
npm run typeorm migration:run
```

---

### ▶️ Running the project

```bash
npm run dev
```

Server available at: `http://localhost:3333`

---

### ✅ Running tests

```bash
npm run test
```

---

### 📑 Main Routes

| Method | Route            | Description                  | Middleware                    |
|--------|------------------|------------------------------|-------------------------------|
| POST   | `/users`         | Create a new user            | —                             |
| GET    | `/users`         | List all users               | —                             |
| PUT    | `/users/:id`     | Update a user                | `ensureAuthenticated`         |
| DELETE | `/users/:id`     | Delete a user                | `ensureAuthenticated`, `ensureAdmin` |
| POST   | `/sessions`      | User login/authentication    | —                             |

---

### 🔐 Authentication

Uses **JWT**. After authenticating with `/sessions`, include the token in the Authorization header for protected routes:

```
Authorization: Bearer <token>
```

---

### 📘 API Documentation

Access Swagger-generated documentation at:

```
http://localhost:3333/api-docs
```

---

### 📁 Project Structure

```
src/
├── modules/
│   └── accounts/
│       ├── useCases/
│       ├── repositories/
│       ├── dtos/
│       └── infra/
├── shared/
│   ├── container/
│   ├── errors/
│   ├── infra/
│   └── utils/
```

---

### 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit PRs. 💙

---

### 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.