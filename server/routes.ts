import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertCourseSchema, insertClassroomSchema, insertPostSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // User routes
  app.get("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.getUser(parseInt(req.params.id));
      if (!user) return res.status(404).json({ error: "User not found" });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid user data", details: error.errors });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Course routes
  app.get("/api/courses", async (req, res) => {
    try {
      const { category, mentor } = req.query;
      let courses;
      
      if (category) {
        courses = await storage.getCoursesByCategory(category as string);
      } else if (mentor) {
        courses = await storage.getCoursesByMentor(parseInt(mentor as string));
      } else {
        courses = await storage.getCourses();
      }
      
      res.json(courses);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/courses/:id", async (req, res) => {
    try {
      const course = await storage.getCourse(parseInt(req.params.id));
      if (!course) return res.status(404).json({ error: "Course not found" });
      res.json(course);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/courses", async (req, res) => {
    try {
      const courseData = insertCourseSchema.parse(req.body);
      const course = await storage.createCourse(courseData);
      res.status(201).json(course);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid course data", details: error.errors });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Classroom routes
  app.get("/api/classrooms", async (req, res) => {
    try {
      const { master } = req.query;
      let classrooms;
      
      if (master) {
        classrooms = await storage.getClassroomsByMaster(parseInt(master as string));
      } else {
        classrooms = await storage.getClassrooms();
      }
      
      res.json(classrooms);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/classrooms/:id", async (req, res) => {
    try {
      const classroom = await storage.getClassroom(parseInt(req.params.id));
      if (!classroom) return res.status(404).json({ error: "Classroom not found" });
      res.json(classroom);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/classrooms", async (req, res) => {
    try {
      const classroomData = insertClassroomSchema.parse(req.body);
      const classroom = await storage.createClassroom(classroomData);
      res.status(201).json(classroom);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid classroom data", details: error.errors });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Live sessions routes
  app.get("/api/live-sessions", async (req, res) => {
    try {
      const { mentor, classroom } = req.query;
      let sessions;
      
      if (mentor) {
        sessions = await storage.getLiveSessionsByMentor(parseInt(mentor as string));
      } else if (classroom) {
        sessions = await storage.getLiveSessionsByClassroom(parseInt(classroom as string));
      } else {
        sessions = await storage.getLiveSessions();
      }
      
      res.json(sessions);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Community posts routes
  app.get("/api/posts", async (req, res) => {
    try {
      const { user } = req.query;
      let posts;
      
      if (user) {
        posts = await storage.getPostsByUser(parseInt(user as string));
      } else {
        posts = await storage.getPosts();
      }
      
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/posts", async (req, res) => {
    try {
      const postData = insertPostSchema.parse(req.body);
      const post = await storage.createPost(postData);
      res.status(201).json(post);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid post data", details: error.errors });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Enrollment routes
  app.get("/api/enrollments/user/:userId", async (req, res) => {
    try {
      const enrollments = await storage.getEnrollmentsByUser(parseInt(req.params.userId));
      res.json(enrollments);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/enrollments/course/:courseId", async (req, res) => {
    try {
      const enrollments = await storage.getEnrollmentsByCourse(parseInt(req.params.courseId));
      res.json(enrollments);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
