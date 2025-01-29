import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { open } from "sqlite";
import { Database } from "sqlite";
import sqlite3 from "sqlite3";

// Extend the Request interface to include `email`
declare global {
  namespace Express {
    interface Request {
      email?: string; // This is to add the `email` field after JWT decoding
    }
  }
}

const app = express();
app.use(express.json());
app.use(cors());

let db: Database<sqlite3.Database, sqlite3.Statement> | null = null;

// Initialize Database and Server
const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: "D:/React Projects/fintech-portfolio-dashboard/backend/data.db",
      driver: sqlite3.Database,
    });
    app.listen(3005, () => {
      console.log(`Server Running at http://localhost:3005`);
    });
  } catch (e: any) {
    console.error(`DB Error: ${e.message}`);
  }
};

initializeDBAndServer();

// Register 
app.post("/signup/", async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  console.log(username, password, email);
  try {
    if (!db) throw new Error("Database not initialized");

    const checkUserQuery = `SELECT * FROM user WHERE username = ?`;
    const dbUser = await db.get(checkUserQuery, [username]);

    if (dbUser) {
      res.status(400).json("User already exists");
    } else {
      if (password.length < 6) {
        res.status(400).json("Password is too short");
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const id = uuidv4();
        const createUserQuery = `
          INSERT INTO user (id, username, email, password)
          VALUES (?, ?, ?, ?)
        `;
        await db.run(createUserQuery, [id, username, email, hashedPassword]);
        res.status(200).json("User created successfully");
      }
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Login 
app.post("/login/", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    if (!db) throw new Error("Database not initialized");

    const checkUserQuery = `SELECT * FROM user WHERE email = ?`;
    const dbUser = await db.get(checkUserQuery, [email]);

    if (dbUser === undefined) {
      res.status(400).json("Username or Password is Invalid");
    } else {
      const isPasswordMatched = await bcrypt.compare(password, dbUser.password);

      if (isPasswordMatched) {
        const payload = { email };
        const jwtToken = jwt.sign(payload, "SECRET");
        res.json({ jwtToken });
      } else {
        res.status(400).json("Username or Password is Invalid");
      }
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Middleware to authenticate JWT
const authenticate = (req: Request, res: Response, next: NextFunction) => {
  let jwtToken;
  const authHeader = req.headers['authorization'];
  if (authHeader !== undefined) {
    jwtToken = authHeader.split(' ')[1]; // Extract JWT token from Authorization header
  }
  if (jwtToken === undefined) {
    res.status(401).send('Invalid JWT Token');
  } else {
    jwt.verify(jwtToken, 'SECRET', async (error, payload) => {
      if (error) {
        res.status(401).send('Invalid JWT Token');
      } else {
        // Type guard: Check if payload is not undefined
        if (payload && typeof payload === 'object' && 'email' in payload) {
          req.email = payload.email; // Store the email in req.email
          next(); // Continue to the next route handler
        } else {
          res.status(401).send('Invalid JWT Token');
        }
      }
    });
  }
}

// Settings Route
app.get("/settings/", authenticate, async (req: Request, res: Response) => {
  try {
    if (!db) throw new Error("Database not initialized");

    const email = req.email;

    if (!email) {
      res.status(400).json("Email not found in JWT payload");
    }

    const checkUserQuery = `SELECT * FROM user WHERE email = ?`;
    const dbArray = await db.get(checkUserQuery, [email]);
    res.json(dbArray); 
    console.log(dbArray)
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});
