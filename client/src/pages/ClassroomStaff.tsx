import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Users, Send, BookOpen, Clock, AlertCircle, CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertStaffRequestSchema, type Classroom, type StaffRequest } from "@shared/schema";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { getCurrentUser } from "@/lib/auth";
import { MentorNavigation } from "@/components/mentor/MentorNavigation";

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

const staffRequestFormSchema = insertStaffRequestSchema.extend({
  message: z.string().min(10, "Please provide a brief message").max(500, "Message too long"),
});

type StaffRequestFormData = z.infer<typeof staffRequestFormSchema>;

export default function ClassroomStaff() {
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedClassroom, setSelectedClassroom] = useState<Classroom | null>(null);
  const [requestDialogOpen, setRequestDialogOpen] = useState(false);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  const form = useForm<StaffRequestFormData>({
    resolver: zodResolver(staffRequestFormSchema),
    defaultValues: {
      mentorId: user?.id || 0,
      classroomId: 0,
      message: "",
    },
  });

  // Fetch all classrooms
  const { data: classrooms, isLoading: classroomsLoading } = useQuery({
    queryKey: ["/api/classrooms"],
  });

  // Fetch mentor's staff requests
  const { data: staffRequests, isLoading: requestsLoading } = useQuery({
    queryKey: ["/api/mentors", user?.id, "staff-requests"],
    queryFn: () => apiRequest(`/api/mentors/${user?.id}/staff-requests`),
    enabled: !!user?.id,
  });

  // Submit staff request mutation
  const submitRequestMutation = useMutation({
    mutationFn: (data: StaffRequestFormData) =>
      apiRequest("/api/staff-requests", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/mentors", user?.id, "staff-requests"] });
      setRequestDialogOpen(false);
      setSelectedClassroom(null);
      form.reset();
      toast({
        title: "Success",
        description: "Staff request submitted successfully!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: StaffRequestFormData) => {
    if (selectedClassroom) {
      submitRequestMutation.mutate({
        ...data,
        mentorId: user?.id || 0,
        classroomId: selectedClassroom.id,
      });
    }
  };

  const handleRequestClick = (classroom: Classroom) => {
    setSelectedClassroom(classroom);
    form.setValue("classroomId", classroom.id);
    setRequestDialogOpen(true);
  };

  const getRequestStatus = (classroomId: number) => {
    const requests = staffRequests as StaffRequest[] || [];
    return requests.find(r => r.classroomId === classroomId);
  };

  if (classroomsLoading || requestsLoading) {
    return (
      <div className="flex min-h-screen bg-background">
        <MentorNavigation />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <MentorNavigation />
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Classroom Staff Opportunities</h1>
            <p className="text-muted-foreground">
              Browse classrooms and request to join as staff to assist masters in teaching
            </p>
          </div>

          {/* Current Requests Section */}
          {staffRequests && (staffRequests as StaffRequest[]).length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Your Staff Requests</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {(staffRequests as StaffRequest[]).map((request: StaffRequest) => {
                  const classroom = (classrooms as Classroom[])?.find(c => c.id === request.classroomId);
                  return (
                    <Card key={request.id} className="border-l-4 border-l-blue-500">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center justify-between">
                          {classroom?.title}
                          <Badge 
                            variant={
                              request.status === 'approved' ? 'default' : 
                              request.status === 'rejected' ? 'destructive' : 'secondary'
                            }
                          >
                            {request.status === 'approved' && <CheckCircle className="h-3 w-3 mr-1" />}
                            {request.status === 'rejected' && <X className="h-3 w-3 mr-1" />}
                            {request.status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
                            {request.status}
                          </Badge>
                        </CardTitle>
                        <CardDescription>
                          Submitted: {request.createdAt ? new Date(request.createdAt).toLocaleDateString() : "Unknown"}
                        </CardDescription>
                      </CardHeader>
                      {request.adminNotes && (
                        <CardContent>
                          <div className="text-sm bg-muted p-3 rounded-md">
                            <strong>Notes: </strong>{request.adminNotes}
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* Available Classrooms Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Available Classrooms</h2>
            {!classrooms || (classrooms as Classroom[]).length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Classrooms Available</h3>
                  <p className="text-muted-foreground">
                    There are currently no classrooms accepting staff requests
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {(classrooms as Classroom[]).map((classroom: Classroom) => {
                  const existingRequest = getRequestStatus(classroom.id);
                  return (
                    <Card key={classroom.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          {classroom.title}
                          <Badge variant="outline">{classroom.subject}</Badge>
                        </CardTitle>
                        <CardDescription>{classroom.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              Max: {classroom.maxStudents} students
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {classroom.isActive ? "Active" : "Inactive"}
                            </div>
                          </div>
                          
                          <div className="text-sm">
                            <span className="font-medium">Level:</span> {classroom.level}
                          </div>

                          <div>
                            {existingRequest ? (
                              <div className="flex items-center space-x-2">
                                <Badge 
                                  variant={
                                    existingRequest.status === 'approved' ? 'default' : 
                                    existingRequest.status === 'rejected' ? 'destructive' : 'secondary'
                                  }
                                  className="flex-1 justify-center"
                                >
                                  {existingRequest.status === 'approved' && <CheckCircle className="h-3 w-3 mr-1" />}
                                  {existingRequest.status === 'rejected' && <X className="h-3 w-3 mr-1" />}
                                  {existingRequest.status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
                                  {existingRequest.status}
                                </Badge>
                              </div>
                            ) : (
                              <Button 
                                onClick={() => handleRequestClick(classroom)}
                                className="w-full"
                                disabled={!classroom.isActive}
                              >
                                <Send className="h-4 w-4 mr-2" />
                                Request to Join Staff
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>

          {/* Request Dialog */}
          <Dialog open={requestDialogOpen} onOpenChange={setRequestDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Request to Join Staff</DialogTitle>
                <DialogDescription>
                  Send a request to join "{selectedClassroom?.title}" as a staff member
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message to Master</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Please explain why you'd like to join this classroom as staff and what you can contribute..."
                            {...field} 
                            rows={4}
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
                      onClick={() => setRequestDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={submitRequestMutation.isPending}>
                      {submitRequestMutation.isPending ? "Submitting..." : "Submit Request"}
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}