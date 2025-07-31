import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, 
  insertCourseSchema, 
  insertClassroomSchema, 
  insertPostSchema,
  insertLearningPathSchema,
  insertLiveSessionSchema,
  insertPracticeGroupSchema,
  insertForumCategorySchema,
  insertForumTopicSchema,
  insertEventSchema,
  insertMentorProfileSchema,
  insertCourseReviewSchema,
  insertUserAchievementSchema
} from "@shared/schema";
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

  // Live sessions routes
  app.get("/api/live-sessions", async (req, res) => {
    try {
      const { mentor, classroom, status } = req.query;
      let sessions;
      
      if (mentor) {
        sessions = await storage.getLiveSessionsByMentor(parseInt(mentor as string));
      } else if (classroom) {
        sessions = await storage.getLiveSessionsByClassroom(parseInt(classroom as string));
      } else {
        sessions = await storage.getLiveSessions();
      }
      
      // Filter by status if provided
      if (status && sessions) {
        sessions = sessions.filter(session => session.status === status);
      }
      
      res.json(sessions);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/live-sessions/:id", async (req, res) => {
    try {
      const session = await storage.getLiveSession(parseInt(req.params.id));
      if (!session) return res.status(404).json({ error: "Live session not found" });
      res.json(session);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/live-sessions", async (req, res) => {
    try {
      const sessionData = insertLiveSessionSchema.parse(req.body);
      const session = await storage.createLiveSession(sessionData);
      res.status(201).json(session);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid live session data", details: error.errors });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Learning path routes
  app.get("/api/learning-paths", async (req, res) => {
    try {
      const { instructor } = req.query;
      let paths;
      
      if (instructor) {
        paths = await storage.getLearningPathsByInstructor(parseInt(instructor as string));
      } else {
        paths = await storage.getLearningPaths();
      }
      
      res.json(paths);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/learning-paths/:id", async (req, res) => {
    try {
      const path = await storage.getLearningPath(parseInt(req.params.id));
      if (!path) return res.status(404).json({ error: "Learning path not found" });
      res.json(path);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/learning-paths", async (req, res) => {
    try {
      const pathData = insertLearningPathSchema.parse(req.body);
      const path = await storage.createLearningPath(pathData);
      res.status(201).json(path);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid learning path data", details: error.errors });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Mentor profiles routes
  app.get("/api/mentor-profiles", async (req, res) => {
    try {
      const { specialization } = req.query;
      let profiles;
      
      if (specialization) {
        profiles = await storage.getMentorProfilesBySpecialization(specialization as string);
      } else {
        profiles = await storage.getMentorProfiles();
      }
      
      res.json(profiles);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/mentor-profiles/:userId", async (req, res) => {
    try {
      const profile = await storage.getMentorProfile(parseInt(req.params.userId));
      if (!profile) return res.status(404).json({ error: "Mentor profile not found" });
      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/mentor-profiles", async (req, res) => {
    try {
      const profileData = insertMentorProfileSchema.parse(req.body);
      const profile = await storage.createMentorProfile(profileData);
      res.status(201).json(profile);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid mentor profile data", details: error.errors });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Practice group routes
  app.get("/api/practice-groups", async (req, res) => {
    try {
      const groups = await storage.getPracticeGroups();
      res.json(groups);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/practice-groups/:id", async (req, res) => {
    try {
      const group = await storage.getPracticeGroup(parseInt(req.params.id));
      if (!group) return res.status(404).json({ error: "Practice group not found" });
      res.json(group);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/practice-groups", async (req, res) => {
    try {
      const groupData = insertPracticeGroupSchema.parse(req.body);
      const group = await storage.createPracticeGroup(groupData);
      res.status(201).json(group);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid practice group data", details: error.errors });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Forum routes
  app.get("/api/forum/categories", async (req, res) => {
    try {
      const categories = await storage.getForumCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/forum/topics", async (req, res) => {
    try {
      const { category } = req.query;
      let topics;
      
      if (category) {
        topics = await storage.getForumTopicsByCategory(parseInt(category as string));
      } else {
        topics = await storage.getForumTopics();
      }
      
      res.json(topics);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/forum/categories", async (req, res) => {
    try {
      const categoryData = insertForumCategorySchema.parse(req.body);
      const category = await storage.createForumCategory(categoryData);
      res.status(201).json(category);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid forum category data", details: error.errors });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/forum/topics", async (req, res) => {
    try {
      const topicData = insertForumTopicSchema.parse(req.body);
      const topic = await storage.createForumTopic(topicData);
      res.status(201).json(topic);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid forum topic data", details: error.errors });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Event routes
  app.get("/api/events", async (req, res) => {
    try {
      const { instructor, upcoming } = req.query;
      let events;
      
      if (instructor) {
        events = await storage.getEventsByInstructor(parseInt(instructor as string));
      } else if (upcoming === 'true') {
        events = await storage.getUpcomingEvents();
      } else {
        events = await storage.getEvents();
      }
      
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/events/:id", async (req, res) => {
    try {
      const event = await storage.getEvent(parseInt(req.params.id));
      if (!event) return res.status(404).json({ error: "Event not found" });
      res.json(event);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/events", async (req, res) => {
    try {
      const eventData = insertEventSchema.parse(req.body);
      const event = await storage.createEvent(eventData);
      res.status(201).json(event);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid event data", details: error.errors });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Mentor profile routes
  app.get("/api/mentors", async (req, res) => {
    try {
      const { specialization } = req.query;
      let mentors;
      
      if (specialization) {
        mentors = await storage.getMentorProfilesBySpecialization(specialization as string);
      } else {
        mentors = await storage.getMentorProfiles();
      }
      
      res.json(mentors);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/mentors", async (req, res) => {
    try {
      const mentors = await storage.getMentorProfiles();
      res.json(mentors);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/mentors/:userId", async (req, res) => {
    try {
      const mentor = await storage.getMentorProfile(parseInt(req.params.userId));
      if (!mentor) return res.status(404).json({ error: "Mentor profile not found" });
      res.json(mentor);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/mentors", async (req, res) => {
    try {
      const mentorData = insertMentorProfileSchema.parse(req.body);
      const mentor = await storage.createMentorProfile(mentorData);
      res.status(201).json(mentor);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid mentor profile data", details: error.errors });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Course review routes
  app.get("/api/courses/:courseId/reviews", async (req, res) => {
    try {
      const reviews = await storage.getCourseReviews(parseInt(req.params.courseId));
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/course-reviews", async (req, res) => {
    try {
      const reviewData = insertCourseReviewSchema.parse(req.body);
      const review = await storage.createCourseReview(reviewData);
      res.status(201).json(review);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid course review data", details: error.errors });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Achievement routes
  app.get("/api/achievements", async (req, res) => {
    try {
      const achievements = await storage.getAchievements();
      res.json(achievements);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/users/:userId/achievements", async (req, res) => {
    try {
      const achievements = await storage.getUserAchievements(parseInt(req.params.userId));
      res.json(achievements);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/user-achievements", async (req, res) => {
    try {
      const achievementData = insertUserAchievementSchema.parse(req.body);
      const achievement = await storage.createUserAchievement(achievementData);
      res.status(201).json(achievement);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid user achievement data", details: error.errors });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
