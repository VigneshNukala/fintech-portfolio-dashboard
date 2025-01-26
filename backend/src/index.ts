import express, { Request, Response } from "express";
import cors from "cors";

import { v4 as uuidv4 } from 'uuid';

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { open } from "sqlite";
import { Database } from "sqlite";
import sqlite3 from "sqlite3";

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

// Register Endpoint
app.post("/signup/", async (req: Request, res: Response) => {
  const { username,email, password} = req.body;
  console.log(username,password,email)
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

// Login Endpoint
app.post("/login/", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log(email,password)
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
        console.log("s")
        res.json({ jwtToken });
      } else {
        console.log("no")
        res.status(400).json("Username or Password is Invalid");
      }
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});
