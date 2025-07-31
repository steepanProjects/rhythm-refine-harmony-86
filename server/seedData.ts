import { storage } from "./storage";
import type { InsertUser, InsertLearningPath, InsertLiveSession, InsertMentorProfile } from "@shared/schema";

export async function seedDatabase() {
  console.log("Seeding database with sample data...");

  try {
    // Create mentor users
    const mentorJohnson: InsertUser = {
      username: "marcus_johnson",
      password: "password123",
      email: "marcus@harmonylearn.com",
      role: "mentor",
      firstName: "Marcus",
      lastName: "Johnson",
      bio: "Jazz pianist with 15+ years of experience",
      xp: 5000,
      level: 10,
    };

    const mentorChen: InsertUser = {
      username: "sarah_chen",
      password: "password123",
      email: "sarah@harmonylearn.com",
      role: "mentor",
      firstName: "Sarah",
      lastName: "Chen",
      bio: "Guitar virtuoso specializing in fingerpicking techniques",
      xp: 4500,
      level: 9,
    };

    const mentorVolkov: InsertUser = {
      username: "elena_volkov",
      password: "password123",
      email: "elena@harmonylearn.com",
      role: "mentor",
      firstName: "Elena",
      lastName: "Volkov",
      bio: "Classical violin master with conservatory training",
      xp: 6000,
      level: 12,
    };

    const mentorRodriguez: InsertUser = {
      username: "alex_rodriguez",
      password: "password123",
      email: "alex@harmonylearn.com",
      role: "mentor",
      firstName: "Alex",
      lastName: "Rodriguez",
      bio: "Professional drummer with rock and jazz experience",
      xp: 4200,
      level: 8,
    };

    const mentorWhite: InsertUser = {
      username: "diana_white",
      password: "password123",
      email: "diana@harmonylearn.com",
      role: "mentor",
      firstName: "Diana",
      lastName: "White",
      bio: "Vocal coach and performance artist",
      xp: 4800,
      level: 9,
    };

    // Insert mentor users
    const createdMentors = await Promise.all([
      storage.createUser(mentorJohnson),
      storage.createUser(mentorChen),
      storage.createUser(mentorVolkov),
      storage.createUser(mentorRodriguez),
      storage.createUser(mentorWhite),
    ]);

    console.log(`Created ${createdMentors.length} mentor users`);

    // Create mentor profiles
    const mentorProfiles: InsertMentorProfile[] = [
      {
        userId: createdMentors[0].id,
        specialization: "Jazz Piano",
        experience: "15+ years",
        hourlyRate: "$75",
        location: "New York, NY",
        languages: ["English", "Spanish"],
        badges: ["Jazz Expert", "Verified Teacher", "Top Rated"],
        bio: "Marcus brings over 15 years of professional jazz piano experience to his teaching. He's performed with Grammy-nominated artists and specializes in advanced chord progressions and improvisation techniques.",
        availability: "Available",
        totalStudents: 342,
        totalReviews: 127,
        averageRating: "4.9",
        isVerified: true,
      },
      {
        userId: createdMentors[1].id,
        specialization: "Acoustic Guitar",
        experience: "12+ years",
        hourlyRate: "$60",
        location: "Los Angeles, CA",
        languages: ["English", "Mandarin"],
        badges: ["Guitar Master", "Verified Teacher"],
        bio: "Sarah is a master of fingerpicking techniques and acoustic guitar. She's toured internationally and brings a unique blend of classical and contemporary styles to her teaching.",
        availability: "Available",
        totalStudents: 218,
        totalReviews: 89,
        averageRating: "4.8",
        isVerified: true,
      },
      {
        userId: createdMentors[2].id,
        specialization: "Classical Violin",
        experience: "20+ years",
        hourlyRate: "$85",
        location: "Boston, MA",
        languages: ["English", "Russian", "German"],
        badges: ["Classical Master", "Conservatory Trained", "Top Rated"],
        bio: "Elena trained at the Moscow Conservatory and has performed with major orchestras worldwide. She specializes in classical technique, vibrato, and performance preparation.",
        availability: "Available",
        totalStudents: 156,
        totalReviews: 78,
        averageRating: "4.9",
        isVerified: true,
      },
      {
        userId: createdMentors[3].id,
        specialization: "Drums",
        experience: "10+ years",
        hourlyRate: "$65",
        location: "Nashville, TN",
        languages: ["English"],
        badges: ["Rhythm Master", "Studio Pro"],
        bio: "Alex has recorded with major label artists and brings professional studio experience to his teaching. He specializes in rock, jazz, and Latin rhythms.",
        availability: "Available",
        totalStudents: 289,
        totalReviews: 112,
        averageRating: "4.7",
        isVerified: true,
      },
      {
        userId: createdMentors[4].id,
        specialization: "Vocals",
        experience: "8+ years",
        hourlyRate: "$70",
        location: "Nashville, TN",
        languages: ["English", "Italian"],
        badges: ["Vocal Expert", "Performance Coach"],
        bio: "Diana is a professional vocalist and performance coach who has worked with recording artists. She specializes in breath control, technique, and stage presence.",
        availability: "Available",
        totalStudents: 203,
        totalReviews: 95,
        averageRating: "4.8",
        isVerified: true,
      },
    ];

    const createdProfiles = await Promise.all(
      mentorProfiles.map(profile => storage.createMentorProfile(profile))
    );

    console.log(`Created ${createdProfiles.length} mentor profiles`);

    // Create learning paths
    const learningPaths: InsertLearningPath[] = [
      {
        title: "Complete Beginner to Piano Player",
        description: "Start from absolute zero and build a solid foundation in piano playing with proper technique and music theory.",
        duration: "6 months",
        lessonsCount: 48,
        difficulty: "beginner",
        price: "Free",
        rating: "4.9",
        enrolledCount: 12500,
        instructorId: createdMentors[0].id,
        imageUrl: "/placeholder.svg",
        skills: ["Basic chords", "Sheet reading", "Finger techniques", "Simple songs"],
        isActive: true,
      },
      {
        title: "Guitar Mastery: From Chords to Solos",
        description: "Learn guitar from basic chords to advanced soloing techniques. Perfect for aspiring rock and blues guitarists.",
        duration: "8 months",
        lessonsCount: 64,
        difficulty: "intermediate",
        price: "$29/month",
        rating: "4.8",
        enrolledCount: 8200,
        instructorId: createdMentors[1].id,
        imageUrl: "/placeholder.svg",
        skills: ["Power chords", "Scales", "Lead guitar", "Song composition"],
        isActive: true,
      },
      {
        title: "Vocal Performance & Technique",
        description: "Develop your voice with professional techniques used by recording artists and stage performers.",
        duration: "4 months",
        lessonsCount: 32,
        difficulty: "all-levels",
        price: "$39/month",
        rating: "5.0",
        enrolledCount: 5800,
        instructorId: createdMentors[4].id,
        imageUrl: "/placeholder.svg",
        skills: ["Breath control", "Pitch accuracy", "Performance skills", "Vocal health"],
        isActive: true,
      },
      {
        title: "Classical Violin Fundamentals",
        description: "Master the fundamentals of classical violin with proper posture, bowing technique, and musical expression.",
        duration: "10 months",
        lessonsCount: 80,
        difficulty: "beginner",
        price: "$45/month",
        rating: "4.9",
        enrolledCount: 3200,
        instructorId: createdMentors[2].id,
        imageUrl: "/placeholder.svg",
        skills: ["Proper posture", "Bowing technique", "Scales", "Classical repertoire"],
        isActive: true,
      },
      {
        title: "Drum Fundamentals & Groove Building",
        description: "Build solid drum fundamentals and learn to create compelling grooves across multiple genres.",
        duration: "5 months",
        lessonsCount: 40,
        difficulty: "beginner",
        price: "$35/month",
        rating: "4.7",
        enrolledCount: 4100,
        instructorId: createdMentors[3].id,
        imageUrl: "/placeholder.svg",
        skills: ["Basic beats", "Fill patterns", "Genre styles", "Timing"],
        isActive: true,
      },
    ];

    const createdPaths = await Promise.all(
      learningPaths.map(path => storage.createLearningPath(path))
    );

    console.log(`Created ${createdPaths.length} learning paths`);

    // Create live sessions
    const liveSessions: InsertLiveSession[] = [
      {
        title: "Jazz Piano Masterclass: Advanced Chord Progressions",
        description: "Explore complex jazz chord progressions and learn to improvise like the masters.",
        mentorId: createdMentors[0].id,
        scheduledAt: new Date(Date.now() + 3 * 60 * 60 * 1000), // 3 hours from now
        duration: 120,
        maxParticipants: 100,
        status: "scheduled",
      },
      {
        title: "Guitar Fingerpicking Techniques for Beginners",
        description: "Learn the fundamentals of fingerpicking with exercises and popular song examples.",
        mentorId: createdMentors[1].id,
        scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
        duration: 90,
        maxParticipants: 200,
        status: "scheduled",
      },
      {
        title: "Violin Vibrato Workshop",
        description: "Master the art of vibrato with step-by-step guidance and practice exercises.",
        mentorId: createdMentors[2].id,
        scheduledAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
        duration: 60,
        maxParticipants: 80,
        status: "scheduled",
      },
      {
        title: "Drum Patterns & Groove Building",
        description: "Live session on creating compelling drum patterns and developing groove.",
        mentorId: createdMentors[3].id,
        scheduledAt: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago (live now)
        duration: 90,
        maxParticipants: 150,
        status: "live",
      },
      {
        title: "Vocal Warm-ups & Breathing Techniques",
        description: "Essential warm-up exercises and breathing techniques for healthy singing.",
        mentorId: createdMentors[4].id,
        scheduledAt: new Date(Date.now() - 40 * 60 * 1000), // 40 minutes ago (live now)
        duration: 60,
        maxParticipants: 100,
        status: "live",
      },
    ];

    const createdSessions = await Promise.all(
      liveSessions.map(session => storage.createLiveSession(session))
    );

    console.log(`Created ${createdSessions.length} live sessions`);

    console.log("Database seeding completed successfully!");

    return {
      mentors: createdMentors,
      mentorProfiles: createdProfiles,
      learningPaths: createdPaths,
      liveSessions: createdSessions,
    };

  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}