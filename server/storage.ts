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
  mentorApplications,
  mentorshipRequests,
  mentorConversations,
  mentorshipSessions,
  masterRoleRequests,
  staffRequests,
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
  type InsertUserFollow,
  type MentorApplication,
  type InsertMentorApplication,
  type MentorshipRequest,
  type InsertMentorshipRequest,
  type MasterRoleRequest,
  type InsertMasterRoleRequest,
  type StaffRequest,
  type InsertStaffRequest,
  type MentorConversation,
  type InsertMentorConversation,
  type MentorshipSession,
  type InsertMentorshipSession
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc } from "drizzle-orm";
import bcrypt from "bcryptjs";

// Enhanced interface with comprehensive CRUD methods for the music education platform
export interface IStorage {
  // User methods
  getAllUsers(role?: string): Promise<User[]>;
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
  getClassroomBySlug(slug: string): Promise<Classroom | undefined>;
  getPublicClassrooms(): Promise<Classroom[]>;
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

  // Authentication methods
  authenticateUser(email: string, password: string): Promise<User | null>;
  registerUser(userData: InsertUser, hashedPassword: string): Promise<User>;
  hashPassword(password: string): Promise<string>;
  verifyPassword(password: string, hashedPassword: string): Promise<boolean>;

  // Mentor application methods
  getMentorApplications(): Promise<MentorApplication[]>;
  getMentorApplication(id: number): Promise<MentorApplication | undefined>;
  getMentorApplicationsByStatus(status: string): Promise<MentorApplication[]>;
  createMentorApplication(application: InsertMentorApplication): Promise<MentorApplication>;
  updateMentorApplicationStatus(id: number, status: string, adminNotes?: string, reviewedBy?: number): Promise<MentorApplication | undefined>;

  // Mentorship request methods
  getMentorshipRequests(): Promise<MentorshipRequest[]>;
  getMentorshipRequest(id: number): Promise<MentorshipRequest | undefined>;
  getMentorshipRequestsByStudent(studentId: number): Promise<MentorshipRequest[]>;
  getMentorshipRequestsByMentor(mentorId: number): Promise<MentorshipRequest[]>;
  getMentorshipRequestsByStatus(status: string): Promise<MentorshipRequest[]>;
  createMentorshipRequest(request: InsertMentorshipRequest): Promise<MentorshipRequest>;
  updateMentorshipRequestStatus(id: number, status: string, mentorResponse?: string): Promise<MentorshipRequest | undefined>;

  // Mentor conversation methods
  getMentorConversations(mentorshipRequestId: number): Promise<MentorConversation[]>;
  createMentorConversation(conversation: InsertMentorConversation): Promise<MentorConversation>;
  markMessageAsRead(id: number): Promise<MentorConversation | undefined>;

  // Mentorship session methods
  getMentorshipSessions(mentorshipRequestId: number): Promise<MentorshipSession[]>;
  getMentorshipSession(id: number): Promise<MentorshipSession | undefined>;
  getMentorshipSessionsByMentor(mentorId: number): Promise<MentorshipSession[]>;
  getMentorshipSessionsByStudent(studentId: number): Promise<MentorshipSession[]>;
  createMentorshipSession(session: InsertMentorshipSession): Promise<MentorshipSession>;
  updateMentorshipSession(id: number, updates: Partial<InsertMentorshipSession>): Promise<MentorshipSession | undefined>;

  // Master role request methods
  getMasterRoleRequests(): Promise<MasterRoleRequest[]>;
  getMasterRoleRequest(id: number): Promise<MasterRoleRequest | undefined>;
  getMasterRoleRequestsByMentor(mentorId: number): Promise<MasterRoleRequest[]>;
  getMasterRoleRequestsByStatus(status: string): Promise<MasterRoleRequest[]>;
  createMasterRoleRequest(request: InsertMasterRoleRequest): Promise<MasterRoleRequest>;
  updateMasterRoleRequestStatus(id: number, status: string, adminNotes?: string, reviewedBy?: number): Promise<MasterRoleRequest | undefined>;
  promoteMentorToMaster(mentorId: number): Promise<User | undefined>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getAllUsers(role?: string): Promise<User[]> {
    if (role) {
      return await db.select().from(users).where(eq(users.role, role));
    }
    return await db.select().from(users);
  }

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

