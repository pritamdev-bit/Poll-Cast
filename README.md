# Poll App - Full Stack Real-Time Polling Application

A modern, real-time polling application built with React, Express, and MongoDB. Users can create, share, and vote on polls with live result updates.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)

## 🎯 Project Overview

Poll App is a full-stack web application that enables users to:
- Create interactive polls with custom options
- Vote on active polls in real-time
- View live poll results
- Track poll analytics
- Manage poll lifecycle (Draft, Live, Closed states)

The application uses WebSocket technology for real-time updates, ensuring all connected users see poll results instantly as votes are cast.

## ✨ Features

### Frontend Features
- **User Authentication**: Clerk-powered sign-in/sign-up with SSO support
- **Create Polls**: User-friendly interface to create polls with multiple options
- **Vote on Polls**: Cast votes on active polls with smooth UX
- **Real-time Updates**: Live poll result updates using Socket.IO
- **Dashboard**: View all created polls with statistics (votes, engagement, average time)
- **Poll Management**: Continue editing drafts or view results of closed polls
- **Responsive Design**: Tailwind CSS for mobile-friendly UI
- **Dynamic UI Components**: Custom Radix UI components with Tailwind styling

### Backend Features
- **RESTful API**: Express.js server with REST endpoints
- **Real-time Communication**: Socket.IO for instant updates
- **User Authentication**: Clerk integration for secure authentication
- **Database**: MongoDB for scalable data storage
- **Poll Expiry**: Automatic poll expiration using cron jobs
- **Poll States**: Draft, Live, and Closed status management
- **Analytics**: Track votes, engagement, and average voting time

## 🛠 Tech Stack

### Frontend
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI (dropdown-menu, slots)
- **Routing**: React Router DOM v7
- **Authentication**: Clerk React
- **Real-time**: Socket.IO Client
- **Icons**: Lucide React
- **Utilities**: clsx, class-variance-authority, tailwind-merge

### Backend
- **Runtime**: Node.js (Module ES)
- **Framework**: Express.js v5
- **Real-time**: Socket.IO
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Clerk Express
- **Task Scheduling**: Node-cron
- **CORS**: Cross-origin resource sharing enabled

## 📁 Project Structure

```
poll-app/
├── backend/
│   ├── index.js                 # Main server entry point
│   ├── connectDB.js             # MongoDB connection setup
│   ├── cronjob.js              # Poll expiry scheduler
│   ├── package.json
│   ├── README.md
│   └── models/
│       ├── pollModel.js         # Poll schema and model
│       └── voteModel.js         # Vote schema and model
│
└── frontend/
    ├── src/
    │   ├── App.tsx              # Main app component with routes
    │   ├── main.tsx             # React app entry point
    │   ├── App.css
    │   ├── index.css
    │   ├── components/
    │   │   ├── NavbarHomepage.tsx
    │   │   ├── NavbarDashboard.tsx
    │   │   ├── Sidebar.tsx
    │   │   ├── PollCard.tsx
    │   │   ├── PollList.tsx
    │   │   ├── SignInComponent.tsx
    │   │   ├── Loaderpage.tsx
    │   │   ├── FooterHomepage.tsx
    │   │   └── ui/                # Reusable UI components
    │   │       ├── button.tsx
    │   │       ├── card.tsx
    │   │       ├── input.tsx
    │   │       ├── textarea.tsx
    │   │       └── dropdown-menu.tsx
    │   ├── lib/
    │   │   ├── socket-setup.ts   # Socket.IO initialization
    │   │   ├── usePollSocket.ts  # Custom socket hook
    │   │   └── utils.ts          # Utility functions
    │   ├── pages/
    │   │   ├── Homepage.tsx
    │   │   ├── Dashboard.tsx
    │   │   ├── Pollspage.tsx
    │   │   ├── CreatePollPage.tsx
    │   │   ├── VotePollPage.tsx
    │   │   ├── sign-in.tsx
    │   │   ├── sign-up.tsx
    │   │   ├── SSOCallback.tsx
    │   │   └── NotFound.tsx
    │   └── assets/
    ├── public/
    ├── index.html
    ├── package.json
    ├── vite.config.ts
    ├── tsconfig.json
    ├── eslint.config.js
    └── README.md
```

## 🚀 Frontend Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file in the frontend directory:
```
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_API_URL=http://localhost:8080
```

### Available Scripts

- **Development**: `npm run dev`
  - Starts Vite dev server on http://localhost:5173
  
