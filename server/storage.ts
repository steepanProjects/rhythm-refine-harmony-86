import { 
  users, 
  courses,
  classrooms,
  enrollments,
  classroomMemberships,
  liveSessions,
  posts,
  learningPaths,
  practiceGroups,
  practiceGroupMemberships,
  forumCategories,
  forumTopics,
  events,
  eventRegistrations,
  courseReviews,
  mentorProfiles,
  achievements,
  userAchievements,
  courseLessons,
  lessonProgress,
  postComments,
  userFollows,
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
  type InsertPost,
  type LearningPath,
  type InsertLearningPath,
  type PracticeGroup,
  type InsertPracticeGroup,
  type PracticeGroupMembership,
  type InsertPracticeGroupMembership,
  type ForumCategory,
  type InsertForumCategory,
  type ForumTopic,
  type InsertForumTopic,
  type Event,
  type InsertEvent,
  type EventRegistration,
  type InsertEventRegistration,
  type CourseReview,
  type InsertCourseReview,
  type MentorProfile,
  type InsertMentorProfile,
  type Achievement,
  type InsertAchievement,
  type UserAchievement,
  type InsertUserAchievement,
  type CourseLesson,
  type InsertCourseLesson,
  type LessonProgress,
  type InsertLessonProgress,
  type PostComment,
  type InsertPostComment,
  type UserFollow,
  type InsertUserFollow
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

  // Learning path methods
  getLearningPaths(): Promise<LearningPath[]>;
  getLearningPath(id: number): Promise<LearningPath | undefined>;
  getLearningPathsByInstructor(instructorId: number): Promise<LearningPath[]>;
  createLearningPath(path: InsertLearningPath): Promise<LearningPath>;

  // Practice group methods
  getPracticeGroups(): Promise<PracticeGroup[]>;
  getPracticeGroup(id: number): Promise<PracticeGroup | undefined>;
  getPracticeGroupsByUser(userId: number): Promise<PracticeGroup[]>;
  createPracticeGroup(group: InsertPracticeGroup): Promise<PracticeGroup>;

  // Forum methods
  getForumCategories(): Promise<ForumCategory[]>;
  getForumTopics(): Promise<ForumTopic[]>;
  getForumTopicsByCategory(categoryId: number): Promise<ForumTopic[]>;
  createForumCategory(category: InsertForumCategory): Promise<ForumCategory>;
  createForumTopic(topic: InsertForumTopic): Promise<ForumTopic>;

  // Event methods
  getEvents(): Promise<Event[]>;
  getEvent(id: number): Promise<Event | undefined>;
  getEventsByInstructor(instructorId: number): Promise<Event[]>;
  getUpcomingEvents(): Promise<Event[]>;
  createEvent(event: InsertEvent): Promise<Event>;

  // Mentor profile methods
  getMentorProfiles(): Promise<MentorProfile[]>;
  getMentorProfile(userId: number): Promise<MentorProfile | undefined>;
  getMentorProfilesBySpecialization(specialization: string): Promise<MentorProfile[]>;
  createMentorProfile(profile: InsertMentorProfile): Promise<MentorProfile>;

  // Course review methods
  getCourseReviews(courseId: number): Promise<CourseReview[]>;
  getCourseReviewsByUser(userId: number): Promise<CourseReview[]>;
  createCourseReview(review: InsertCourseReview): Promise<CourseReview>;

  // Achievement methods
  getAchievements(): Promise<Achievement[]>;
  getUserAchievements(userId: number): Promise<UserAchievement[]>;
  createUserAchievement(achievement: InsertUserAchievement): Promise<UserAchievement>;
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

  // Learning path methods
  async getLearningPaths(): Promise<LearningPath[]> {
    return await db.select().from(learningPaths).orderBy(desc(learningPaths.createdAt));
  }

  async getLearningPath(id: number): Promise<LearningPath | undefined> {
    const [path] = await db.select().from(learningPaths).where(eq(learningPaths.id, id));
    return path || undefined;
  }

  async getLearningPathsByInstructor(instructorId: number): Promise<LearningPath[]> {
    return await db.select().from(learningPaths).where(eq(learningPaths.instructorId, instructorId));
  }

  async createLearningPath(insertPath: InsertLearningPath): Promise<LearningPath> {
    const [path] = await db
      .insert(learningPaths)
      .values(insertPath)
      .returning();
    return path;
  }

  // Practice group methods
  async getPracticeGroups(): Promise<PracticeGroup[]> {
    return await db.select().from(practiceGroups).orderBy(desc(practiceGroups.createdAt));
  }

  async getPracticeGroup(id: number): Promise<PracticeGroup | undefined> {
    const [group] = await db.select().from(practiceGroups).where(eq(practiceGroups.id, id));
    return group || undefined;
  }

  async getPracticeGroupsByUser(userId: number): Promise<PracticeGroup[]> {
    return await db.select().from(practiceGroups).where(eq(practiceGroups.createdById, userId));
  }

  async createPracticeGroup(insertGroup: InsertPracticeGroup): Promise<PracticeGroup> {
    const [group] = await db
      .insert(practiceGroups)
      .values(insertGroup)
      .returning();
    return group;
  }

  // Forum methods
  async getForumCategories(): Promise<ForumCategory[]> {
    return await db.select().from(forumCategories).orderBy(forumCategories.sortOrder);
  }

  async getForumTopics(): Promise<ForumTopic[]> {
    return await db.select().from(forumTopics).orderBy(desc(forumTopics.createdAt));
  }

  async getForumTopicsByCategory(categoryId: number): Promise<ForumTopic[]> {
    return await db.select().from(forumTopics).where(eq(forumTopics.categoryId, categoryId));
  }

  async createForumCategory(insertCategory: InsertForumCategory): Promise<ForumCategory> {
    const [category] = await db
      .insert(forumCategories)
      .values(insertCategory)
      .returning();
    return category;
  }

  async createForumTopic(insertTopic: InsertForumTopic): Promise<ForumTopic> {
    const [topic] = await db
      .insert(forumTopics)
      .values(insertTopic)
      .returning();
    return topic;
  }

  // Event methods
  async getEvents(): Promise<Event[]> {
    return await db.select().from(events).orderBy(events.startDate);
  }

  async getEvent(id: number): Promise<Event | undefined> {
    const [event] = await db.select().from(events).where(eq(events.id, id));
    return event || undefined;
  }

  async getEventsByInstructor(instructorId: number): Promise<Event[]> {
    return await db.select().from(events).where(eq(events.instructorId, instructorId));
  }

  async getUpcomingEvents(): Promise<Event[]> {
    return await db.select().from(events)
      .where(eq(events.status, 'upcoming'))
      .orderBy(events.startDate);
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const [event] = await db
      .insert(events)
      .values(insertEvent)
      .returning();
    return event;
  }

  // Mentor profile methods
  async getMentorProfiles(): Promise<MentorProfile[]> {
    return await db.select().from(mentorProfiles).orderBy(desc(mentorProfiles.averageRating));
  }

  async getMentorProfile(userId: number): Promise<MentorProfile | undefined> {
    const [profile] = await db.select().from(mentorProfiles).where(eq(mentorProfiles.userId, userId));
    return profile || undefined;
  }

  async getMentorProfilesBySpecialization(specialization: string): Promise<MentorProfile[]> {
    return await db.select().from(mentorProfiles).where(eq(mentorProfiles.specialization, specialization));
  }

  async createMentorProfile(insertProfile: InsertMentorProfile): Promise<MentorProfile> {
    const [profile] = await db
      .insert(mentorProfiles)
      .values(insertProfile)
      .returning();
    return profile;
  }

  // Course review methods
  async getCourseReviews(courseId: number): Promise<CourseReview[]> {
    return await db.select().from(courseReviews)
      .where(eq(courseReviews.courseId, courseId))
      .orderBy(desc(courseReviews.createdAt));
  }

  async getCourseReviewsByUser(userId: number): Promise<CourseReview[]> {
    return await db.select().from(courseReviews).where(eq(courseReviews.userId, userId));
  }

  async createCourseReview(insertReview: InsertCourseReview): Promise<CourseReview> {
    const [review] = await db
      .insert(courseReviews)
      .values(insertReview)
      .returning();
    return review;
  }

  // Achievement methods
  async getAchievements(): Promise<Achievement[]> {
    return await db.select().from(achievements).where(eq(achievements.isActive, true));
  }

  async getUserAchievements(userId: number): Promise<UserAchievement[]> {
    return await db.select().from(userAchievements)
      .where(eq(userAchievements.userId, userId))
      .orderBy(desc(userAchievements.earnedAt));
  }

  async createUserAchievement(insertAchievement: InsertUserAchievement): Promise<UserAchievement> {
    const [achievement] = await db
      .insert(userAchievements)
      .values(insertAchievement)
      .returning();
    return achievement;
  }
}

export const storage = new DatabaseStorage();
