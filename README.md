# Tienda Backend 2 (Entrega 1) — Diseño y Arquitectura Backend

Backend de ecommerce desarrollado en **Node.js + Express + MongoDB (Mongoose)**, adaptado para la **Entrega N°1** del curso “Diseño y Arquitectura Backend”.

Incluye:
- CRUD de usuarios con **modelo User**
- Encriptación de contraseña con **bcrypt**
- Login con **JWT**
- Autenticación con **Passport JWT**
- Endpoint protegido **/api/sessions/current** (valida usuario logueado mediante cookie con JWT)

---

## Tecnologías
- Node.js
- Express
- MongoDB + Mongoose
- Passport + passport-jwt
- jsonwebtoken
- bcrypt
- dotenv
- cookie-parser

---

## Instalación y ejecución

### 1) Clonar repositorio
```bash
git clone https://github.com/Alan-Bajas/tienda-backend-2.git
cd tienda-backend-2
