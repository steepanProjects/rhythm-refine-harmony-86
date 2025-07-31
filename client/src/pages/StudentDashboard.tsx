import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar, 
  BookOpen, 
  Star, 
  Trophy, 
  TrendingUp, 
  Clock, 
  Play,
  Plus,
  Video,
  FileText,
  Award,
  Settings,
  Users,
  Target,
  Headphones,
  Music
} from "lucide-react";

interface StudentStats {
  coursesEnrolled: number;
  coursesCompleted: number;
  totalStudyHours: number;
  averageProgress: number;
  certificatesEarned: number;
  currentStreak: number;
}

interface EnrolledCourse {
  id: number;
  title: string;
  instructor: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  nextLesson: string;
  category: string;
  rating: number;
  thumbnail: string;
}

interface UpcomingSession {
  id: number;
  title: string;
  instructor: string;
  date: string;
  time: string;
  type: 'live' | 'practice' | 'assessment';
  status: 'scheduled' | 'ongoing' | 'completed';
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  earnedDate: string;
  category: 'progress' | 'skill' | 'participation';
}

const StudentDashboard = () => {
  // Get current user from localStorage
  const [currentUser] = useState(() => {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  });

  // Fetch student enrollments
  const { data: enrollments = [] } = useQuery<any[]>({
    queryKey: ['/api/enrollments', { student: currentUser?.id }],
    enabled: !!currentUser?.id
  });

  // Fetch student courses
  const { data: studentCourses = [] } = useQuery<any[]>({
    queryKey: ['/api/courses', { enrolled: currentUser?.id }],
    enabled: !!currentUser?.id
  });

  // Fetch upcoming sessions
  const { data: upcomingSessions = [] } = useQuery<any[]>({
    queryKey: ['/api/live-sessions', { student: currentUser?.id, upcoming: true }],
    enabled: !!currentUser?.id
  });

  // Calculate student stats from real data
  const stats: StudentStats = {
    coursesEnrolled: enrollments.length,
    coursesCompleted: enrollments.filter((e: any) => e.completionPercentage === 100).length,
    totalStudyHours: enrollments.reduce((total: number, e: any) => total + (e.studyHours || 0), 0),
    averageProgress: enrollments.length > 0 ? 
      enrollments.reduce((total: number, e: any) => total + (e.completionPercentage || 0), 0) / enrollments.length : 0,
    certificatesEarned: enrollments.filter((e: any) => e.certificateEarned).length,
    currentStreak: 7 // This would come from actual tracking
  };

  // Transform enrollment data into course cards
  const enrolledCourses: EnrolledCourse[] = enrollments.map((enrollment: any) => ({
    id: enrollment.courseId,
    title: enrollment.courseTitle || 'Course Title',
    instructor: enrollment.instructorName || 'Instructor',
    progress: enrollment.completionPercentage || 0,
    totalLessons: enrollment.totalLessons || 10,
    completedLessons: enrollment.completedLessons || 0,
    nextLesson: enrollment.nextLesson || 'Introduction',
    category: enrollment.category || 'Music',
    rating: enrollment.courseRating || 4.5,
    thumbnail: enrollment.thumbnail || ''
  }));

  // Sample achievements - in real app would come from API
  const [achievements] = useState<Achievement[]>([
    {
      id: 1,
      title: "First Course Started",
      description: "Enrolled in your first music course",
      icon: "🎵",
      earnedDate: "2025-01-15",
      category: 'progress'
    },
    {
      id: 2,
      title: "Week Warrior",
      description: "Practiced for 7 consecutive days",
      icon: "🔥",
      earnedDate: "2025-01-20",
      category: 'participation'
    },
    {
      id: 3,
      title: "Scale Master",
      description: "Completed all basic scale exercises",
      icon: "🎼",
      earnedDate: "2025-01-25",
      category: 'skill'
    }
  ]);

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 20) return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'piano': return <Music className="h-4 w-4" />;
      case 'guitar': return <Music className="h-4 w-4" />;
      case 'violin': return <Music className="h-4 w-4" />;
      case 'drums': return <Music className="h-4 w-4" />;
      case 'vocals': return <Headphones className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Welcome Section */}
      <section className="py-8 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="" />
                <AvatarFallback className="text-lg font-bold">
                  {currentUser?.firstName?.[0]}{currentUser?.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Welcome back, {currentUser?.firstName}!
                </h1>
                <p className="text-white/80">Ready to continue your musical journey?</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="secondary" className="gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </Button>
              <Button 
                variant="outline" 
                className="gap-2 bg-white/10 border-white/30 text-white hover:bg-white/20"
                onClick={() => {
                  localStorage.removeItem("userRole");
                  localStorage.removeItem("currentUser");
                  window.location.href = "/";
                }}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{stats.coursesEnrolled}</p>
                  <p className="text-xs text-muted-foreground">Courses Enrolled</p>
                </div>
                <BookOpen className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{stats.coursesCompleted}</p>
                  <p className="text-xs text-muted-foreground">Completed</p>
                </div>
                <Trophy className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{Math.round(stats.averageProgress)}%</p>
                  <p className="text-xs text-muted-foreground">Avg Progress</p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{stats.totalStudyHours}h</p>
                  <p className="text-xs text-muted-foreground">Study Hours</p>
                </div>
                <Clock className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{stats.certificatesEarned}</p>
                  <p className="text-xs text-muted-foreground">Certificates</p>
                </div>
                <Award className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{stats.currentStreak}</p>
                  <p className="text-xs text-muted-foreground">Day Streak</p>
                </div>
                <Target className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="sessions">Live Sessions</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>

          {/* My Courses Tab */}
          <TabsContent value="courses">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">My Courses</h2>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Browse Courses
                </Button>
              </div>
              
              {enrolledCourses.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">No courses enrolled yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Start your musical journey by enrolling in your first course!
                    </p>
                    <Button>Browse Available Courses</Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {enrolledCourses.map((course) => (
                    <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          {getCategoryIcon(course.category)}
                        </div>
                        <Badge className="absolute top-2 right-2 bg-white/90 text-black">
                          {course.progress}%
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2 line-clamp-2">{course.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          by {course.instructor}
                        </p>
                        
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Progress</span>
                              <span>{course.progress}%</span>
                            </div>
                            <Progress value={course.progress} className="h-2" />
                          </div>
                          
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span>{course.rating}</span>
                            </div>
                          </div>
                          
                          <Button className="w-full gap-2">
                            <Play className="h-4 w-4" />
                            Continue: {course.nextLesson}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Live Sessions Tab */}
          <TabsContent value="sessions">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Live Sessions</h2>
                <Button variant="outline" className="gap-2">
                  <Calendar className="h-4 w-4" />
                  Schedule Session
                </Button>
              </div>
              
              {upcomingSessions.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <Video className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">No upcoming sessions</h3>
                    <p className="text-muted-foreground mb-4">
                      Schedule a live session with your mentor to accelerate your learning!
                    </p>
                    <Button>Book a Session</Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {upcomingSessions.map((session: any) => (
                    <Card key={session.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                              <Video className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{session.title}</h3>
                              <p className="text-muted-foreground">with {session.instructor}</p>
                              <p className="text-sm text-muted-foreground">
                                {session.date} at {session.time}
                              </p>
                            </div>
                          </div>
                          <Badge variant="outline">{session.type}</Badge>
                          <Button>Join Session</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Learning Progress</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Overall Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span>Course Completion</span>
                          <span>{Math.round(stats.averageProgress)}%</span>
                        </div>
                        <Progress value={stats.averageProgress} className="h-3" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 pt-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-green-600">{stats.coursesCompleted}</p>
                          <p className="text-sm text-muted-foreground">Completed</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-blue-600">{stats.coursesEnrolled - stats.coursesCompleted}</p>
                          <p className="text-sm text-muted-foreground">In Progress</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Study Analytics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Total Study Time</span>
                        <span className="font-semibold">{stats.totalStudyHours} hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Current Streak</span>
                        <span className="font-semibold">{stats.currentStreak} days</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Certificates Earned</span>
                        <span className="font-semibold">{stats.certificatesEarned}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Achievements</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements.map((achievement) => (
                  <Card key={achievement.id} className="overflow-hidden">
                    <CardContent className="p-6 text-center">
                      <div className="text-4xl mb-3">{achievement.icon}</div>
                      <h3 className="font-semibold mb-2">{achievement.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {achievement.description}
                      </p>
                      <Badge variant="outline">
                        Earned {new Date(achievement.earnedDate).toLocaleDateString()}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Community Tab */}
          <TabsContent value="community">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Community</h2>
              
              <Card>
                <CardContent className="text-center py-12">
                  <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">Connect with Fellow Musicians</h3>
                  <p className="text-muted-foreground mb-4">
                    Join discussions, share your progress, and learn from other students!
                  </p>
                  <Button>Explore Community</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default StudentDashboard;