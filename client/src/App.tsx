import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router, Route, Switch } from "wouter";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import Courses from "./pages/Courses";
import { LearningPaths } from "./pages/LearningPaths";
import NotFound from "./pages/NotFound";
import { MentorPage } from "./pages/MentorPage";
import { LiveSessions } from "./pages/LiveSessions";
import { AdminPanel } from "./pages/AdminPanel";
import Community from "./pages/Community";
import Tools from "./pages/Tools";
import About from "./pages/About";
import GetStarted from "./pages/GetStarted";
import StudentSignIn from "./pages/StudentSignIn";
import StudentSignUp from "./pages/StudentSignUp";
import MentorSignIn from "./pages/MentorSignIn";
import MentorSignUp from "./pages/MentorSignUp";
import Classroom from "./pages/Classroom";
import ClassroomDashboard from "./pages/ClassroomDashboard";
import ClassroomManage from "./pages/ClassroomManage";
import LiveClass from "./pages/LiveClass";
import MentorDashboard from "./pages/MentorDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import StudentCourses from "./pages/StudentCourses";
import StudentProgress from "./pages/StudentProgress";
import StudentSessions from "./pages/StudentSessions";
import StudentAchievements from "./pages/StudentAchievements";
import StudentCommunity from "./pages/StudentCommunity";
import StudentTools from "./pages/StudentTools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const url = Array.isArray(queryKey) ? queryKey[0] : queryKey;
        const response = await fetch(url as string);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      },
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router>
          <Switch>
            <Route path="/" component={Index} />
            <Route path="/get-started" component={GetStarted} />
            <Route path="/sign-in" component={StudentSignIn} />
            <Route path="/sign-up" component={StudentSignUp} />
            <Route path="/student-signin" component={StudentSignIn} />
            <Route path="/student-signup" component={StudentSignUp} />
            <Route path="/mentor-signin" component={MentorSignIn} />
            <Route path="/mentor-signup" component={MentorSignUp} />
            <Route path="/courses" component={Courses} />
            <Route path="/learning-paths" component={LearningPaths} />
            <Route path="/mentors" component={MentorPage} />
            <Route path="/live-sessions" component={LiveSessions} />
            <Route path="/community" component={Community} />
            <Route path="/tools" component={Tools} />
            <Route path="/about" component={About} />
            <Route path="/admin" component={AdminPanel} />
            <Route path="/classroom" component={Classroom} />
            <Route path="/classroom/dashboard/:id" component={ClassroomDashboard} />
            <Route path="/classroom/manage" component={ClassroomManage} />
            <Route path="/classroom/live/:id" component={LiveClass} />
            <Route path="/mentor-dashboard" component={MentorDashboard} />
            <Route path="/student-dashboard" component={StudentDashboard} />
            <Route path="/student-courses" component={StudentCourses} />
            <Route path="/student-progress" component={StudentProgress} />
            <Route path="/student-sessions" component={StudentSessions} />
            <Route path="/student-achievements" component={StudentAchievements} />
            <Route path="/student-community" component={StudentCommunity} />
            <Route path="/student-tools" component={StudentTools} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
