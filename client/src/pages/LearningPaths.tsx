import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, Users, Star, CheckCircle, PlayCircle, BookOpen, Trophy, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const learningPaths = [
  {
    id: 1,
    title: "Complete Beginner to Piano Player",
    description: "Start from absolute zero and build a solid foundation in piano playing with proper technique and music theory.",
    duration: "6 months",
    lessons: 48,
    students: "12,500+",
    difficulty: "Beginner",
    rating: 4.9,
    progress: 0,
    image: "/placeholder.svg",
    skills: ["Basic chords", "Sheet reading", "Finger techniques", "Simple songs"],
    instructor: "Dr. Sarah Williams",
    price: "Free"
  },
  {
    id: 2,
    title: "Guitar Mastery: From Chords to Solos",
    description: "Learn guitar from basic chords to advanced soloing techniques. Perfect for aspiring rock and blues guitarists.",
    duration: "8 months",
    lessons: 64,
    students: "8,200+",
    difficulty: "Beginner to Intermediate",
    rating: 4.8,
    progress: 25,
    image: "/placeholder.svg",
    skills: ["Power chords", "Scales", "Lead guitar", "Song composition"],
    instructor: "Marcus Johnson",
    price: "$29/month"
  },
  {
    id: 3,
    title: "Vocal Performance & Technique",
    description: "Develop your voice with professional techniques used by recording artists and stage performers.",
    duration: "4 months",
    lessons: 32,
    students: "5,800+",
    difficulty: "All Levels",
    rating: 5.0,
    progress: 0,
    image: "/placeholder.svg",
    skills: ["Breath control", "Pitch accuracy", "Performance skills", "Vocal health"],
    instructor: "Elena Rodriguez",
    price: "$39/month"
  },
  {
    id: 4,
    title: "Music Production & Recording",
    description: "Learn to produce, mix, and master your own music using professional DAW software and techniques.",
    duration: "10 months",
    lessons: 80,
    students: "3,400+",
    difficulty: "Intermediate",
    rating: 4.7,
    progress: 0,
    image: "/placeholder.svg",
    skills: ["DAW mastery", "Mixing", "Mastering", "Sound design"],
    instructor: "Alex Chen",
    price: "$49/month"
  },
  {
    id: 5,
    title: "Jazz Theory & Improvisation",
    description: "Master jazz harmony, chord progressions, and improvisation techniques used by professional jazz musicians.",
    duration: "12 months",
    lessons: 96,
    students: "2,100+",
    difficulty: "Advanced",
    rating: 4.9,
    progress: 0,
    image: "/placeholder.svg",
    skills: ["Jazz harmony", "Improvisation", "Chord substitutions", "Advanced theory"],
    instructor: "Prof. Michael Davis",
    price: "$59/month"
  },
  {
    id: 6,
    title: "Songwriter's Complete Guide",
    description: "Learn to write compelling songs from melody and lyrics to arrangement and production.",
    duration: "6 months",
    lessons: 48,
    students: "4,700+",
    difficulty: "Intermediate",
    rating: 4.8,
    progress: 0,
    image: "/placeholder.svg",
    skills: ["Melody writing", "Lyric composition", "Song structure", "Collaboration"],
    instructor: "Jessica Taylor",
    price: "$34/month"
  }
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Beginner":
      return "bg-green-100 text-green-800 border-green-200";
    case "Intermediate":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "Advanced":
      return "bg-red-100 text-red-800 border-red-200";
    case "All Levels":
      return "bg-blue-100 text-blue-800 border-blue-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const LearningPaths = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            Structured Learning Paths
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Follow carefully designed learning journeys created by expert musicians. 
            Each path takes you from where you are to where you want to be, step by step.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" variant="secondary" className="shadow-warm">
              <PlayCircle className="mr-2 h-5 w-5" />
              Start Learning Today
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
              View All Paths
            </Button>
          </div>
        </div>
      </section>

      {/* Learning Paths Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Choose Your Musical Journey</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Each learning path is designed to take you from beginner to proficient, 
              with clear milestones and expert guidance along the way.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {learningPaths.map((path) => (
              <Card key={path.id} className="group hover:shadow-musical transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge className={getDifficultyColor(path.difficulty)}>
                      {path.difficulty}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-secondary text-secondary" />
                      <span className="text-sm font-medium">{path.rating}</span>
                    </div>
                  </div>
                  
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {path.title}
                  </CardTitle>
                  
                  <CardDescription className="text-base">
                    {path.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  {/* Progress bar for started courses */}
                  {path.progress > 0 && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{path.progress}%</span>
                      </div>
                      <Progress value={path.progress} className="h-2" />
                    </div>
                  )}

                  {/* Course Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{path.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <span>{path.lessons} lessons</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{path.students}</span>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">You'll learn:</p>
                    <div className="flex flex-wrap gap-1">
                      {path.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Instructor */}
                  <div className="text-sm text-muted-foreground mb-4">
                    Instructor: <span className="font-medium text-foreground">{path.instructor}</span>
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-bold text-primary">
                      {path.price}
                    </div>
                    <Button className="shadow-musical" asChild>
                      <Link to={`/learning-paths/${path.id}`}>
                        {path.progress > 0 ? 'Continue' : 'Start Path'}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Structured Learning?</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-none bg-transparent">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Clear Progression</h3>
                <p className="text-muted-foreground">
                  Follow a proven path with clear milestones and achievements to track your progress.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-none bg-transparent">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-warm rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Expert Guidance</h3>
                <p className="text-muted-foreground">
                  Learn from professional musicians who have designed each step for maximum effectiveness.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-none bg-transparent">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-cool rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Community Support</h3>
                <p className="text-muted-foreground">
                  Connect with fellow learners on the same path and share your musical journey.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LearningPaths;