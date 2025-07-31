import { Calendar, Clock, Users, Star, Video, MessageCircle, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const LiveSessions = () => {
  const upcomingSessions = [
    {
      id: 1,
      title: "Jazz Piano Masterclass: Advanced Chord Progressions",
      mentor: "Marcus Johnson",
      mentorRating: 4.9,
      date: "Today",
      time: "3:00 PM EST",
      duration: "2h",
      participants: 89,
      maxParticipants: 100,
      price: "$25",
      level: "Advanced",
      tags: ["Jazz", "Piano", "Theory"]
    },
    {
      id: 2,
      title: "Guitar Fingerpicking Techniques for Beginners",
      mentor: "Sarah Chen",
      mentorRating: 4.8,
      date: "Tomorrow",
      time: "7:00 PM EST",
      duration: "1.5h",
      participants: 156,
      maxParticipants: 200,
      price: "$15",
      level: "Beginner",
      tags: ["Guitar", "Fingerpicking", "Acoustic"]
    },
    {
      id: 3,
      title: "Violin Vibrato Workshop",
      mentor: "Elena Volkov",
      mentorRating: 4.9,
      date: "Dec 25",
      time: "2:00 PM EST",
      duration: "1h",
      participants: 67,
      maxParticipants: 80,
      price: "$20",
      level: "Intermediate",
      tags: ["Violin", "Technique", "Classical"]
    }
  ];

  const liveNow = [
    {
      id: 1,
      title: "Drum Patterns & Groove Building",
      mentor: "Alex Rodriguez",
      viewers: 234,
      duration: "45m remaining",
      tags: ["Drums", "Rhythm", "Rock"]
    },
    {
      id: 2,
      title: "Vocal Warm-ups & Breathing Techniques",
      mentor: "Diana White",
      viewers: 189,
      duration: "20m remaining",
      tags: ["Vocals", "Technique", "Health"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Live Music Sessions
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join interactive live sessions with expert mentors and fellow musicians
          </p>
        </div>

        {/* Live Now Section */}
        {liveNow.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <h2 className="text-2xl font-bold">Live Now</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {liveNow.map((session) => (
                <Card key={session.id} className="p-6 border-red-200 bg-red-50/50 dark:bg-red-950/20 hover:shadow-glow transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{session.title}</h3>
                      <p className="text-muted-foreground mb-2">by {session.mentor}</p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{session.viewers} watching</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{session.duration}</span>
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-red-500 text-white">LIVE</Badge>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {session.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button variant="hero" className="w-full">
                    <Video className="mr-2 h-4 w-4" />
                    Join Live Session
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Sessions */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Upcoming Sessions</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {upcomingSessions.map((session) => (
              <Card key={session.id} className="p-6 hover:shadow-musical transition-all duration-300 hover:scale-105">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{session.title}</h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs bg-gradient-hero text-primary-foreground">
                          {session.mentor.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-muted-foreground text-sm">by {session.mentor}</span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-muted-foreground">{session.mentorRating}</span>
                      </div>
                    </div>
                  </div>
                  <Badge className={session.level === 'Beginner' ? 'bg-green-100 text-green-800' : session.level === 'Advanced' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}>
                    {session.level}
                  </Badge>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{session.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{session.time}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>Duration: {session.duration}</span>
                    <span>{session.participants}/{session.maxParticipants} joined</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {session.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-primary">{session.price}</div>
                  <Button variant="musical">
                    <Video className="mr-2 h-4 w-4" />
                    Reserve Spot
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Host Session CTA */}
        <div className="text-center mt-16 p-8 bg-gradient-subtle rounded-xl">
          <h3 className="text-2xl font-bold mb-4">Want to Host a Session?</h3>
          <p className="text-muted-foreground mb-6">Share your expertise with the community</p>
          <Button variant="hero" size="lg">
            Become a Mentor
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};