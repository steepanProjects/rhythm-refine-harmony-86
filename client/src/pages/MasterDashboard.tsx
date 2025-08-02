import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Users, Settings, Calendar, BookOpen, UserCheck, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertClassroomSchema, type Classroom, type StaffRequest } from "@shared/schema";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { getCurrentUser } from "@/lib/auth";

const apiRequest = async (url: string, options?: { method: string; body?: string }) => {
  const response = await fetch(url, {
    method: options?.method || "GET",
    headers: {
      'Content-Type': 'application/json',
    },
    body: options?.body,
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

const classroomFormSchema = insertClassroomSchema.extend({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
});

type ClassroomFormData = z.infer<typeof classroomFormSchema>;

export default function MasterDashboard() {
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  const form = useForm<ClassroomFormData>({
    resolver: zodResolver(classroomFormSchema),
    defaultValues: {
      title: "",
      description: "",
      subject: "music",
      level: "beginner",
      maxStudents: 20,
      masterId: user?.id || 0,
    },
  });

  // Fetch master's classrooms
  const { data: classrooms, isLoading: classroomsLoading } = useQuery({
    queryKey: ["/api/classrooms", "instructor", user?.id],
    enabled: !!user?.id,
  });

  // Fetch pending staff requests for master's classrooms
  const { data: staffRequests, isLoading: staffRequestsLoading } = useQuery({
    queryKey: ["/api/staff-requests", "pending"],
    queryFn: () => apiRequest("/api/staff-requests?status=pending"),
  });

  // Create classroom mutation
  const createClassroomMutation = useMutation({
    mutationFn: (data: ClassroomFormData) =>
      apiRequest("/api/classrooms", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/classrooms"] });
      setCreateDialogOpen(false);
      form.reset();
      toast({
        title: "Success",
        description: "Classroom created successfully!",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create classroom. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Approve staff request mutation
  const approveStaffRequestMutation = useMutation({
    mutationFn: ({ requestId, adminNotes }: { requestId: number; adminNotes?: string }) =>
      apiRequest(`/api/staff-requests/${requestId}/status`, {
        method: "PATCH",
        body: JSON.stringify({
          status: "approved",
          adminNotes,
          reviewedBy: user?.id,
        }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/staff-requests"] });
      toast({
        title: "Success",
        description: "Staff request approved successfully!",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to approve staff request.",
        variant: "destructive",
      });
    },
  });

  // Reject staff request mutation
  const rejectStaffRequestMutation = useMutation({
    mutationFn: ({ requestId, adminNotes }: { requestId: number; adminNotes?: string }) =>
      apiRequest(`/api/staff-requests/${requestId}/status`, {
        method: "PATCH",
        body: JSON.stringify({
          status: "rejected",
          adminNotes,
          reviewedBy: user?.id,
        }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/staff-requests"] });
      toast({
        title: "Success",
        description: "Staff request rejected.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to reject staff request.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ClassroomFormData) => {
    createClassroomMutation.mutate(data);
  };

  if (classroomsLoading || staffRequestsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Filter staff requests for master's classrooms
  const masterClassroomIds = (classrooms as Classroom[])?.map((c: Classroom) => c.id) || [];
  const masterStaffRequests = (staffRequests as StaffRequest[])?.filter((request: StaffRequest) =>
    masterClassroomIds.includes(request.classroomId)
  ) || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Master Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your classrooms and approve mentor staff requests
          </p>
        </div>
        
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Classroom
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Classroom</DialogTitle>
              <DialogDescription>
                Create a classroom where mentors can request to join as staff
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Classroom Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Advanced Piano Techniques" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="A comprehensive course covering advanced piano techniques and theory"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select subject" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="music">Music</SelectItem>
                          <SelectItem value="piano">Piano</SelectItem>
                          <SelectItem value="guitar">Guitar</SelectItem>
                          <SelectItem value="violin">Violin</SelectItem>
                          <SelectItem value="theory">Music Theory</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Level</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                          <SelectItem value="all-levels">All Levels</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="maxStudents"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maximum Students</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="1" 
                          max="100"
                          value={field.value || ""}
                          onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : null)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCreateDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={createClassroomMutation.isPending}>
                    {createClassroomMutation.isPending ? "Creating..." : "Create Classroom"}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="classrooms" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="classrooms">
            <BookOpen className="h-4 w-4 mr-2" />
            My Classrooms
          </TabsTrigger>
          <TabsTrigger value="staff-requests" className="relative">
            <UserCheck className="h-4 w-4 mr-2" />
            Staff Requests
            {masterStaffRequests.length > 0 && (
              <Badge variant="destructive" className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                {masterStaffRequests.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <Settings className="h-4 w-4 mr-2" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="classrooms" className="space-y-4">
          {!classrooms || (classrooms as Classroom[]).length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Classrooms Yet</h3>
                <p className="text-muted-foreground mb-4">
                  Create your first classroom to start managing mentor staff and students
                </p>
                <Button onClick={() => setCreateDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Classroom
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {(classrooms as Classroom[]).map((classroom: Classroom) => (
                <Card key={classroom.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {classroom.title}
                      <Badge variant="secondary">{classroom.subject}</Badge>
                    </CardTitle>
                    <CardDescription>{classroom.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        0/{classroom.maxStudents} students
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {classroom.isActive ? "Active" : "Inactive"}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">
                        Level: {classroom.level}
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" className="flex-1">
                          <Settings className="h-4 w-4 mr-1" />
                          Manage
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Calendar className="h-4 w-4 mr-1" />
                          Schedule
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="staff-requests" className="space-y-4">
          {masterStaffRequests.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <UserCheck className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Pending Staff Requests</h3>
                <p className="text-muted-foreground">
                  Mentors who want to join your classrooms as staff will appear here
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {masterStaffRequests.map((request: StaffRequest) => {
                const classroom = (classrooms as Classroom[])?.find((c: Classroom) => c.id === request.classroomId);
                return (
                  <Card key={request.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div>
                          Staff Request for "{classroom?.title}"
                        </div>
                        <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Pending Review
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        Request submitted on {request.createdAt ? new Date(request.createdAt).toLocaleDateString() : "Unknown date"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Mentor Information</h4>
                          <p className="text-sm text-muted-foreground">
                            Mentor ID: {request.mentorId}
                          </p>
                        </div>
                        {request.message && (
                          <div>
                            <h4 className="font-semibold mb-2">Application Message</h4>
                            <p className="text-sm bg-muted p-3 rounded-md">{request.message}</p>
                          </div>
                        )}
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => approveStaffRequestMutation.mutate({ requestId: request.id })}
                            disabled={approveStaffRequestMutation.isPending}
                            className="flex-1"
                          >
                            {approveStaffRequestMutation.isPending ? "Approving..." : "Approve"}
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => rejectStaffRequestMutation.mutate({ 
                              requestId: request.id,
                              adminNotes: "Request declined by classroom master"
                            })}
                            disabled={rejectStaffRequestMutation.isPending}
                            className="flex-1"
                          >
                            {rejectStaffRequestMutation.isPending ? "Rejecting..." : "Reject"}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Classrooms</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{(classrooms as Classroom[])?.length || 0}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Staff Members</CardTitle>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{masterStaffRequests.length}</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}