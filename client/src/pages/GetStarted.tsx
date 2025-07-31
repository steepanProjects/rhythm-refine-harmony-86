import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  CheckCircle, 
  Play, 
  Users, 
  GraduationCap,
  BookOpen,
  Star, 
  ArrowRight, 
  Music, 
  Guitar, 
  Piano, 
  Drum, 
  Mic, 
  Music4,
  Target,
  Award,
  Video,
  Headphones,
  TrendingUp,
  Zap,
  UserPlus,
  LogIn,
  ChevronRight,
  Clock,
  DollarSign,
  Globe
} from "lucide-react";
import { useState } from "react";

const GetStarted = () => {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  const userPaths = [
    {
      id: "student",
      title: "I Want to Learn Music",
      subtitle: "Start as a Student",
      description: "Learn instruments, master techniques, and grow your musical skills with expert guidance",
      features: [
        "Access to 1000+ courses",
        "Learn from expert mentors",
        "Interactive practice tools",
        "Progress tracking",
        "Community support",
        "Flexible learning schedule"
      ],
      icon: GraduationCap,
      color: "bg-blue-500",
      gradient: "from-blue-500 to-purple-600",
      stats: {
        students: "50,000+",
        courses: "1,000+",
        satisfaction: "98%"
      }
    },
    {
      id: "mentor",
      title: "I Want to Teach Music",
      subtitle: "Start as a Mentor",
      description: "Share your musical expertise, build your teaching career, and inspire the next generation of musicians",
      features: [
        "Create and sell courses",
        "Build your student base",
        "Flexible teaching schedule",
        "Earn from your expertise",
        "Teaching tools & resources",
        "Mentor community support"
      ],
      icon: Users,
      color: "bg-green-500", 
      gradient: "from-green-500 to-teal-600",
      stats: {
        mentors: "500+",
        earnings: "$2,000+",
        rating: "4.9★"
      }
    }
  ];

  const whyChoose = {
    student: [
      {
        icon: Video,
        title: "HD Video Lessons",
        description: "Crystal clear instruction from professional musicians"
      },
      {
        icon: Target,
        title: "Personalized Learning",
        description: "Courses tailored to your skill level and goals"
      },
      {
        icon: Users,
        title: "Live Support",
        description: "Get help from instructors and fellow students"
      },
      {
        icon: Award,
        title: "Certificates",
        description: "Earn recognition for completing courses"
      }
    ],
    mentor: [
      {
        icon: DollarSign,
        title: "Earn Revenue",
        description: "Monetize your musical knowledge and skills"
      },
      {
        icon: Globe,
        title: "Global Reach",
        description: "Teach students from around the world"
      },
      {
        icon: Headphones,
        title: "Teaching Tools",
        description: "Professional tools to create engaging lessons"
      },
      {
        icon: TrendingUp,
        title: "Growth Support",
        description: "Marketing and analytics to grow your student base"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-white/20 text-white border-white/30">
              <Zap className="mr-2 h-4 w-4" />
              Join HarmonyLearn Community
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              Choose Your
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Musical Path
              </span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Whether you want to learn music or teach it, we have the perfect platform for your journey.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4">
        {/* Path Selection - Main Choice */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How do you want to get started?</h2>
            <p className="text-xl text-muted-foreground">Choose your role to personalize your experience</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {userPaths.map((path) => (
              <Card
                key={path.id}
                className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-musical overflow-hidden ${
                  selectedPath === path.id 
                    ? 'ring-2 ring-primary bg-primary/5' 
                    : 'hover:border-primary/50'
                }`}
                onClick={() => setSelectedPath(path.id)}
              >
                <div className={`h-2 bg-gradient-to-r ${path.gradient}`}></div>
                <CardHeader className="pb-4">
                  <div className="flex items-center mb-4">
                    <div className={`${path.color} p-3 rounded-lg mr-4`}>
                      <path.icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{path.title}</CardTitle>
                      <CardDescription className="text-lg">{path.subtitle}</CardDescription>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-base">{path.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    {path.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                    {Object.entries(path.stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="font-bold text-primary">{value}</div>
                        <div className="text-xs text-muted-foreground capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Authentication CTAs */}
          {selectedPath && (
            <div className="text-center mt-12 animate-slide-up">
              <div className="bg-muted/30 rounded-xl p-8 max-w-md mx-auto">
                <h3 className="text-2xl font-bold mb-4">
                  Ready to start as a {selectedPath === 'student' ? 'Student' : 'Mentor'}?
                </h3>
                <p className="text-muted-foreground mb-6">
                  {selectedPath === 'student' 
                    ? 'Create your account and begin your musical learning journey'
                    : 'Join our community of expert music teachers and start earning'
                  }
                </p>
                
                <div className="space-y-3">
                  <Button size="lg" className="w-full" asChild>
                     <Link to="/sign-up">
                      <UserPlus className="mr-2 h-5 w-5" />
                      Create Account
                    </Link>
                  </Button>
                  
                  <div className="flex items-center">
                    <div className="flex-1 border-t border-border"></div>
                    <span className="px-3 text-sm text-muted-foreground">or</span>
                    <div className="flex-1 border-t border-border"></div>
                  </div>
                  
                  <Button variant="outline" size="lg" className="w-full" asChild>
                    <Link to="/sign-in">
                      <LogIn className="mr-2 h-5 w-5" />
                      Sign In
                    </Link>
                  </Button>
                </div>
                
                <p className="text-xs text-muted-foreground mt-4">
                  Free to get started • No credit card required
                </p>
              </div>
            </div>
          )}
        </section>

        {/* Why Choose Section - Dynamic based on selection */}
        {selectedPath && (
          <section className="py-20 bg-muted/30 -mx-4 px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">
                Why Choose HarmonyLearn {selectedPath === 'student' ? 'for Learning' : 'for Teaching'}?
              </h2>
              <p className="text-xl text-muted-foreground">
                {selectedPath === 'student' 
                  ? 'Everything you need to master music'
                  : 'All the tools you need to build your teaching business'
                }
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyChoose[selectedPath as keyof typeof whyChoose].map((benefit, index) => (
                <div key={index} className="text-center group">
                  <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                    <benefit.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Final CTA */}
        <section className="py-20">
          <Card className="p-12 text-center bg-gradient-hero">
            <div className="max-w-3xl mx-auto text-white">
              <h2 className="text-4xl font-bold mb-4">
                {selectedPath === 'student' ? 'Start Learning Today' : 
                 selectedPath === 'mentor' ? 'Start Teaching Today' : 
                 'Ready to Join HarmonyLearn?'}
              </h2>
              <p className="text-xl opacity-90 mb-8">
                {selectedPath === 'student' 
                  ? 'Join over 50,000 students who are mastering music with our expert instructors.'
                  : selectedPath === 'mentor'
                  ? 'Join over 500 expert mentors who are building successful teaching careers.'
                  : 'Choose your path and start your musical journey today.'
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
                  <Link to="/sign-up">
                    <UserPlus className="mr-2 h-5 w-5" />
                    Get Started Free
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10" asChild>
                  <Link to={selectedPath === 'student' ? '/courses' : '/mentors'}>
                    <ChevronRight className="mr-2 h-5 w-5" />
                    {selectedPath === 'student' ? 'Browse Courses' : 'See Mentors'}
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default GetStarted;