import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Music, Guitar, Piano, Mic, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const featuredMentors = [
  {
    name: "Dr. Sarah Williams",
    instrument: "Piano",
    experience: "15+ years",
    students: "200+",
    rating: 4.9,
    specialties: ["Classical", "Jazz", "Music Theory"],
    avatar: "/placeholder.svg",
    description: "Former conservatory professor with expertise in classical and contemporary piano techniques."
  },
  {
    name: "Marcus Johnson",
    instrument: "Guitar", 
    experience: "12+ years",
    students: "180+",
    rating: 4.8,
    specialties: ["Rock", "Blues", "Fingerstyle"],
    avatar: "/placeholder.svg",
    description: "Professional guitarist who has toured with major artists and teaches all skill levels."
  },
  {
    name: "Elena Rodriguez",
    instrument: "Vocals",
    experience: "10+ years", 
    students: "150+",
    rating: 5.0,
    specialties: ["Pop", "R&B", "Vocal Technique"],
    avatar: "/placeholder.svg",
    description: "Award-winning vocal coach helping students develop their unique voice and style."
  }
];

const mentorBenefits = [
  {
    title: "Personalized Learning",
    description: "Get customized lessons tailored to your skill level and musical goals"
  },
  {
    title: "Real-time Feedback", 
    description: "Receive immediate guidance and corrections during live practice sessions"
  },
  {
    title: "Professional Network",
    description: "Connect with industry professionals and expand your musical connections"
  },
  {
    title: "Flexible Scheduling",
    description: "Book sessions that fit your schedule with mentors in different time zones"
  }
];

export const MentorSection = () => {
  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
            Learn from Expert Mentors
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connect with professional musicians and experienced teachers who will guide you 
            on your musical journey with personalized instruction and expert feedback.
          </p>
        </div>

        {/* Featured Mentors */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {featuredMentors.map((mentor, index) => (
            <Card key={index} className="group hover:shadow-musical transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarImage src={mentor.avatar} alt={mentor.name} />
                  <AvatarFallback className="text-lg">{mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                
                <CardTitle className="text-xl">{mentor.name}</CardTitle>
                <CardDescription className="flex items-center justify-center gap-2">
                  {mentor.instrument === "Piano" && <Piano className="h-4 w-4" />}
                  {mentor.instrument === "Guitar" && <Guitar className="h-4 w-4" />}
                  {mentor.instrument === "Vocals" && <Mic className="h-4 w-4" />}
                  {mentor.instrument} Specialist
                </CardDescription>
                
                <div className="flex items-center justify-center gap-1 mt-2">
                  <Star className="h-4 w-4 fill-secondary text-secondary" />
                  <span className="text-sm font-medium">{mentor.rating}</span>
                  <span className="text-sm text-muted-foreground">({mentor.students} students)</span>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 text-center">
                  {mentor.description}
                </p>
                
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  {mentor.specialties.map((specialty, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>
                
                <div className="text-center text-sm text-muted-foreground">
                  <div>{mentor.experience} experience</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mentor Benefits */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {mentorBenefits.map((benefit, index) => (
            <Card key={index} className="text-center border-accent/20 bg-gradient-to-b from-accent/5 to-transparent">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2 text-accent">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button size="lg" className="shadow-musical hover:shadow-glow transition-all" asChild>
            <Link to="/mentors">
              Find Your Perfect Mentor
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Over 500+ verified mentors • Free consultation available
          </p>
        </div>
      </div>
    </section>
  );
};