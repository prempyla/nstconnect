# NST Connect

A platform for anonymous confessions and safe rooms, built with Next.js frontend and Express.js backend with MySQL database.

## Project Structure

```
nstconnect/
├── frontend/          # Next.js frontend application
├── backend/           # Express.js backend API
├── package.json       # Root package.json for monorepo management
└── render.yaml        # Deployment configuration
```

## Features

- **Anonymous Confessions**: Share thoughts and feelings anonymously
- **Safe Rooms**: Create and join private/public chat rooms
- **Challenges**: Participate in community challenges
- **User Authentication**: Secure login and registration system

## Tech Stack

### Frontend
- Next.js 15.3.1
- React 19
- CSS Modules

### Backend
- Express.js
- MySQL database
- JWT authentication
- bcrypt for password hashing

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MySQL database
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nstconnect
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Setup the database**
   ```bash
   npm run setup:backend
   ```

4. **Configure environment variables**
   
   Create `backend/config.env`:
   ```env
   DB_HOST=localhost
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=nstconnect_db
   DB_PORT=3306
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRES_IN=24h
   PORT=5001
   NODE_ENV=development
   CORS_ORIGIN=http://localhost:3000
   ```

5. **Start the development servers**
   ```bash
   npm run dev
   ```

   This will start both:
   - Backend server on http://localhost:5001
   - Frontend server on http://localhost:3000

### Available Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run dev:frontend` - Start only the frontend
- `npm run dev:backend` - Start only the backend
- `npm run build` - Build the frontend for production
- `npm run setup` - Setup both frontend and backend
- `npm run install:all` - Install dependencies for all packages

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Confessions
- `GET /api/confessions` - Get all confessions
- `POST /api/confessions` - Create a new confession
- `PATCH /api/confessions/:id/reaction` - Update confession reaction
- `DELETE /api/confessions/:id` - Delete confession

### Safe Rooms
- `GET /api/safe-rooms/public` - Get public rooms
- `GET /api/safe-rooms/my-rooms` - Get user's rooms
- `POST /api/safe-rooms` - Create a new room
- `POST /api/safe-rooms/join` - Join a room
- `GET /api/safe-rooms/:roomId/messages` - Get room messages
- `POST /api/safe-rooms/:roomId/messages` - Send message to room

### Challenges
- `GET /api/challenges` - Get all challenges
- `POST /api/challenges` - Create a new challenge
- `POST /api/challenges/:id/join` - Join a challenge
- `POST /api/challenges/:id/complete` - Complete a challenge

## Database Schema

The application uses MySQL with the following main tables:
- `users` - User accounts
- `confessions` - Anonymous confessions
- `safe_rooms` - Chat rooms
- `room_members` - Room membership
- `messages` - Room messages
- `challenges` - Community challenges
- `user_challenges` - User challenge progress

## Deployment

The project is configured for deployment on Render.com with the `render.yaml` file. Both frontend and backend will be deployed as separate services.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.
