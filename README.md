# Tech Sea Server

## Introduction

TechSea is a modern blogging platform built with the MERN stack, designed for tech enthusiasts to share, explore, and engage with technology-related content. It features blog creation, commenting, reactions, category-based browsing, and user management. The platform is built with scalability and real-world project standards in mind, showcasing clean architecture, modular backend APIs, and a responsive frontend UI.

## Technologies :

- Typescript
- Node.js & Express.js
- MongoDB & Mongoose
- Cloudinary (Image Storage)
- JWT (Authentication & Authorization)
- Passport js (credential and google Login)
- Nodemailer (Email sending)

## Features

### User Features

- Register and log in securely with credential and google.
- Password reset system. Verify Account By Email if used credential for register
- Read blogs by categories and tags.
- React (like/unlike) to blogs.
- Comment on blog posts.
- Create, update, and delete own blogs.
- Upload images for blog posts.

### Admin Features

- Manage all blogs .
- Monitor and moderate comments and reactions.
- View platform-wide statistics (total blogs, users, categories).

## Installation & Setup :

### Clone the Repository:

```plain
git clone https://github.com/md-suhag/tech-sea-server.git
```

### Install Dependencies:

```markdown
npm install
```

### Environment Variables:

- Create a `.env` file in the root directory.
- Add the following environment variables:

```env
  FRONTEND_URL= your fronted url
PORT=4000
DB_URL= your database url
NODE_ENV= your env mode

BCRYPT_SALT_ROUND= any salt round number like 10, 12, 8

JWT_ACCESS_SECRET= your access secret
JWT_ACCESS_EXPIRES= your access expires
JWT_REFRESH_SECRET= your refresh secret
JWT_REFRESH_EXPIRES= your refresh expires
ACTIVATION_SECRET = your activation secret

SUPER_ADMIN_EMAIL= your admin email
SUPER_ADMIN_PASSWORD= your admin password

EXPRESS_SESSION_SECRET= your session secret

GOOOGLE_CLIENT_SECRET= your client secret
GOOGLE_CLIENT_ID= your client id
GOOGLE_CALLBACK_URL= your callback url



SMTP_HOST= smtp.gmail.com
SMTP_PORT= 465
SMTP_USER= your smtp email
SMTP_PASS= your smtp password
SMTP_FROM= your smtp email


CLOUDINARY_CLOUD_NAME= your cloudinary name
CLOUDINARY_API_KEY= your cloudinary api key
CLOUDINARY_API_SECRET= your cloudinary api secret


```

### Run the Application:

```markdown
npm run dev
```

<!-- ## ER Diagram

<img src=""/> -->

## 📦 API Endpoints

Click this link to see details postman api doc :
<a href="https://documenter.getpostman.com/view/34222191/2sB3Hkqfvg" target="_blank">postman api documentation</a>

## Error Handling

The application handles errors using global error handling with appropriate error messages and status codes.

### Thank you. Keep Creating.
