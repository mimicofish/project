# Weather App

Weather App is a full-stack application that allows user to search for and view weather information for a specific locations.

## Features

- Search weather by city
- Search history 
- Delete history
- Clear all history
- Error handling 
- Loading state

## Tech Stack

- React 
- Node.js
- Express
- PostgreSQL
- Open Weather API

## Architecture

- React handles the user interface and display data to the user
- Express handles the backend API and separates API related logic into service
- PostgreSQL stores the users weather search history  

## Prerequisites

- Node.js and npm
- PostgreSQL
- OpenWeather API Key

## Installation and Setup

### 1. Clone the repository

Clone this repository to your local machine.

### 2. Install dependencies

Navigate to the `backend` folder and install the backend dependencies:

```bash
cd backend
npm install
```

Then, navigate to the `frontend` folder and install then frontend dependencies:

```bash
cd frontend
npm install
```

### 3. Set up the PostgreSQL database

Create a PostgreSQL database, then run the queries in `backend/schema.sql` to create the required tables.

### 4. Configure environment variables 

Create a `.env` file in backend folder based on `.env.example`, then fill in the required database credentials and OpenWeather API key.

### 5. Start the backend

Open a terminal in the `backend` folder and run:

```bash
node server.js
```

### 6. Start the frontend

Open the terminal in the `frontend` folder and run:

```bash 
npm run dev
```

Open the local URL provided by Vite in your browser