  async getClassroomBySlug(slug: string): Promise<Classroom | undefined> {
    const [classroom] = await db.select().from(classrooms).where(eq(classrooms.customSlug, slug));
    return classroom || undefined;
  }

  async getPublicClassrooms(): Promise<Classroom[]> {
    return await db.select().from(classrooms)
      .where(and(eq(classrooms.isActive, true), eq(classrooms.isPublic, true)))
      .orderBy(desc(classrooms.createdAt));
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
  async getMentorProfiles(): Promise<any[]> {
    return await db
      .select({
        id: mentorProfiles.id,
        userId: mentorProfiles.userId,
        firstName: users.firstName,
        lastName: users.lastName,
        specialization: mentorProfiles.specialization,
        experience: mentorProfiles.experience,
        hourlyRate: mentorProfiles.hourlyRate,
        location: mentorProfiles.location,
        languages: mentorProfiles.languages,
        badges: mentorProfiles.badges,
        bio: mentorProfiles.bio,
        availability: mentorProfiles.availability,
        totalStudents: mentorProfiles.totalStudents,
        totalReviews: mentorProfiles.totalReviews,
        averageRating: mentorProfiles.averageRating,
        nextAvailableSession: mentorProfiles.nextAvailableSession,
        isVerified: mentorProfiles.isVerified,
        createdAt: mentorProfiles.createdAt,
      })
      .from(mentorProfiles)
      .innerJoin(users, eq(mentorProfiles.userId, users.id))
      .orderBy(desc(mentorProfiles.averageRating));
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

  // Authentication methods
  async authenticateUser(email: string, password: string): Promise<User | null> {
    const user = await this.getUserByEmail(email);
    if (!user) return null;
    
    const isValidPassword = await this.verifyPassword(password, user.password);
    if (!isValidPassword) return null;
    
    return user;
  }

  async registerUser(userData: InsertUser, hashedPassword: string): Promise<User> {
    const userWithHashedPassword = {
      ...userData,
      password: hashedPassword
    };
    return await this.createUser(userWithHashedPassword);
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return await bcrypt.hash(password, saltRounds);
  }

  async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  // Mentor application methods
  async getMentorApplications(): Promise<MentorApplication[]> {
    return await db.select().from(mentorApplications).orderBy(desc(mentorApplications.createdAt));
  }

  async getMentorApplication(id: number): Promise<MentorApplication | undefined> {
    const [application] = await db.select().from(mentorApplications).where(eq(mentorApplications.id, id));
    return application || undefined;
  }

  async getMentorApplicationsByStatus(status: string): Promise<MentorApplication[]> {
    return await db.select().from(mentorApplications)
      .where(eq(mentorApplications.status, status))
      .orderBy(desc(mentorApplications.createdAt));
  }

  async createMentorApplication(insertApplication: InsertMentorApplication): Promise<MentorApplication> {
    const [application] = await db
      .insert(mentorApplications)
      .values(insertApplication)
      .returning();
    return application;
  }

  async updateMentorApplicationStatus(
    id: number, 
    status: string, 
    adminNotes?: string, 
    reviewedBy?: number
  ): Promise<MentorApplication | undefined> {
    const updates: any = { 
      status,
      reviewedAt: new Date()
    };
    
    if (adminNotes) updates.adminNotes = adminNotes;
    if (reviewedBy) updates.reviewedBy = reviewedBy;

    const [application] = await db
      .update(mentorApplications)
      .set(updates)
      .where(eq(mentorApplications.id, id))
      .returning();
    return application || undefined;
  }

  // Mentorship request methods
  async getMentorshipRequests(): Promise<MentorshipRequest[]> {
    return await db.select().from(mentorshipRequests).orderBy(desc(mentorshipRequests.createdAt));
  }

  async getMentorshipRequest(id: number): Promise<MentorshipRequest | undefined> {
    const [request] = await db.select().from(mentorshipRequests).where(eq(mentorshipRequests.id, id));
    return request || undefined;
  }

  async getMentorshipRequestsByStudent(studentId: number): Promise<MentorshipRequest[]> {
    return await db.select().from(mentorshipRequests)
      .where(eq(mentorshipRequests.studentId, studentId))
      .orderBy(desc(mentorshipRequests.createdAt));
  }

  async getMentorshipRequestsByMentor(mentorId: number): Promise<any[]> {
    return await db.select({
      id: mentorshipRequests.id,
      studentId: mentorshipRequests.studentId,
      mentorId: mentorshipRequests.mentorId,
      message: mentorshipRequests.message,
      status: mentorshipRequests.status,
      acceptedAt: mentorshipRequests.acceptedAt,
      rejectedAt: mentorshipRequests.rejectedAt,
      mentorResponse: mentorshipRequests.mentorResponse,
      createdAt: mentorshipRequests.createdAt,
      studentInfo: {
        firstName: users.firstName,
        lastName: users.lastName,
        email: users.email,
      }
    }).from(mentorshipRequests)
      .innerJoin(users, eq(mentorshipRequests.studentId, users.id))
      .where(eq(mentorshipRequests.mentorId, mentorId))
      .orderBy(desc(mentorshipRequests.createdAt));
  }

  async getMentorshipRequestsByStatus(status: string): Promise<MentorshipRequest[]> {
    return await db.select().from(mentorshipRequests)
      .where(eq(mentorshipRequests.status, status))
      .orderBy(desc(mentorshipRequests.createdAt));
  }

  async createMentorshipRequest(insertRequest: InsertMentorshipRequest): Promise<MentorshipRequest> {
    const [request] = await db
      .insert(mentorshipRequests)
      .values(insertRequest)
      .returning();
    return request;
  }

  async updateMentorshipRequestStatus(
    id: number, 
    status: string, 
    mentorResponse?: string
  ): Promise<MentorshipRequest | undefined> {
    const updates: any = { status };
    
    if (status === 'accepted') {
      updates.acceptedAt = new Date();
    } else if (status === 'rejected') {
      updates.rejectedAt = new Date();
    }
    
    if (mentorResponse) {
      updates.mentorResponse = mentorResponse;
    }

    const [request] = await db
      .update(mentorshipRequests)
      .set(updates)
      .where(eq(mentorshipRequests.id, id))
      .returning();
    return request || undefined;
  }

  // Mentor conversation methods
  async getMentorConversations(mentorshipRequestId: number): Promise<MentorConversation[]> {
    return await db.select().from(mentorConversations)
      .where(eq(mentorConversations.mentorshipRequestId, mentorshipRequestId))
      .orderBy(mentorConversations.createdAt);
  }

  async createMentorConversation(insertConversation: InsertMentorConversation): Promise<MentorConversation> {
    const [conversation] = await db
      .insert(mentorConversations)
      .values(insertConversation)
      .returning();
    return conversation;
  }

  async markMessageAsRead(id: number): Promise<MentorConversation | undefined> {
    const [conversation] = await db
      .update(mentorConversations)
      .set({ 
        isRead: true,
        readAt: new Date()
      })
      .where(eq(mentorConversations.id, id))
      .returning();
    return conversation || undefined;
  }

  // Mentorship session methods
  async getMentorshipSessions(mentorshipRequestId: number): Promise<MentorshipSession[]> {
    return await db.select().from(mentorshipSessions)
      .where(eq(mentorshipSessions.mentorshipRequestId, mentorshipRequestId))
      .orderBy(mentorshipSessions.scheduledAt);
  }

  async getMentorshipSession(id: number): Promise<MentorshipSession | undefined> {
    const [session] = await db.select().from(mentorshipSessions).where(eq(mentorshipSessions.id, id));
    return session || undefined;
  }

  async getMentorshipSessionsByMentor(mentorId: number): Promise<MentorshipSession[]> {
    const results = await db.select({
      id: mentorshipSessions.id,
      mentorshipRequestId: mentorshipSessions.mentorshipRequestId,
      title: mentorshipSessions.title,
      description: mentorshipSessions.description,
      scheduledAt: mentorshipSessions.scheduledAt,
      duration: mentorshipSessions.duration,
      status: mentorshipSessions.status,
      meetingLink: mentorshipSessions.meetingLink,
      recordingUrl: mentorshipSessions.recordingUrl,
      mentorNotes: mentorshipSessions.mentorNotes,
      studentNotes: mentorshipSessions.studentNotes,
      sessionFeedback: mentorshipSessions.sessionFeedback,
      rating: mentorshipSessions.rating,
      createdAt: mentorshipSessions.createdAt,
    })
      .from(mentorshipSessions)
      .innerJoin(mentorshipRequests, eq(mentorshipSessions.mentorshipRequestId, mentorshipRequests.id))
      .where(eq(mentorshipRequests.mentorId, mentorId))
      .orderBy(mentorshipSessions.scheduledAt);
    return results;
  }

  async getMentorshipSessionsByStudent(studentId: number): Promise<MentorshipSession[]> {
    const results = await db.select({
      id: mentorshipSessions.id,
      mentorshipRequestId: mentorshipSessions.mentorshipRequestId,
      title: mentorshipSessions.title,
      description: mentorshipSessions.description,
      scheduledAt: mentorshipSessions.scheduledAt,
      duration: mentorshipSessions.duration,
      status: mentorshipSessions.status,
      meetingLink: mentorshipSessions.meetingLink,
      recordingUrl: mentorshipSessions.recordingUrl,
      mentorNotes: mentorshipSessions.mentorNotes,
      studentNotes: mentorshipSessions.studentNotes,
      sessionFeedback: mentorshipSessions.sessionFeedback,
      rating: mentorshipSessions.rating,
      createdAt: mentorshipSessions.createdAt,
    })
      .from(mentorshipSessions)
      .innerJoin(mentorshipRequests, eq(mentorshipSessions.mentorshipRequestId, mentorshipRequests.id))
      .where(eq(mentorshipRequests.studentId, studentId))
      .orderBy(mentorshipSessions.scheduledAt);
    return results;
  }

  async createMentorshipSession(insertSession: InsertMentorshipSession): Promise<MentorshipSession> {
    const [session] = await db
      .insert(mentorshipSessions)
      .values(insertSession)
      .returning();
    return session;
  }

  async updateMentorshipSession(
    id: number, 
    updates: Partial<InsertMentorshipSession>
  ): Promise<MentorshipSession | undefined> {
    const [session] = await db
      .update(mentorshipSessions)
      .set(updates)
      .where(eq(mentorshipSessions.id, id))
      .returning();
    return session || undefined;
  }

  // Master role request methods
  async getMasterRoleRequests(): Promise<MasterRoleRequest[]> {
    return await db.select().from(masterRoleRequests).orderBy(desc(masterRoleRequests.createdAt));
  }

  async getMasterRoleRequest(id: number): Promise<MasterRoleRequest | undefined> {
    const [request] = await db.select().from(masterRoleRequests).where(eq(masterRoleRequests.id, id));
    return request || undefined;
  }

  async getMasterRoleRequestsByMentor(mentorId: number): Promise<MasterRoleRequest[]> {
    return await db.select().from(masterRoleRequests).where(eq(masterRoleRequests.mentorId, mentorId)).orderBy(desc(masterRoleRequests.createdAt));
  }

  async getMasterRoleRequestsByStatus(status: string): Promise<MasterRoleRequest[]> {
    return await db.select().from(masterRoleRequests).where(eq(masterRoleRequests.status, status)).orderBy(desc(masterRoleRequests.createdAt));
  }

  async createMasterRoleRequest(request: InsertMasterRoleRequest): Promise<MasterRoleRequest> {
    const [newRequest] = await db.insert(masterRoleRequests).values(request).returning();
    return newRequest;
  }

  async updateMasterRoleRequestStatus(
    id: number, 
    status: string, 
    adminNotes?: string, 
    reviewedBy?: number
  ): Promise<MasterRoleRequest | undefined> {
    const updateData: any = {
      status,
      reviewedAt: new Date(),
      ...(adminNotes && { adminNotes }),
      ...(reviewedBy && { reviewedBy })
    };

    if (status === 'approved') {
      updateData.approvedAt = new Date();
    } else if (status === 'rejected') {
      updateData.rejectedAt = new Date();
    }

    const [request] = await db
      .update(masterRoleRequests)
      .set(updateData)
      .where(eq(masterRoleRequests.id, id))
      .returning();
    return request || undefined;
  }

  async promoteMentorToMaster(mentorId: number): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ isMaster: true })
      .where(eq(users.id, mentorId))
      .returning();
    return user || undefined;
  }

  // Staff request methods
  async getStaffRequests(): Promise<StaffRequest[]> {
    return await db.select().from(staffRequests).orderBy(desc(staffRequests.createdAt));
  }

  async getStaffRequest(id: number): Promise<StaffRequest | undefined> {
    const [request] = await db.select().from(staffRequests).where(eq(staffRequests.id, id));
    return request || undefined;
  }

  async getStaffRequestsByMentor(mentorId: number): Promise<StaffRequest[]> {
    return await db.select().from(staffRequests).where(eq(staffRequests.mentorId, mentorId)).orderBy(desc(staffRequests.createdAt));
  }

  async getStaffRequestsByClassroom(classroomId: number): Promise<StaffRequest[]> {
    return await db.select().from(staffRequests).where(eq(staffRequests.classroomId, classroomId)).orderBy(desc(staffRequests.createdAt));
  }

  async getStaffRequestsByStatus(status: string): Promise<StaffRequest[]> {
    return await db.select().from(staffRequests).where(eq(staffRequests.status, status)).orderBy(desc(staffRequests.createdAt));
  }

  async createStaffRequest(request: InsertStaffRequest): Promise<StaffRequest> {
    const [newRequest] = await db.insert(staffRequests).values(request).returning();
    return newRequest;
  }

  async updateStaffRequestStatus(
    id: number, 
    status: string, 
    adminNotes?: string, 
    reviewedBy?: number
  ): Promise<StaffRequest | undefined> {
    const updateData: any = {
      status,
      reviewedAt: new Date(),
      ...(adminNotes && { adminNotes }),
      ...(reviewedBy && { reviewedBy })
    };

    const [request] = await db
      .update(staffRequests)
      .set(updateData)
      .where(eq(staffRequests.id, id))
      .returning();
    return request || undefined;
  }

  async addStaffToClassroom(mentorId: number, classroomId: number): Promise<ClassroomMembership | undefined> {
    // Check if mentor is already staff in another classroom
    const existingStaffMembership = await db
      .select()
      .from(classroomMemberships)
      .where(
        and(
          eq(classroomMemberships.userId, mentorId),
          eq(classroomMemberships.role, 'staff'),
          eq(classroomMemberships.status, 'active')
        )
      );

    if (existingStaffMembership.length > 0) {
      throw new Error('Mentor can only be staff in one classroom at a time');
    }

    const [membership] = await db
      .insert(classroomMemberships)
      .values({
        userId: mentorId,
        classroomId: classroomId,
        role: 'staff',
        status: 'active'
      })
      .returning();
    return membership || undefined;
  }

  async getStaffClassroomByMentor(mentorId: number): Promise<any | undefined> {
    const [membership] = await db
      .select({
        classroomId: classroomMemberships.classroomId,
        classroomTitle: classrooms.title,
        classroomSubject: classrooms.subject,
        classroomDescription: classrooms.description,
        classroomLevel: classrooms.level,
        classroomMaxStudents: classrooms.maxStudents,
        masterName: users.firstName,
        joinedAt: classroomMemberships.joinedAt
      })
      .from(classroomMemberships)
      .innerJoin(classrooms, eq(classroomMemberships.classroomId, classrooms.id))
      .innerJoin(users, eq(classrooms.masterId, users.id))
      .where(
        and(
          eq(classroomMemberships.userId, mentorId),
          eq(classroomMemberships.role, 'staff'),
          eq(classroomMemberships.status, 'active')
        )
      );
    return membership || undefined;
  }
}

export const storage = new DatabaseStorage();
