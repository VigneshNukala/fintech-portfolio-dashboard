# **Fintech Portfolio Dashboard** 

## **Introduction**  
This repository contains the portfolio analytical dashboard for Fintech platform. It enables users to monitor their investment strategies and analyze market data.

## **Prerequisites**

Ensure you have the following dependencies installed:

- **Node.js** (v16 or higher)
- **npm** (package manager)
- **SQLite** (for database)

## **Project File Structure**
    ├───backend
    │   ├───node_modules 
    │   ├───src
    |   |   |   index.ts
    │   │   data.db
    │   │   package-lock.json
    │   │   package.json
    │   │   tsconfig.json
    ├───public
    │       investment.json
    │       markets.json
    └───src
        │   App.css
        │   App.tsx
        │   index.css
        │   main.tsx
        │   vite-env.d.ts
        └───components
    │   .gitattributes
    │   .gitignore
    │   eslint.config.js
    │   file-structure.txt
    │   index.html
    │   package-lock.json
    │   package.json
    │   README.md
    │   tsconfig.app.json
    │   tsconfig.json
    │   tsconfig.node.json
    │   vite.config.ts


## **Getting Started**  

Follow these steps to set up your development environment:

### **1. Clone the repository:**  

```
https://github.com/VigneshNukala/fintech-portfolio-dashboard.git
```

### **2. Install dependencies for both frontend and backend:**

- **Backend** : Navigate to the backend/ directory and run npm install (or yarn install).
```bash
cd backend
npm install  # or yarn install
```

- **Frontend** : Navigate to the root directory and run npm install (or yarn install).
```bash
cd ..
npm install  # or yarn install
```

### **3. Start the servers (Two Different Terminals):**
- **Backend**
To start the backend server, navigate to the backend/ directory (if not already there) and run in a seperate terminal:
```bash
cd backend
npm run dev  # or yarn dev
```
- **Frontend**
To start the frontend server, navigate to the root directory (if not already there) and run in a seperate terminal:
```bash
cd frontend/
npm run dev  # or yarn start
```

### **3. Open the servers**
Once both servers are running, open your browser and visit:
```
http://localhost:5173/
```


