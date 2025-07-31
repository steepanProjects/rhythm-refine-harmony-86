import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { EmptyState } from "@/components/EmptyState";
import { Search, Filter, Clock, Star, Users, BookOpen, TrendingUp, Award, Target, Zap, Guitar, Piano, Drum, Mic, Music4, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CourseCard } from "@/components/CourseCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";

const Courses = () => {
  const { data: courses = [], isLoading: coursesLoading } = useQuery({
    queryKey: ['/api/courses'],
  });

  const categories = [
    { icon: Piano, name: "Piano", count: courses.filter(c => c.category === "Piano").length, color: "text-blue-500", bgColor: "bg-blue-500/10" },
    { icon: Guitar, name: "Guitar", count: courses.filter(c => c.category === "Guitar").length, color: "text-green-500", bgColor: "bg-green-500/10" },
    { icon: Music4, name: "Violin", count: courses.filter(c => c.category === "Violin").length, color: "text-purple-500", bgColor: "bg-purple-500/10" },
    { icon: Drum, name: "Drums", count: courses.filter(c => c.category === "Drums").length, color: "text-red-500", bgColor: "bg-red-500/10" },
    { icon: Mic, name: "Vocals", count: courses.filter(c => c.category === "Vocals").length, color: "text-yellow-500", bgColor: "bg-yellow-500/10" },
    { icon: Music, name: "Theory", count: courses.filter(c => c.category === "Theory").length, color: "text-indigo-500", bgColor: "bg-indigo-500/10" }
  ];

  const featuredCourses = courses.filter(course => course.featured) || [];
  const popularCourses = courses.filter(course => course.enrolledCount > 5000) || [];
  const beginnerCourses = courses.filter(course => course.level === "beginner") || [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section with Enhanced Design */}
      <div className="relative bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-white/20 text-white border-white/30">
              <Award className="mr-2 h-4 w-4" />
              1000+ Premium Courses
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              Master Your Musical
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Journey
              </span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10">
              Learn from world-renowned musicians with our comprehensive library of interactive courses
            </p>
            
            {/* Enhanced Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-muted-foreground" />
                <Input
                  placeholder="What instrument would you like to master today?"
                  className="pl-12 pr-4 h-14 text-lg bg-white/95 backdrop-blur border-0 shadow-xl"
                />
                <Button variant="hero" size="lg" className="absolute right-2 top-2 bottom-2">
                  <Filter className="mr-2 h-5 w-5" />
                  Search
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-md mx-auto text-white">
              <div className="text-center">
                <div className="text-2xl font-bold">500K+</div>
                <div className="text-sm opacity-90">Students</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">1000+</div>
                <div className="text-sm opacity-90">Courses</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">4.9★</div>
                <div className="text-sm opacity-90">Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Instrument Categories with Modern Design */}
        <div className="py-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Choose Your Instrument</h2>
            <p className="text-xl text-muted-foreground">Start your musical journey with expert-led courses</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Card
                key={category.name}
                className="group p-6 text-center hover:shadow-musical transition-all duration-300 hover:scale-105 cursor-pointer border-2 hover:border-primary/20"
              >
                <div className={`p-4 rounded-xl ${category.bgColor} mb-4 mx-auto w-fit group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className={`h-8 w-8 ${category.color}`} />
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground">{category.count} courses</p>
                <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="outline" size="sm">Explore</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Course Tabs with Different Collections */}
        <div className="py-16">
          <Tabs defaultValue="featured" className="w-full">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">Discover Courses</h2>
                <p className="text-muted-foreground">Curated collections for every learning path</p>
              </div>
              <TabsList className="grid w-full md:w-auto grid-cols-3 mt-4 md:mt-0">
                <TabsTrigger value="featured" className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  Featured
                </TabsTrigger>
                <TabsTrigger value="popular" className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Popular
                </TabsTrigger>
                <TabsTrigger value="beginner" className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Beginner
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="featured" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredCourses.map((course) => (
                  <CourseCard key={course.id} {...course} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="popular" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {popularCourses.map((course) => (
                  <CourseCard key={course.id} {...course} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="beginner" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {beginnerCourses.map((course) => (
                  <CourseCard key={course.id} {...course} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Learning Path Suggestions */}
        <div className="py-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Recommended Learning Paths</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 text-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
              <div className="p-4 bg-blue-500 rounded-full w-fit mx-auto mb-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Beginner's Journey</h3>
              <p className="text-muted-foreground mb-4">Perfect for absolute beginners starting their musical adventure</p>
              <Button variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50">
                Start Learning
              </Button>
            </Card>

            <Card className="p-8 text-center bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
              <div className="p-4 bg-green-500 rounded-full w-fit mx-auto mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Skill Booster</h3>
              <p className="text-muted-foreground mb-4">Level up your existing skills with advanced techniques</p>
              <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-50">
                Level Up
              </Button>
            </Card>

            <Card className="p-8 text-center bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20 border-purple-200 dark:border-purple-800">
              <div className="p-4 bg-purple-500 rounded-full w-fit mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">Master Class</h3>
              <p className="text-muted-foreground mb-4">Professional-level courses for serious musicians</p>
              <Button variant="outline" className="border-purple-500 text-purple-600 hover:bg-purple-50">
                Go Pro
              </Button>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="py-16">
          <Card className="p-12 text-center bg-gradient-hero">
            <div className="max-w-2xl mx-auto text-white">
              <h3 className="text-3xl font-bold mb-4">Ready to Start Your Musical Journey?</h3>
              <p className="text-xl opacity-90 mb-8">Join thousands of students learning from world-class instructors</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-white/90">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Browse All Courses
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  Start Free Trial
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Courses;