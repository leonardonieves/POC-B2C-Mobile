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
    const school1Id = randomUUID();
    const school1: School = {
      id: school1Id,
      name: "Starfield Academy",
      code: "HEM1234",
      type: "Francophone",
      level: "Secondary",
    };
    this.schools.set(school1.id, school1);

    const school2Id = randomUUID();
    const school2: School = {
      id: school2Id,
      name: "Greenfield International School",
      code: "HEM5678",
      type: "Anglophone",
      level: "Primary",
    };
    this.schools.set(school2.id, school2);

    const school3Id = randomUUID();
    const school3: School = {
      id: school3Id,
      name: "Excellence Academy",
      code: "HEM9999",
      type: "Bilingual",
      level: "Secondary",
    };
    this.schools.set(school3.id, school3);

    const user1Id = randomUUID();
    const testUser1: User = {
      id: user1Id,
      role: "Parent",
      fullName: "Chantal Fobi",
      phoneNumber: "+237698024135",
      email: "chantal.fobi@example.com",
      password: "password123",
      verified: true,
      currentChild: "Amara Fobi",
    };
    this.users.set(user1Id, testUser1);

    const user2Id = randomUUID();
    const testUser2: User = {
      id: user2Id,
      role: "Parent",
      fullName: "Jean Kouam",
      phoneNumber: "+237677123456",
      email: "jean.kouam@example.com",
      password: "test1234",
      verified: true,
      currentChild: "Marie Kouam",
    };
    this.users.set(user2Id, testUser2);

    const app1Id = randomUUID();
    const application1: Application = {
      id: app1Id,
      userId: user1Id,
      schoolId: school1Id,
      status: "Pending",
      createdAt: new Date(),
    };
    this.applications.set(app1Id, application1);

    const hw1Id = randomUUID();
    const homework1: Homework = {
      id: hw1Id,
      userId: user1Id,
      title: "Exercise 1 – Textbook, page 60",
      dueDate: "Tomorrow",
      completed: false,
    };
    this.homework.set(hw1Id, homework1);

    const hw2Id = randomUUID();
    const homework2: Homework = {
      id: hw2Id,
      userId: user1Id,
      title: "Exercise 1 – Textbook, page 80",
      dueDate: "Tomorrow",
      completed: false,
    };
    this.homework.set(hw2Id, homework2);

    const payment1Id = randomUUID();
    const payment1: Payment = {
      id: payment1Id,
      userId: user1Id,
      title: "Transport",
      amount: "50 XAF",
      studentName: "Amara Fobi",
      dueDate: "Oct, 2025",
      status: "Pending",
    };
    this.payments.set(payment1Id, payment1);

    const payment2Id = randomUUID();
    const payment2: Payment = {
      id: payment2Id,
      userId: user2Id,
      title: "School Fees",
      amount: "150,000 XAF",
      studentName: "Marie Kouam",
      dueDate: "Nov, 2025",
      status: "Pending",
    };
    this.payments.set(payment2Id, payment2);

    console.log("\n🎭 MOCK DATA LOADED - Test Credentials:");
    console.log("=====================================");
    console.log("Test User 1:");
    console.log("  Phone: +237698024135");
    console.log("  Password: password123");
    console.log("  Name: Chantal Fobi");
    console.log("\nTest User 2:");
    console.log("  Phone: +237677123456");
    console.log("  Password: test1234");
    console.log("  Name: Jean Kouam");
    console.log("\nSchool Codes:");
    console.log("  HEM1234 - Starfield Academy");
    console.log("  HEM5678 - Greenfield International School");
    console.log("  HEM9999 - Excellence Academy");
    console.log("\nVerification Code (for new accounts):");
    console.log("  123456");
    console.log("=====================================\n");
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
