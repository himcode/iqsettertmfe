# IQsetter CRM Frontend

This is the React frontend for the IQsetter CRM system, built with Vite, React Router v6, Redux Toolkit, Material UI, and integrates with a Node.js backend for authentication, tasks, projects, and team members management.

## Features
- JWT authentication (login/register)
- Protected routes and dashboard
- CRUD for tasks (projects/team coming soon)
- State management with Redux Toolkit
- Material UI for modern, responsive design
- Notifications with notistack

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- Backend API running (see backend README)

### Setup
```sh
npm install
```

### Running the App
```sh
npm run dev
```

The app will be available at `http://localhost:5173` by default.

### Project Structure
- `src/pages` — App pages (Login, Register, Dashboard, NotFound)
- `src/components` — Reusable UI components (ProtectedRoute, Loader, NotificationProvider)
- `src/features` — Redux slices (auth, tasks, ...)
- `src/api` — Axios instance and API utilities
- `src/utils` — Helper utilities (token storage, etc.)
- `src/hooks` — Custom React hooks
- `src/theme` — MUI theme config

### Environment
- API requests are proxied to `/api` (configure Vite or use a proxy as needed)
- Tokens are stored in localStorage

## License
MIT
