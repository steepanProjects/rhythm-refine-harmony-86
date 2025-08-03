import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Users, BookOpen, MessageSquare, Settings, PlusCircle, Video, FileText } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import ResignationRequestForm from "@/components/ResignationRequestForm";
import ResignationRequestStatus from "@/components/ResignationRequestStatus";

export default function StaffClassroom() {
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  // Fetch mentor's staff classroom
  const { data: classroom, isLoading: classroomLoading, error } = useQuery({
    queryKey: ["/api/mentors", user?.id, "staff-classroom"],
    queryFn: () => apiRequest(`/api/mentors/${user?.id}/staff-classroom`),
    enabled: !!user?.id,
  });

  // If no staff classroom found, show not authorized message
  if (error && error.message?.includes("404")) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-semibold mb-2">No Staff Access</h1>
            <p className="text-muted-foreground mb-6">
              You are not currently a staff member of any classroom. Apply to join academies through the discovery page.
            </p>
            <Button onClick={() => window.location.href = "/mentor-portal/classroom-discovery"}>
              Discover Academies
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (classroomLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading your classroom...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{classroom?.classroomTitle}</h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span>{classroom?.classroomSubject}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{classroom?.classroomLevel}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {new Date(classroom?.joinedAt).toLocaleDateString()}</span>
                </div>
              </div>
              <p className="text-muted-foreground mt-2">{classroom?.classroomDescription}</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Staff Member
              </Badge>
              <ResignationRequestForm 
                mentorId={user?.id}
                classroomId={classroom?.classroomId}
                classroomTitle={classroom?.classroomTitle}
              />
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-muted-foreground">Students</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Video className="h-8 w-8 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-muted-foreground">Live Sessions</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <FileText className="h-8 w-8 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-muted-foreground">Assignments</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <MessageSquare className="h-8 w-8 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-muted-foreground">Messages</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="materials">Materials</TabsTrigger>
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <ResignationRequestStatus mentorId={user?.id} />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest updates in your classroom</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <MessageSquare className="h-12 w-12 mx-auto mb-2" />
                    <p>No recent activity</p>
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Sessions */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Sessions</CardTitle>
                  <CardDescription>Your scheduled teaching sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <Calendar className="h-12 w-12 mx-auto mb-2" />
                    <p>No upcoming sessions</p>
                    <Button variant="outline" className="mt-4">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Schedule Session
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Classroom Info */}
            <Card>
              <CardHeader>
                <CardTitle>Classroom Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Master Teacher</h4>
                    <p className="text-muted-foreground">{classroom?.masterName}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Max Students</h4>
                    <p className="text-muted-foreground">{classroom?.classroomMaxStudents}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Subject</h4>
                    <p className="text-muted-foreground">{classroom?.classroomSubject}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Level</h4>
                    <p className="text-muted-foreground">{classroom?.classroomLevel}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Students</CardTitle>
                <CardDescription>Manage and track student progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-2" />
                  <p>No students enrolled yet</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Live Sessions</h2>
                <p className="text-muted-foreground">Schedule and manage your teaching sessions</p>
              </div>
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                Schedule Session
              </Button>
            </div>
            
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-8 text-muted-foreground">
                  <Video className="h-12 w-12 mx-auto mb-2" />
                  <p>No sessions scheduled</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="materials" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Course Materials</h2>
                <p className="text-muted-foreground">Upload and organize teaching materials</p>
              </div>
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Material
              </Button>
            </div>
            
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-2" />
                  <p>No materials uploaded</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="discussions" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Class Discussions</h2>
                <p className="text-muted-foreground">Engage with students and answer questions</p>
              </div>
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                Start Discussion
              </Button>
            </div>
            
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-8 text-muted-foreground">
                  <MessageSquare className="h-12 w-12 mx-auto mb-2" />
                  <p>No discussions started</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}