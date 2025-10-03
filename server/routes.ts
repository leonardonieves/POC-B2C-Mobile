import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertApplicationSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      const existingPhone = await storage.getUserByPhoneNumber(userData.phoneNumber);
      if (existingPhone) {
        return res.status(400).json({ error: "Phone number already registered" });
      }
      
      const existingEmail = await storage.getUserByEmail(userData.email);
      if (existingEmail) {
        return res.status(400).json({ error: "Email already registered" });
      }
      
      const user = await storage.createUser(userData);
      const { password, ...userWithoutPassword } = user;
      
      res.json(userWithoutPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create user" });
    }
  });

  app.post("/api/login", async (req, res) => {
    try {
      const { phoneNumber, password } = req.body;
      
      if (!phoneNumber || !password) {
        return res.status(400).json({ error: "Phone number and password required" });
      }
      
      const user = await storage.getUserByPhoneNumber(phoneNumber);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      
      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ error: "Failed to login" });
    }
  });

  app.post("/api/verify", async (req, res) => {
    try {
      const { userId, code } = req.body;
      
      if (!userId || !code) {
        return res.status(400).json({ error: "User ID and code required" });
      }
      
      if (code === "123456") {
        const updatedUser = await storage.updateUser(userId, { verified: true });
        if (updatedUser) {
          const { password, ...userWithoutPassword } = updatedUser;
          return res.json(userWithoutPassword);
        }
      }
      
      res.status(400).json({ error: "Invalid verification code" });
    } catch (error) {
      res.status(500).json({ error: "Failed to verify" });
    }
  });

  app.get("/api/user/:id", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ error: "Failed to get user" });
    }
  });

  app.get("/api/schools", async (req, res) => {
    try {
      const schools = await storage.getAllSchools();
      res.json(schools);
    } catch (error) {
      res.status(500).json({ error: "Failed to get schools" });
    }
  });

  app.get("/api/schools/code/:code", async (req, res) => {
    try {
      const school = await storage.getSchoolByCode(req.params.code);
      if (!school) {
        return res.status(404).json({ error: "School not found" });
      }
      res.json(school);
    } catch (error) {
      res.status(500).json({ error: "Failed to get school" });
    }
  });

  app.post("/api/applications", async (req, res) => {
    try {
      const applicationData = insertApplicationSchema.parse(req.body);
      const application = await storage.createApplication(applicationData);
      res.json(application);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create application" });
    }
  });

  app.get("/api/applications/:userId", async (req, res) => {
    try {
      const applications = await storage.getApplicationsByUser(req.params.userId);
      res.json(applications);
    } catch (error) {
      res.status(500).json({ error: "Failed to get applications" });
    }
  });

  app.get("/api/homework/:userId", async (req, res) => {
    try {
      const homework = await storage.getHomeworkByUser(req.params.userId);
      res.json(homework);
    } catch (error) {
      res.status(500).json({ error: "Failed to get homework" });
    }
  });

  app.get("/api/payments/:userId", async (req, res) => {
    try {
      const payments = await storage.getPaymentsByUser(req.params.userId);
      res.json(payments);
    } catch (error) {
      res.status(500).json({ error: "Failed to get payments" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
