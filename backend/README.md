
# Backend Application

## Overview
This is a TypeScript-based backend application built with Node.js, Express.js, and MongoDB. The application also uses Socket.io for real-time communication and Swagger for API documentation.

## Prerequisites
Before you start, ensure that you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/get-npm) or [yarn](https://yarnpkg.com/getting-started/install) for package management
- [MongoDB](https://www.mongodb.com/) (running locally or on a cloud service like MongoDB Atlas)

## Setup Instructions

### 1. Clone the Repository
\`\`\`bash
git clone <repository-url>
cd backend
\`\`\`

### 2. Install Dependencies
Install the required dependencies using npm or yarn:
\`\`\`bash
npm install
\`\`\`
or
\`\`\`bash
yarn install
\`\`\`

### 3. Environment Variables
Create a \`.env\` file in the root directory of the project. Add the following environment variables:

\`\`\`
MONGODB_URI=<Your MongoDB connection string>
PORT=<Port number for the server (default is 5000)>
\`\`\`

### 4. Building the Project
To compile the TypeScript code to JavaScript, run:
\`\`\`bash
npm run build
\`\`\`
or
\`\`\`bash
yarn build
\`\`\`

### 5. Running the Application

#### Development Mode
To start the server in development mode with live reloading using \`nodemon\`, run:
\`\`\`bash
npm run dev
\`\`\`
or
\`\`\`bash
yarn dev
\`\`\`

#### Production Mode
To start the server in production mode, first build the project and then run:
\`\`\`bash
npm run start
\`\`\`
or
\`\`\`bash
yarn start
\`\`\`

### 6. API Documentation
This application uses Swagger for API documentation. Once the server is running, you can view the API docs by navigating to:
\`\`\`
http://localhost:<PORT>/api-docs
\`\`\`

## Project Structure

\`\`\`
backend/
│
├── src/                 # Source files
│   ├── controllers/     # Controllers for handling requests
│   ├── models/          # Mongoose models
│   ├── routes/          # Express routes
│   ├── server.ts        # Main server file
│
├── dist/                # Compiled JavaScript files (generated after build)
│
├── .env                 # Environment variables
├── package.json         # Project metadata and dependencies
├── tsconfig.json        # TypeScript configuration
└── README.md            # This file
\`\`\`


## License
This project is licensed under the ISC License.
