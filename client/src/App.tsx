import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import Courses from "./pages/Courses";
import LearningPaths from "./pages/LearningPaths";
import NotFound from "./pages/NotFound";
import { MentorPage } from "./pages/MentorPage";
import { LiveSessions } from "./pages/LiveSessions";
import { AdminPanel } from "./pages/AdminPanel";
import Community from "./pages/Community";
import Tools from "./pages/Tools";
import About from "./pages/About";
import GetStarted from "./pages/GetStarted";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import StudentSignIn from "./pages/StudentSignIn";
import StudentSignUp from "./pages/StudentSignUp";
import MentorSignIn from "./pages/MentorSignIn";
import MentorSignUp from "./pages/MentorSignUp";
import Classroom from "./pages/Classroom";
import ClassroomDashboard from "./pages/ClassroomDashboard";
import ClassroomManage from "./pages/ClassroomManage";
import LiveClass from "./pages/LiveClass";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/get-started" element={<GetStarted />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/student-signin" element={<StudentSignIn />} />
            <Route path="/student-signup" element={<StudentSignUp />} />
            <Route path="/mentor-signin" element={<MentorSignIn />} />
            <Route path="/mentor-signup" element={<MentorSignUp />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/learning-paths" element={<LearningPaths />} />
            <Route path="/mentors" element={<MentorPage />} />
            <Route path="/live-sessions" element={<LiveSessions />} />
            <Route path="/community" element={<Community />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/classroom" element={<Classroom />} />
            <Route path="/classroom/dashboard/:id" element={<ClassroomDashboard />} />
            <Route path="/classroom/manage" element={<ClassroomManage />} />
            <Route path="/classroom/live/:id" element={<LiveClass />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
