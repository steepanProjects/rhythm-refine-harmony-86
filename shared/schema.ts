import { pgTable, text, serial, integer, boolean, timestamp, numeric, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Users table with role-based access
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  role: text("role").notNull().default("student"), // student, mentor, admin
  firstName: text("first_name"),
  lastName: text("last_name"),
  avatar: text("avatar"),
  bio: text("bio"),
  xp: integer("xp").default(0),
  level: integer("level").default(1),
  createdAt: timestamp("created_at").defaultNow(),
});

// Courses table
export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  category: text("category").notNull(), // piano, guitar, vocals, etc.
  level: text("level").notNull(), // beginner, intermediate, advanced
  price: numeric("price", { precision: 10, scale: 2 }),
  duration: integer("duration"), // in minutes
  mentorId: integer("mentor_id").references(() => users.id),
  imageUrl: text("image_url"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Classrooms table
export const classrooms = pgTable("classrooms", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  subject: text("subject").notNull(),
  level: text("level").notNull(),
  masterId: integer("master_id").references(() => users.id),
  maxStudents: integer("max_students").default(50),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Enrollments table (many-to-many between users and courses)
export const enrollments = pgTable("enrollments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  courseId: integer("course_id").references(() => courses.id),
  progress: integer("progress").default(0), // percentage 0-100
  completedAt: timestamp("completed_at"),
  enrolledAt: timestamp("enrolled_at").defaultNow(),
});

// Classroom memberships (many-to-many between users and classrooms)
export const classroomMemberships = pgTable("classroom_memberships", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  classroomId: integer("classroom_id").references(() => classrooms.id),
  role: text("role").notNull().default("student"), // master, staff, student
  joinedAt: timestamp("joined_at").defaultNow(),
});

// Live sessions table
export const liveSessions = pgTable("live_sessions", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  mentorId: integer("mentor_id").references(() => users.id),
  classroomId: integer("classroom_id").references(() => classrooms.id),
  scheduledAt: timestamp("scheduled_at").notNull(),
  duration: integer("duration").default(60), // in minutes
  maxParticipants: integer("max_participants").default(20),
  status: text("status").default("scheduled"), // scheduled, live, completed, cancelled
  recordingUrl: text("recording_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Community posts table
export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  title: text("title"),
  content: text("content").notNull(),
  type: text("type").default("general"), // general, achievement, question, showcase
  likes: integer("likes").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// Define relations
export const usersRelations = relations(users, ({ many }) => ({
  courses: many(courses),
  enrollments: many(enrollments),
  classrooms: many(classrooms),
  classroomMemberships: many(classroomMemberships),
  liveSessions: many(liveSessions),
  posts: many(posts),
}));

export const coursesRelations = relations(courses, ({ one, many }) => ({
  mentor: one(users, {
    fields: [courses.mentorId],
    references: [users.id],
  }),
  enrollments: many(enrollments),
}));

export const classroomsRelations = relations(classrooms, ({ one, many }) => ({
  master: one(users, {
    fields: [classrooms.masterId],
    references: [users.id],
  }),
  memberships: many(classroomMemberships),
  liveSessions: many(liveSessions),
}));

export const enrollmentsRelations = relations(enrollments, ({ one }) => ({
  user: one(users, {
    fields: [enrollments.userId],
    references: [users.id],
  }),
  course: one(courses, {
    fields: [enrollments.courseId],
    references: [courses.id],
  }),
}));

export const classroomMembershipsRelations = relations(classroomMemberships, ({ one }) => ({
  user: one(users, {
    fields: [classroomMemberships.userId],
    references: [users.id],
  }),
  classroom: one(classrooms, {
    fields: [classroomMemberships.classroomId],
    references: [classrooms.id],
  }),
}));

export const liveSessionsRelations = relations(liveSessions, ({ one }) => ({
  mentor: one(users, {
    fields: [liveSessions.mentorId],
    references: [users.id],
  }),
  classroom: one(classrooms, {
    fields: [liveSessions.classroomId],
    references: [classrooms.id],
  }),
}));

export const postsRelations = relations(posts, ({ one }) => ({
  user: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertCourseSchema = createInsertSchema(courses).omit({
  id: true,
  createdAt: true,
});

export const insertClassroomSchema = createInsertSchema(classrooms).omit({
  id: true,
  createdAt: true,
});

export const insertEnrollmentSchema = createInsertSchema(enrollments).omit({
  id: true,
  enrolledAt: true,
});

export const insertClassroomMembershipSchema = createInsertSchema(classroomMemberships).omit({
  id: true,
  joinedAt: true,
});

export const insertLiveSessionSchema = createInsertSchema(liveSessions).omit({
  id: true,
  createdAt: true,
});

export const insertPostSchema = createInsertSchema(posts).omit({
  id: true,
  createdAt: true,
});

// Export types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertCourse = z.infer<typeof insertCourseSchema>;
export type Course = typeof courses.$inferSelect;

export type InsertClassroom = z.infer<typeof insertClassroomSchema>;
export type Classroom = typeof classrooms.$inferSelect;

export type InsertEnrollment = z.infer<typeof insertEnrollmentSchema>;
export type Enrollment = typeof enrollments.$inferSelect;

export type InsertClassroomMembership = z.infer<typeof insertClassroomMembershipSchema>;
export type ClassroomMembership = typeof classroomMemberships.$inferSelect;

export type InsertLiveSession = z.infer<typeof insertLiveSessionSchema>;
export type LiveSession = typeof liveSessions.$inferSelect;

export type InsertPost = z.infer<typeof insertPostSchema>;
export type Post = typeof posts.$inferSelect;
