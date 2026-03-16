# 📋 MERN Form Builder

A full-stack Form Builder application built with **MongoDB, Express, React, and Node.js**.

---

## 📁 Project Structure

```
form-builder/
├── backend/
│   ├── config/
│   │   └── db.js               # MongoDB connection
│   ├── controllers/
│   │   └── formController.js   # CRUD logic
│   ├── models/
│   │   └── Form.js             # Mongoose schema
│   ├── routes/
│   │   └── formRoutes.js       # API routes
│   ├── .env                    # Environment variables
│   ├── package.json
│   └── server.js               # Express entry point
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── FormBuilder.js  # Drag & build interface
    │   │   ├── FormPreview.js  # Live form preview
    │   │   └── FieldItem.js    # Individual field editor
    │   ├── pages/
    │   │   ├── HomePage.js     # Lists all forms
    │   │   └── FormPage.js     # Create / Edit / Preview
    │   ├── services/
    │   │   └── api.js          # Axios API calls
    │   ├── App.js
    │   ├── App.css
    │   └── index.js
    ├── .env
    └── package.json
```

---

## 🚀 Getting Started

### 1. Backend Setup

```bash
cd backend
npm install
# Edit .env: set your MONGO_URI
npm run dev
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## ✨ Features

- ➕ Add 8 field types: Text, Email, Number, Textarea, Dropdown, Radio, Checkbox, Date
- ✏️ Edit field labels, placeholders, required status, options
- 🔼🔽 Reorder fields up/down
- 🗑 Delete fields
- 💾 Save forms to MongoDB
- 👁 Live preview with submit functionality
- 📱 Responsive design

## 🔌 API Endpoints

| Method | Endpoint         | Description        |
|--------|------------------|--------------------|
| GET    | /api/forms       | Get all forms      |
| GET    | /api/forms/:id   | Get form by ID     |
| POST   | /api/forms       | Create new form    |
| PUT    | /api/forms/:id   | Update form        |
| DELETE | /api/forms/:id   | Delete form        |
