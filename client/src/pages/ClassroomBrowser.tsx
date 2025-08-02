import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Music, 
  Users, 
  Star, 
  ExternalLink,
  Search,
  Filter,
  MapPin,
  Calendar,
  Heart
} from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { MentorNavigation } from "@/components/mentor/MentorNavigation";
import { type Classroom } from "@shared/schema";

export default function ClassroomBrowser() {
  const [user, setUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInstrument, setSelectedInstrument] = useState<string>("all");

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  // Fetch all public classrooms
  const { data: classrooms, isLoading } = useQuery({
    queryKey: ["/api/classrooms/public"],
  });

  // Get unique instruments for filtering
  const allInstruments = Array.isArray(classrooms) ? classrooms.reduce((acc: string[], classroom: Classroom) => {
    if (classroom.instruments) {
      classroom.instruments.forEach((instrument: string) => {
        if (!acc.includes(instrument)) {
          acc.push(instrument);
        }
      });
    }
    return acc;
  }, []) : [];

  // Filter classrooms based on search and instrument
  const filteredClassrooms = Array.isArray(classrooms) ? classrooms.filter((classroom: Classroom) => {
    const matchesSearch = classroom.academyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         classroom.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesInstrument = selectedInstrument === "all" || 
                             classroom.instruments?.includes(selectedInstrument);
    return matchesSearch && matchesInstrument;
  }) : [];

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <MentorNavigation currentUser={user} />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Browse Music Academies</h1>
              <p className="text-muted-foreground">
                Discover and join amazing music academies from masters around the world
              </p>
            </div>

            {/* Filters */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search academies..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-48">
                    <Select value={selectedInstrument} onValueChange={setSelectedInstrument}>
                      <SelectTrigger>
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Filter by instrument" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Instruments</SelectItem>
                        {allInstruments.map((instrument: string) => (
                          <SelectItem key={instrument} value={instrument}>
                            {instrument}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Loading State */}
            {isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-muted rounded w-1/2 mb-4"></div>
                      <div className="h-20 bg-muted rounded mb-4"></div>
                      <div className="flex gap-2 mb-4">
                        <div className="h-6 bg-muted rounded w-16"></div>
                        <div className="h-6 bg-muted rounded w-20"></div>
                      </div>
                      <div className="h-8 bg-muted rounded"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Classrooms Grid */}
            {!isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredClassrooms.map((classroom: Classroom) => (
                  <Card key={classroom.id} className="group hover:shadow-lg transition-all duration-200">
                    <CardContent className="p-0">
                      {/* Hero Section */}
                      <div 
                        className="h-40 relative rounded-t-lg"
                        style={{
                          backgroundColor: classroom.primaryColor || '#3B82F6',
                          backgroundImage: classroom.heroImage ? `url(${classroom.heroImage})` : 
                            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      >
                        <div className="absolute inset-0 bg-black/20 rounded-t-lg" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex items-center gap-3">
                            {classroom.logoImage && (
                              <Avatar className="h-10 w-10 border-2 border-white">
                                <AvatarImage src={classroom.logoImage} alt={classroom.academyName} />
                                <AvatarFallback className="text-xs">
                                  {classroom.academyName.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                            )}
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-white truncate">
                                {classroom.academyName}
                              </h3>
                              <p className="text-xs text-white/90 truncate">
                                {classroom.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        {/* About */}
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {classroom.about || "Discover your musical potential with expert guidance and personalized instruction."}
                        </p>

                        {/* Instruments */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {classroom.instruments?.slice(0, 3).map((instrument: string, index: number) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {instrument}
                            </Badge>
                          ))}
                          {classroom.instruments && classroom.instruments.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{classroom.instruments.length - 3} more
                            </Badge>
                          )}
                        </div>

                        {/* Stats */}
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            <span>Max {classroom.maxStudents}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>Est. {classroom.createdAt ? new Date(classroom.createdAt).getFullYear() : 'N/A'}</span>
                          </div>
                        </div>

                        {/* Location */}
                        {classroom.address && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-4">
                            <MapPin className="h-3 w-3" />
                            <span className="truncate">{classroom.address}</span>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-2">
                          <Button asChild size="sm" className="flex-1">
                            <Link href={`/academy/${classroom.customSlug}`}>
                              <ExternalLink className="h-3 w-3 mr-1" />
                              Visit Academy
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm">
                            <Heart className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!isLoading && filteredClassrooms.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <Music className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No Academies Found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchTerm || selectedInstrument !== "all" 
                      ? "Try adjusting your search filters" 
                      : "Be the first to create an academy!"}
                  </p>
                  {searchTerm || selectedInstrument !== "all" ? (
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSearchTerm("");
                        setSelectedInstrument("all");
                      }}
                    >
                      Clear Filters
                    </Button>
                  ) : null}
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}