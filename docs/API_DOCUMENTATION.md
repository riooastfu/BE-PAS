# Employee Management API

A comprehensive REST API for employee management system with attendance tracking, leave management, activity reporting, and health monitoring.

## 🚀 Features

- **Authentication & Authorization** - JWT-based auth with role-based access control
- **Attendance Management** - Mobile check-in/out with GPS and image verification
- **Leave Management** - Complete leave request and approval workflow
- **Activity Reporting** - Daily activity and health report tracking
- **Employee Dashboard** - Birthday notifications and app version management
- **Security** - Multi-layer authentication with password expiration policy

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
- [Security](#security)
- [Error Handling](#error-handling)
- [Contributing](#contributing)

## 🛠 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Database (MySQL/PostgreSQL)
- Redis (for session management)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/employee-management-api.git

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Run database migrations
npm run migrate

# Start the server
npm start
```

### Environment Variables

```env
NODE_ENV=development
PORT=3000
JWT_SECRET=your_jwt_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
DB_HOST=localhost
DB_PORT=5432
DB_NAME=employee_db
DB_USER=your_db_user
DB_PASS=your_db_password
```

## 🔐 Authentication

All API endpoints (except auth routes) require authentication using JWT tokens.

### Login Flow

```javascript
// 1. Login
POST /auth/login
{
  "namauser": "username",
  "password": "password"
}

// Response
{
  "status": "success",
  "data": {
    "accessToken": "jwt_token",
    "refreshToken": "refresh_token",
    "user": { /* user data */ }
  }
}

// 2. Use token in headers
Authorization: Bearer <access_token>

// 3. Refresh token when expired
POST /auth/refresh-token
{
  "refreshToken": "refresh_token"
}
```

### Security Features

- **Password Policy**: 8+ characters with uppercase, lowercase, numbers, and symbols
- **Token Expiry**: Access tokens (7 days), Refresh tokens (14 days)
- **Password Rotation**: Mandatory 3-month password change
- **Role-Based Access**: Granular permission control

## 📡 API Endpoints

### Authentication

| Method | Endpoint               | Description          |
| ------ | ---------------------- | -------------------- |
| POST   | `/auth/login`          | User login           |
| POST   | `/auth/refresh-token`  | Refresh access token |
| POST   | `/auth/logout`         | User logout          |
| POST   | `/auth/password/reset` | Reset password       |
| POST   | `/auth/login/log`      | Create login log     |

### Dashboard

| Method | Endpoint             | Description            |
| ------ | -------------------- | ---------------------- |
| GET    | `/home/birthday/:pt` | Get birthday employees |
| GET    | `/home/version`      | Get app version        |

### Leave Management

| Method | Endpoint                          | Description               |
| ------ | --------------------------------- | ------------------------- |
| GET    | `/cuti/harilibur`                 | Get public holidays       |
| GET    | `/cuti/id/:id_cuti`               | Get leave by ID           |
| GET    | `/cuti/nik/:nik`                  | Get leave by employee NIK |
| POST   | `/cuti/detail`                    | Create leave request      |
| PATCH  | `/cuti/detail/atasan/approve/:id` | Approve leave             |
| PATCH  | `/cuti/detail/atasan/reject/:id`  | Reject leave              |

### Attendance

| Method | Endpoint               | Description              |
| ------ | ---------------------- | ------------------------ |
| GET    | `/absensi/maps/radius` | Get attendance locations |
| GET    | `/absensi/:pin`        | Get attendance history   |
| POST   | `/absensi/masuk`       | Check-in (with image)    |
| POST   | `/absensi/keluar`      | Check-out (with image)   |

### Activity Reports

| Method | Endpoint                        | Description          |
| ------ | ------------------------------- | -------------------- |
| GET    | `/aktivitas/harian/:id_laporan` | Get daily reports    |
| GET    | `/aktivitas/kesehatan/nik/:nik` | Get health reports   |
| POST   | `/aktivitas/harian`             | Create daily report  |
| POST   | `/aktivitas/kesehatan`          | Create health report |
| DELETE | `/aktivitas/harian/:id_laporan` | Delete daily report  |

### Profile

| Method | Endpoint        | Description      |
| ------ | --------------- | ---------------- |
| GET    | `/profile/user` | Get user profile |

## 📝 Request/Response Examples

### Create Leave Request

```javascript
POST /cuti/detail
Content-Type: application/json
Authorization: Bearer <access_token>

{
  "id_cuti": "EMP001_2024",
  "tanggal_mulai": "2024-06-01",
  "tanggal_berakhir": "2024-06-03",
  "keterangan": "Family vacation",
  "atasan": "MGR001",
  "pic": "EMP002"
}
```

### Attendance Check-in

```javascript
POST /absensi/masuk
Content-Type: multipart/form-data
Authorization: Bearer <access_token>

FormData:
- image: [file]
- pin: "12345"
- scan_date: "2024-05-23T08:00:00Z"
- coordinate: "-6.200000,106.816666"
```

## 🛡️ Security

### Middleware Stack

- **Token Verification**: Validates JWT access tokens
- **Password Expiration**: Enforces 3-month password rotation
- **Role-Based Access**: Controls resource access by user role
- **File Upload Security**: Validates file types and sizes

### Data Protection

- **Input Validation**: Zod schema validation
- **SQL Injection Prevention**: Sequelize ORM with parameterized queries
- **Image Processing**: Sharp.js for secure image handling
- **Time Synchronization**: Prevents timestamp manipulation

## ❌ Error Handling

### Standard Error Response

```json
{
  "status": "fail|error",
  "message": "Error description",
  "code": "ERROR_CODE",
  "errors": {} // Validation details
}
```

### Common Error Codes

- `NO_TOKEN_PROVIDED` (401) - Missing authorization header
- `TOKEN_EXPIRED` (401) - Token has expired
- `PASSWORD_EXPIRED` (403) - Password needs update
- `INSUFFICIENT_LEAVE_BALANCE` (400) - Not enough leave days
- `VALIDATION_ERROR` (422) - Input validation failed

## 📊 Response Formats

### Success Response

```json
{
  "status": "success",
  "message": "Operation successful",
  "data": {
    /* response data */
  }
}
```

### Pagination (where applicable)

```json
{
  "status": "success",
  "data": {
    /* results */
  },
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

## 📚 API Documentation

For detailed API documentation with request/response examples, validation rules, and business logic:

- **Full Documentation**: [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- **Postman Collection**: [pastimobile.postman_collection.json](./pastimobile.postman_collection.json)

## 🚀 Deployment

### Docker

```bash
# Build image
docker build -t employee-api .

# Run container
docker run -p 3000:3000 --env-file .env employee-api
```

### Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Configure proper database connection
- [ ] Set up SSL/TLS certificates
- [ ] Configure reverse proxy (Nginx)
- [ ] Set up monitoring and logging
- [ ] Implement rate limiting
- [ ] Configure backup strategy

## 🔧 Built With

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Sequelize** - ORM for database operations
- **JWT** - Authentication tokens
- **Multer** - File upload handling
- **Sharp** - Image processing
- **Zod** - Schema validation

## 📞 Support

For support and questions:

- **Email**: rio.alaska123@gmail.com
- **Documentation**: [Full API Docs](./API_DOCUMENTATION.md)

---

Made with ❤️ by riooastfu
