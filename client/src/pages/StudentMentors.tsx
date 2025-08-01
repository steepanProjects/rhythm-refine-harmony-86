import { useState } from "react";
import { Star, MapPin, Clock, Video, Calendar, MessageCircle, Award, TrendingUp, UserCheck, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
// Define extended mentor type with user data
interface MentorWithUser {
  id: number;
  userId: number | null;
  firstName: string | null;
  lastName: string | null;
  specialization: string | null;
  experience: string | null;
  hourlyRate: string | null;
  location: string | null;
  languages: string[] | null;
  badges: any;
  bio: string | null;
  availability: any;
  totalStudents: number | null;
  totalReviews: number | null;
  averageRating: string | null;
  nextAvailableSession: any;
  isVerified: boolean | null;
  createdAt: Date | null;
}
import { EmptyState } from "@/components/EmptyState";
import { MentorCardSkeleton, LoadingGrid } from "@/components/LoadingSkeletons";

export const StudentMentors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("all");
  const [sortBy, setSortBy] = useState("rating");

  const { data: mentors, isLoading, error } = useQuery<MentorWithUser[]>({
    queryKey: ['/api/mentors'],
  });

  // Filter and sort mentors based on search and filters
  const filteredMentors = mentors?.filter(mentor => {
    const matchesSearch = mentor.bio?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.specialization?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialization = selectedSpecialization === "all" || 
                                 mentor.specialization?.toLowerCase().includes(selectedSpecialization.toLowerCase());
    return matchesSearch && matchesSpecialization;
  }).sort((a, b) => {
    if (sortBy === "rating") return (parseFloat(b.averageRating || "0") - parseFloat(a.averageRating || "0"));
    if (sortBy === "price") return (parseFloat(a.hourlyRate || "0") - parseFloat(b.hourlyRate || "0"));
    if (sortBy === "experience") return (b.totalStudents || 0) - (a.totalStudents || 0);
    return 0;
  });

  const specializations = ["Piano", "Guitar", "Violin", "Drums", "Voice", "Jazz", "Classical"];

  const handleBookSession = (mentorId: number) => {
    // In a real app, this would open booking modal or navigate to booking page
    console.log(`Booking session with mentor ${mentorId}`);
  };

  const handleSendMessage = (mentorId: number) => {
    // In a real app, this would open messaging interface
    console.log(`Sending message to mentor ${mentorId}`);
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Find Your Perfect Mentor</h1>
          <p className="text-muted-foreground">
            Loading expert musicians and teachers...
          </p>
        </div>
        <LoadingGrid count={6} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MentorCardSkeleton />
        </LoadingGrid>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-center py-20">
          <div className="text-lg text-red-600">Error loading mentors. Please try again later.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Find Your Perfect Mentor</h1>
        <p className="text-muted-foreground">
          Connect with expert musicians for personalized lessons and guidance
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by instrument, style, or expertise..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Specialization" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Instruments</SelectItem>
                {specializations.map(spec => (
                  <SelectItem key={spec} value={spec.toLowerCase()}>{spec}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="price">Lowest Price</SelectItem>
                <SelectItem value="experience">Most Experienced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Mentors Grid */}
      {filteredMentors && filteredMentors.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map((mentor) => (
            <Card key={mentor.id} className="group hover:shadow-musical transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                {/* Mentor Header */}
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="text-lg font-semibold bg-gradient-hero text-white">
                      {mentor.specialization?.charAt(0) || "M"}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {mentor.firstName && mentor.lastName 
                        ? `${mentor.firstName} ${mentor.lastName}`
                        : `${mentor.specialization?.split(',')[0]?.trim() || 'Music'} Mentor`
                      }
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Star className="h-4 w-4 fill-secondary text-secondary" />
                      <span className="font-medium">{mentor.averageRating || "4.8"}</span>
                      <span className="text-muted-foreground text-sm">
                        ({mentor.totalReviews || 0} reviews)
                      </span>
                    </div>
                    {mentor.location && (
                      <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {mentor.location}
                      </div>
                    )}
                  </div>
                </div>

                {/* Specialization Tags */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1 mb-2">
                    {mentor.specialization?.split(',').map((spec, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {spec.trim()}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <TrendingUp className="h-4 w-4" />
                    {mentor.totalStudents || 0} students taught
                  </div>
                </div>

                {/* Bio */}
                {mentor.bio && (
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {mentor.bio}
                  </p>
                )}

                {/* Experience & Languages */}
                <div className="space-y-2 mb-4 text-sm">
                  {mentor.experience && (
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-primary" />
                      <span>{mentor.experience}</span>
                    </div>
                  )}
                  {mentor.languages && mentor.languages.length > 0 && (
                    <div className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4 text-primary" />
                      <span>Speaks: {mentor.languages.join(', ')}</span>
                    </div>
                  )}
                </div>

                {/* Pricing & Actions */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-lg font-bold text-primary">
                    ${mentor.hourlyRate || 50}/hour
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleSendMessage(mentor.id)}
                    >
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      className="shadow-musical"
                      onClick={() => handleBookSession(mentor.id)}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Book
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={UserCheck}
          title="No Mentors Found"
          description="Try adjusting your search terms or filters to find the perfect mentor for your musical journey."
          actionText="Clear Filters"
          onAction={() => {
            setSearchTerm("");
            setSelectedSpecialization("all");
            setSortBy("rating");
          }}
        />
      )}

      {/* Stats Section */}
      {filteredMentors && filteredMentors.length > 0 && (
        <div className="mt-12 p-6 bg-muted/30 rounded-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{filteredMentors.length}</div>
              <div className="text-sm text-muted-foreground">Expert Mentors</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">
                {filteredMentors.reduce((sum, mentor) => sum + (mentor.totalStudents || 0), 0)}
              </div>
              <div className="text-sm text-muted-foreground">Students Taught</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">
                {(filteredMentors.reduce((sum, mentor) => sum + parseFloat(mentor.averageRating || "0"), 0) / filteredMentors.length).toFixed(1)}
              </div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">Support Available</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentMentors;