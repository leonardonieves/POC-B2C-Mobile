import {
  type User,
  type InsertUser,
  type School,
  type InsertSchool,
  type Application,
  type InsertApplication,
  type Homework,
  type InsertHomework,
  type Payment,
  type InsertPayment,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByPhoneNumber(phoneNumber: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<User>): Promise<User | undefined>;
  
  getSchool(id: string): Promise<School | undefined>;
  getSchoolByCode(code: string): Promise<School | undefined>;
  getAllSchools(): Promise<School[]>;
  createSchool(school: InsertSchool): Promise<School>;
  
  getApplicationsByUser(userId: string): Promise<Application[]>;
  createApplication(application: InsertApplication): Promise<Application>;
  
  getHomeworkByUser(userId: string): Promise<Homework[]>;
  createHomework(homework: InsertHomework): Promise<Homework>;
  
  getPaymentsByUser(userId: string): Promise<Payment[]>;
  createPayment(payment: InsertPayment): Promise<Payment>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private schools: Map<string, School>;
  private applications: Map<string, Application>;
  private homework: Map<string, Homework>;
  private payments: Map<string, Payment>;

  constructor() {
    this.users = new Map();
    this.schools = new Map();
    this.applications = new Map();
    this.homework = new Map();
    this.payments = new Map();
    
    this.seedData();
  }

  private seedData() {
    const school1: School = {
      id: randomUUID(),
      name: "Starfield Academy",
      code: "HEM1234",
      type: "Francophone",
      level: "Secondary",
    };
    this.schools.set(school1.id, school1);
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByPhoneNumber(phoneNumber: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.phoneNumber === phoneNumber,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      verified: false,
      currentChild: null,
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async getSchool(id: string): Promise<School | undefined> {
    return this.schools.get(id);
  }

  async getSchoolByCode(code: string): Promise<School | undefined> {
    return Array.from(this.schools.values()).find(
      (school) => school.code === code,
    );
  }

  async getAllSchools(): Promise<School[]> {
    return Array.from(this.schools.values());
  }

  async createSchool(insertSchool: InsertSchool): Promise<School> {
    const id = randomUUID();
    const school: School = { ...insertSchool, id };
    this.schools.set(id, school);
    return school;
  }

  async getApplicationsByUser(userId: string): Promise<Application[]> {
    return Array.from(this.applications.values()).filter(
      (app) => app.userId === userId,
    );
  }

  async createApplication(insertApplication: InsertApplication): Promise<Application> {
    const id = randomUUID();
    const application: Application = { 
      ...insertApplication,
      status: insertApplication.status || "Pending",
      id,
      createdAt: new Date(),
    };
    this.applications.set(id, application);
    return application;
  }

  async getHomeworkByUser(userId: string): Promise<Homework[]> {
    return Array.from(this.homework.values()).filter(
      (hw) => hw.userId === userId,
    );
  }

  async createHomework(insertHomework: InsertHomework): Promise<Homework> {
    const id = randomUUID();
    const hw: Homework = { 
      ...insertHomework,
      completed: insertHomework.completed || false,
      id 
    };
    this.homework.set(id, hw);
    return hw;
  }

  async getPaymentsByUser(userId: string): Promise<Payment[]> {
    return Array.from(this.payments.values()).filter(
      (payment) => payment.userId === userId,
    );
  }

  async createPayment(insertPayment: InsertPayment): Promise<Payment> {
    const id = randomUUID();
    const payment: Payment = { 
      ...insertPayment,
      status: insertPayment.status || "Pending",
      id 
    };
    this.payments.set(id, payment);
    return payment;
  }
}

export const storage = new MemStorage();