- **Build**: `npm run build`
  - Builds TypeScript and optimizes for production
  
- **Lint**: `npm run lint`
  - Runs ESLint for code quality

- **Preview**: `npm run preview`
  - Preview production build locally

## 🚀 Backend Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB instance (local or cloud)

### Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in the backend directory:
```
MONGODB_URI=mongodb://localhost:27017/poll-app
CLERK_SECRET_KEY=your_clerk_secret_key
CLIENT_URL=http://localhost:5173
PORT=8080
```

## 🏃 Running the Application

### Option 1: Run Both Services (Recommended)

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```
Backend will run on `http://localhost:8080`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:5173`

### Option 2: Development with Hot Reload

**Backend** (with auto-reload):
```bash
cd backend
node --watch index.js
```

**Frontend** (with Vite HMR):
```bash
cd frontend
npm run dev
```

## 📡 API Endpoints

### Poll Endpoints
- **POST** `/create-poll` - Create a new poll (authenticated)
- **GET** `/polls` - Fetch all polls
- **GET** `/poll/:id` - Get specific poll details
- **PATCH** `/poll/:id` - Update poll status or details (authenticated)
- **DELETE** `/poll/:id` - Delete a poll (authenticated)

### Vote Endpoints
- **POST** `/vote` - Cast a vote on a poll (authenticated)
- **GET** `/votes/:pollId` - Get all votes for a poll

### Authentication
- All endpoints requiring authentication check `userId` from Clerk middleware

### WebSocket Events
- **join:poll** - Join a poll's real-time update channel
- **leave:poll** - Leave a poll's update channel
- **vote:update** - Emitted when a new vote is cast
- **poll:update** - Emitted when poll status changes

## 🔐 Environment Variables

### Frontend (.env.local)
```
VITE_CLERK_PUBLISHABLE_KEY=     # Clerk public key
VITE_API_URL=                   # Backend API URL
```

### Backend (.env)
```
MONGODB_URI=                    # MongoDB connection string
CLERK_SECRET_KEY=               # Clerk secret key
CLIENT_URL=                     # Frontend URL for CORS
PORT=                           # Server port (default: 8080)
```

## 🗄️ Database Models

### Poll Model
- `title`: Poll question (String, required)
- `status`: Poll state - "Live", "Draft", "Closed" (String, enum)
- `author_id`: Creator's Clerk user ID (String, required)
- `author`: Creator's name (String, required)
- `votes`: Total vote count (Number)
- `engagement`: User engagement metric (Number)
- `avgTime`: Average voting time (Number)
- `validity`: Poll duration in minutes (Number, default: 15)
- `startTime`: Timestamp when poll went live (Number)
- `expiresAt`: Expiration timestamp (Number)
- `options`: Array of poll options with vote counts (Array)
- `timestamps`: Auto-generated createdAt and updatedAt

### Vote Model
- `pollId`: Reference to poll (ObjectId)
- `userId`: Clerk user ID (String)
- `optionId`: Selected option ID (String)
- `timestamps`: Vote creation/update times (Auto-generated)

## 📝 Features Overview

### Poll Lifecycle
1. **Draft**: User creates poll but hasn't published
2. **Live**: Poll is active and accepting votes
3. **Closed**: Poll expired or manually closed, results are view-only

### Real-time Capabilities
- Vote count updates instantly across all connected clients
- Socket.IO broadcasts vote updates to all users viewing a poll
- Automatic UI refresh without page reload

### Authentication Flow
1. User signs up/signs in via Clerk
2. Frontend receives Clerk auth token
3. Backend validates token for protected routes
4. User can create and vote on polls

## 🔧 Development Tips

- **Hot Reload**: Both frontend (Vite) and backend support file watching
- **CORS**: Configured to allow frontend-backend communication
- **Socket.IO**: Real-time events are broadcast to specific poll rooms
- **TypeScript**: Frontend uses TypeScript for type safety
- **ESLint**: Code quality enforcement with eslint configuration

## 📦 Building for Production

### Frontend
```bash
cd frontend
npm run build
```
Creates optimized build in `dist/` directory

### Backend
No build step required - ready for deployment as-is

## 🤝 Contributing

When making changes:
1. Ensure code passes linting: `npm run lint` (frontend)
2. Follow TypeScript best practices (frontend)
3. Use descriptive commit messages
4. Test Socket.IO events for real-time features

## 📄 License

This project is part of a development cohort (Cohort 2026).

---

**Happy polling! 🗳️**
