import { Star, MapPin, Clock, Video, Calendar, MessageCircle, Award, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const MentorPage = () => {
  const mentors = [
    {
      id: 1,
      name: "Marcus Johnson",
      specialization: "Jazz Piano",
      rating: 4.9,
      reviews: 847,
      students: 1240,
      experience: "15+ years",
      hourlyRate: "$75",
      location: "New York, USA",
      languages: ["English", "Spanish"],
      badges: ["Top Mentor", "Jazz Expert", "Performance Coach"],
      bio: "Professional jazz pianist with performances at Lincoln Center and Blue Note. Specializes in improvisation and advanced chord progressions.",
      availability: "Available",
      nextSession: "Today 3:00 PM"
    },
    {
      id: 2,
      name: "Sarah Chen",
      specialization: "Classical & Acoustic Guitar",
      rating: 4.8,
      reviews: 623,
      students: 890,
      experience: "12+ years",
      hourlyRate: "$60",
      location: "California, USA",
      languages: ["English", "Mandarin"],
      badges: ["Rising Star", "Classical Expert"],
      bio: "Classically trained guitarist with a passion for fingerpicking techniques. Graduate of Berklee College of Music.",
      availability: "Available",
      nextSession: "Tomorrow 7:00 PM"
    },
    {
      id: 3,
      name: "Elena Volkov",
      specialization: "Violin Performance",
      rating: 4.9,
      reviews: 921,
      students: 567,
      experience: "20+ years",
      hourlyRate: "$90",
      location: "Vienna, Austria",
      languages: ["English", "German", "Russian"],
      badges: ["Master Teacher", "Concert Performer"],
      bio: "Former principal violinist of Vienna Symphony Orchestra. Expert in classical technique and performance preparation.",
      availability: "Busy",
      nextSession: "Dec 25 2:00 PM"
    }
  ];

  const mentorStats = [
    { label: "Total Students Taught", value: "12,547", icon: TrendingUp },
    { label: "Live Sessions This Month", value: "89", icon: Video },
    { label: "Average Rating", value: "4.8", icon: Star },
    { label: "Success Rate", value: "96%", icon: Award }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find Your Perfect Music Mentor
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connect with world-class musicians and accelerate your musical journey with personalized guidance
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {mentorStats.map((stat) => (
            <Card key={stat.label} className="p-6 text-center hover:shadow-musical transition-shadow duration-300">
              <stat.icon className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {mentors.map((mentor) => (
            <Card key={mentor.id} className="p-6 hover:shadow-glow transition-all duration-300 hover:scale-105">
              {/* Mentor Header */}
              <div className="flex items-start space-x-4 mb-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-gradient-hero text-primary-foreground text-xl">
                    {mentor.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-1">{mentor.name}</h3>
                  <p className="text-primary font-medium mb-2">{mentor.specialization}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium text-foreground">{mentor.rating}</span>
                      <span>({mentor.reviews} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className={`px-2 py-1 rounded text-xs font-medium ${
                  mentor.availability === 'Available' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {mentor.availability}
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {mentor.badges.map((badge) => (
                  <Badge key={badge} className="bg-secondary/20 text-secondary-foreground text-xs">
                    {badge}
                  </Badge>
                ))}
              </div>

              {/* Bio */}
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {mentor.bio}
              </p>

              {/* Details */}
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Experience:</span>
                  <span className="font-medium">{mentor.experience}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Students:</span>
                  <span className="font-medium">{mentor.students.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Rate:</span>
                  <span className="font-bold text-primary">{mentor.hourlyRate}/hour</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground text-xs">{mentor.location}</span>
                </div>
              </div>

              {/* Next Session */}
              <div className="bg-muted/50 rounded-lg p-3 mb-4">
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="font-medium">Next Session:</span>
                  <span className="text-primary">{mentor.nextSession}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Button variant="hero" className="w-full">
                  <Video className="mr-2 h-4 w-4" />
                  Book Session
                </Button>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" size="sm">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Message
                  </Button>
                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Become a Mentor CTA */}
        <div className="text-center mt-16 p-8 bg-gradient-hero rounded-xl text-primary-foreground">
          <h3 className="text-2xl font-bold mb-4">Share Your Musical Expertise</h3>
          <p className="mb-6 opacity-90">
            Join our community of mentors and help aspiring musicians achieve their goals
          </p>
          <Button variant="secondary" size="lg">
            Apply to Become a Mentor
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};