import { 
  users, 
  courses,
  classrooms,
  enrollments,
  classroomMemberships,
  liveSessions,
  posts,
  type User, 
  type InsertUser,
  type Course,
  type InsertCourse,
  type Classroom,
  type InsertClassroom,
  type Enrollment,
  type InsertEnrollment,
  type ClassroomMembership,
  type InsertClassroomMembership,
  type LiveSession,
  type InsertLiveSession,
  type Post,
  type InsertPost
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc } from "drizzle-orm";

// Enhanced interface with comprehensive CRUD methods for the music education platform
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<InsertUser>): Promise<User | undefined>;
  
  // Course methods
  getCourses(): Promise<Course[]>;
  getCourse(id: number): Promise<Course | undefined>;
  getCoursesByCategory(category: string): Promise<Course[]>;
  getCoursesByMentor(mentorId: number): Promise<Course[]>;
  createCourse(course: InsertCourse): Promise<Course>;
  updateCourse(id: number, updates: Partial<InsertCourse>): Promise<Course | undefined>;
  
  // Classroom methods
  getClassrooms(): Promise<Classroom[]>;
  getClassroom(id: number): Promise<Classroom | undefined>;
  getClassroomsByMaster(masterId: number): Promise<Classroom[]>;
  createClassroom(classroom: InsertClassroom): Promise<Classroom>;
  updateClassroom(id: number, updates: Partial<InsertClassroom>): Promise<Classroom | undefined>;
  
  // Enrollment methods
  getEnrollmentsByUser(userId: number): Promise<Enrollment[]>;
  getEnrollmentsByCourse(courseId: number): Promise<Enrollment[]>;
  getEnrollment(userId: number, courseId: number): Promise<Enrollment | undefined>;
  createEnrollment(enrollment: InsertEnrollment): Promise<Enrollment>;
  updateEnrollmentProgress(id: number, progress: number): Promise<Enrollment | undefined>;
  
  // Classroom membership methods
  getClassroomMembershipsByUser(userId: number): Promise<ClassroomMembership[]>;
  getClassroomMembershipsByClassroom(classroomId: number): Promise<ClassroomMembership[]>;
  createClassroomMembership(membership: InsertClassroomMembership): Promise<ClassroomMembership>;
  
  // Live session methods
  getLiveSessions(): Promise<LiveSession[]>;
  getLiveSession(id: number): Promise<LiveSession | undefined>;
  getLiveSessionsByMentor(mentorId: number): Promise<LiveSession[]>;
  getLiveSessionsByClassroom(classroomId: number): Promise<LiveSession[]>;
  createLiveSession(session: InsertLiveSession): Promise<LiveSession>;
  updateLiveSession(id: number, updates: Partial<InsertLiveSession>): Promise<LiveSession | undefined>;
  
  // Community post methods
  getPosts(): Promise<Post[]>;
  getPost(id: number): Promise<Post | undefined>;
  getPostsByUser(userId: number): Promise<Post[]>;
  createPost(post: InsertPost): Promise<Post>;
  updatePost(id: number, updates: Partial<InsertPost>): Promise<Post | undefined>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUser(id: number, updates: Partial<InsertUser>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set(updates)
      .where(eq(users.id, id))
      .returning();
    return user || undefined;
  }

  // Course methods
  async getCourses(): Promise<Course[]> {
    return await db.select().from(courses).where(eq(courses.isActive, true)).orderBy(desc(courses.createdAt));
  }

  async getCourse(id: number): Promise<Course | undefined> {
    const [course] = await db.select().from(courses).where(eq(courses.id, id));
    return course || undefined;
  }

  async getCoursesByCategory(category: string): Promise<Course[]> {
    return await db.select().from(courses).where(and(eq(courses.category, category), eq(courses.isActive, true)));
  }

  async getCoursesByMentor(mentorId: number): Promise<Course[]> {
    return await db.select().from(courses).where(eq(courses.mentorId, mentorId));
  }

  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const [course] = await db
      .insert(courses)
      .values(insertCourse)
      .returning();
    return course;
  }

  async updateCourse(id: number, updates: Partial<InsertCourse>): Promise<Course | undefined> {
    const [course] = await db
      .update(courses)
      .set(updates)
      .where(eq(courses.id, id))
      .returning();
    return course || undefined;
  }

  // Classroom methods
  async getClassrooms(): Promise<Classroom[]> {
    return await db.select().from(classrooms).where(eq(classrooms.isActive, true)).orderBy(desc(classrooms.createdAt));
  }

  async getClassroom(id: number): Promise<Classroom | undefined> {
    const [classroom] = await db.select().from(classrooms).where(eq(classrooms.id, id));
    return classroom || undefined;
  }

  async getClassroomsByMaster(masterId: number): Promise<Classroom[]> {
    return await db.select().from(classrooms).where(eq(classrooms.masterId, masterId));
  }

  async createClassroom(insertClassroom: InsertClassroom): Promise<Classroom> {
    const [classroom] = await db
      .insert(classrooms)
      .values(insertClassroom)
      .returning();
    return classroom;
  }

  async updateClassroom(id: number, updates: Partial<InsertClassroom>): Promise<Classroom | undefined> {
    const [classroom] = await db
      .update(classrooms)
      .set(updates)
      .where(eq(classrooms.id, id))
      .returning();
    return classroom || undefined;
  }

  // Enrollment methods
  async getEnrollmentsByUser(userId: number): Promise<Enrollment[]> {
    return await db.select().from(enrollments).where(eq(enrollments.userId, userId));
  }

  async getEnrollmentsByCourse(courseId: number): Promise<Enrollment[]> {
    return await db.select().from(enrollments).where(eq(enrollments.courseId, courseId));
  }

  async getEnrollment(userId: number, courseId: number): Promise<Enrollment | undefined> {
    const [enrollment] = await db.select().from(enrollments).where(
      and(eq(enrollments.userId, userId), eq(enrollments.courseId, courseId))
    );
    return enrollment || undefined;
  }

  async createEnrollment(insertEnrollment: InsertEnrollment): Promise<Enrollment> {
    const [enrollment] = await db
      .insert(enrollments)
      .values(insertEnrollment)
      .returning();
    return enrollment;
  }

  async updateEnrollmentProgress(id: number, progress: number): Promise<Enrollment | undefined> {
    const [enrollment] = await db
      .update(enrollments)
      .set({ progress })
      .where(eq(enrollments.id, id))
      .returning();
    return enrollment || undefined;
  }

  // Classroom membership methods
  async getClassroomMembershipsByUser(userId: number): Promise<ClassroomMembership[]> {
    return await db.select().from(classroomMemberships).where(eq(classroomMemberships.userId, userId));
  }

  async getClassroomMembershipsByClassroom(classroomId: number): Promise<ClassroomMembership[]> {
    return await db.select().from(classroomMemberships).where(eq(classroomMemberships.classroomId, classroomId));
  }

  async createClassroomMembership(insertMembership: InsertClassroomMembership): Promise<ClassroomMembership> {
    const [membership] = await db
      .insert(classroomMemberships)
      .values(insertMembership)
      .returning();
    return membership;
  }

  // Live session methods
  async getLiveSessions(): Promise<LiveSession[]> {
    return await db.select().from(liveSessions).orderBy(desc(liveSessions.scheduledAt));
  }

  async getLiveSession(id: number): Promise<LiveSession | undefined> {
    const [session] = await db.select().from(liveSessions).where(eq(liveSessions.id, id));
    return session || undefined;
  }

  async getLiveSessionsByMentor(mentorId: number): Promise<LiveSession[]> {
    return await db.select().from(liveSessions).where(eq(liveSessions.mentorId, mentorId));
  }

  async getLiveSessionsByClassroom(classroomId: number): Promise<LiveSession[]> {
    return await db.select().from(liveSessions).where(eq(liveSessions.classroomId, classroomId));
  }

  async createLiveSession(insertSession: InsertLiveSession): Promise<LiveSession> {
    const [session] = await db
      .insert(liveSessions)
      .values(insertSession)
      .returning();
    return session;
  }

  async updateLiveSession(id: number, updates: Partial<InsertLiveSession>): Promise<LiveSession | undefined> {
    const [session] = await db
      .update(liveSessions)
      .set(updates)
      .where(eq(liveSessions.id, id))
      .returning();
    return session || undefined;
  }

  // Community post methods
  async getPosts(): Promise<Post[]> {
    return await db.select().from(posts).orderBy(desc(posts.createdAt));
  }

  async getPost(id: number): Promise<Post | undefined> {
    const [post] = await db.select().from(posts).where(eq(posts.id, id));
    return post || undefined;
  }

  async getPostsByUser(userId: number): Promise<Post[]> {
    return await db.select().from(posts).where(eq(posts.userId, userId));
  }

  async createPost(insertPost: InsertPost): Promise<Post> {
    const [post] = await db
      .insert(posts)
      .values(insertPost)
      .returning();
    return post;
  }

  async updatePost(id: number, updates: Partial<InsertPost>): Promise<Post | undefined> {
    const [post] = await db
      .update(posts)
      .set(updates)
      .where(eq(posts.id, id))
      .returning();
    return post || undefined;
  }
}

export const storage = new DatabaseStorage();
