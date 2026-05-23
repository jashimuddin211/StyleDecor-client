# StyleDecor - Smart Home & Ceremony Decoration Booking System

## Project Purpose

StyleDecor is a modern web-based appointment and decoration service management platform designed for home and ceremony decoration businesses. Users can browse decoration packages, book consultation or on-site decoration services, make secure payments, and track project progress in real time.

The system also provides separate dashboards for users, decorators, and admins to manage services, bookings, payments, project assignments, and analytics efficiently.

---

## Live Website

Client Side Live Link: ``

Server Side Live Link: ``

---

## Features

### Authentication & Authorization

* Email and password authentication
* Google social login
* JWT-based authentication
* Role-based dashboard routing
* Persistent private routes after reload
* Profile image upload using ImageBB or Cloudinary

### Home Page

* Animated hero section using Framer Motion
* Dynamic services section loaded from server
* Top decorators section with ratings and specialties
* React Leaflet coverage map section
* Responsive modern UI using DaisyUI and Tailwind CSS

### Services System

* View all decoration services
* Search services by name
* Filter services by category
* Filter services by budget range
* View service details page
* Book decoration services
* Booking modal/form with auto-filled user information

### User Dashboard

* My profile section
* My bookings management
* Booking update and cancellation
* Payment history
* Stripe payment integration
* Booking status tracking

### Admin Dashboard

* Manage decorators (CRUD)
* Manage services and packages (CRUD)
* Manage bookings
* Assign decorators to projects
* Approve or disable decorator accounts
* Revenue monitoring
* Analytics charts and booking statistics

### Decorator Dashboard

* View assigned projects
* View daily schedules
* Update project status step-by-step
* Earnings summary
* Payment history checking

### Booking Workflow

* Assigned
* Planning Phase
* Materials Prepared
* On the Way to Venue
* Setup in Progress
* Completed

### Additional Functionalities

* Global loading spinner
* Global error page
* Toast notifications
* Responsive design for mobile, tablet, and desktop
* Pagination support
* Sorting by booking date and status
* Secure environment variables
* Protected API routes with JWT verification

---

## Technologies Used

### Frontend

* React
* React Router DOM
* Tailwind CSS
* DaisyUI
* Axios
* Firebase Authentication
* Framer Motion
* React Leaflet
* React Toastify
* Stripe JS
* Recharts

### Backend

* Node.js
* Express.js
* MongoDB
* JWT
* Stripe Payment Gateway
* CORS
* dotenv

---

## NPM Packages Used

### Client Side Packages

```bash
react
react-router-dom
axios
firebase
react-toastify
framer-motion
react-leaflet
leaflet
stripe
@stripe/react-stripe-js
@stripe/stripe-js
recharts
tailwindcss
daisyui
```

### Server Side Packages

```bash
express
mongodb
cors
dotenv
jsonwebtoken
stripe
```

---

## Environment Variables

### Client Side (.env)

```env
VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_auth_domain
VITE_projectId=your_project_id
VITE_storageBucket=your_storage_bucket
VITE_messagingSenderId=your_sender_id
VITE_appId=your_app_id
VITE_IMAGE_HOSTING_KEY=your_imagebb_key
VITE_STRIPE_PK=your_stripe_publishable_key
```

### Server Side (.env)

```env
DB_USER=your_database_user
DB_PASS=your_database_password
ACCESS_TOKEN_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

---

## Installation & Setup

### Clone the repositories

```bash
git clone your-client-repository-link
git clone your-server-repository-link
```

### Install dependencies

```bash
npm install
```

### Run client

```bash
npm run dev
```

### Run server

```bash
nodemon index.js
```

---

## Admin Features

* Manage users and decorators
* Assign decorators to services
* Manage all bookings
* Revenue analytics
* Service demand monitoring

---

## User Features

* Browse services
* Book decoration services
* Make payments
* Track booking status
* Cancel bookings

---

## Decorator Features

* Manage assigned projects
* Update project progress
* Check schedules
* View earnings summary

---

## Security Features

* JWT token verification
* Protected routes
* Environment variable protection
* Firebase authentication
* Secure payment integration with Stripe

---

## Deployment Notes

* Firebase authorized domains configured
* Environment variables secured
* No CORS or reload issues
* Fully responsive deployed application

---

## Developer

Developed as part of Assignment Category 07 - StyleDecor Project.
