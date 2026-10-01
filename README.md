# 💰 Personal Finance Tracker

A full-stack personal finance management application built with **Laravel REST API** and **React (Vite)**. Users can manage their income and expenses, organize transactions by category, and view financial summaries through an interactive dashboard.

## 🛠️ Tech Stack

### Backend

* Laravel 12
* PHP
* MySQL
* Laravel Sanctum
* Eloquent ORM
* REST API

### Frontend

* React
* Vite
* React Router
* Axios
* Tailwind CSS
* Recharts
* Lucide React

### Development & Testing

* Laragon
* Postman
* VS Code
* Git / GitHub

## ✨ Features

* 🔐 User registration, login, and logout
* 📂 Category CRUD
* 💸 Transaction CRUD
* 🔎 Filter transactions by category and date range
* 📊 Monthly income and expense summary
* 📈 Dashboard with financial statistics
* 📉 Income vs. expense charts
* 🥧 Expense breakdown by category
* 📱 Responsive UI
* 🔔 Toast notifications and loading/empty states
* 🧪 API testing with Postman

## 🚀 Setup

### Backend

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

Configure the MySQL database in `.env`:

```env
DB_DATABASE=finance_tracker
DB_USERNAME=root
DB_PASSWORD=
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### URLs

```text
Backend:  http://127.0.0.1:8000
Frontend: http://localhost:5173
```

## 📌 Project Structure

```text
personal-finance-tracker/
├── backend/     # Laravel REST API
└── frontend/    # React + Vite
```
