import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  Star, 
  Users, 
  Clock, 
  Award, 
  Music, 
  Phone, 
  Mail, 
  Globe, 
  MapPin, 
  Share2,
  Heart,
  CheckCircle,
  PlayCircle,
  Calendar,
  DollarSign
} from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { type Classroom } from "@shared/schema";

const joinRequestSchema = z.object({
  message: z.string().min(10, "Please provide a brief message about why you'd like to join"),
  experience: z.string().optional(),
});

type JoinRequestFormData = z.infer<typeof joinRequestSchema>;

export default function ClassroomLanding() {
  const { slug } = useParams<{ slug: string }>();
  const [user, setUser] = useState<any>(null);
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  const form = useForm<JoinRequestFormData>({
    resolver: zodResolver(joinRequestSchema),
    defaultValues: {
      message: "",
      experience: "",
    },
  });

  // Fetch classroom by slug
  const { data: classroom, isLoading: classroomLoading } = useQuery({
    queryKey: ["/api/classrooms/slug", slug],
    queryFn: () => apiRequest(`/api/classrooms/slug/${slug}`),
    enabled: !!slug,
  });

  // Fetch master profile
  const { data: masterProfile } = useQuery({
    queryKey: ["/api/users", classroom?.masterId],
    queryFn: () => apiRequest(`/api/users/${classroom?.masterId}`),
    enabled: !!classroom?.masterId,
  });

  // Join classroom mutation
  const joinClassroomMutation = useMutation({
    mutationFn: (data: JoinRequestFormData) => 
      apiRequest(`/api/classrooms/${classroom?.id}/join`, {
        method: "POST",
        body: JSON.stringify({
          userId: user?.id,
          message: data.message,
          experience: data.experience,
        }),
      }),
    onSuccess: () => {
      toast({
        title: "Join Request Sent!",
        description: "Your request to join this academy has been sent to the master for review.",
      });
      setJoinDialogOpen(false);
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send join request",
        variant: "destructive",
      });
    },
  });

  const handleJoinSubmit = (data: JoinRequestFormData) => {
    joinClassroomMutation.mutate(data);
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      toast({
        title: "Link Copied!",
        description: "Classroom link has been copied to your clipboard.",
      });
    });
  };

  if (classroomLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Music className="h-12 w-12 mx-auto mb-4 text-primary animate-pulse" />
          <p className="text-muted-foreground">Loading academy...</p>
        </div>
      </div>
    );
  }

  if (!classroom) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="text-center p-8">
            <Music className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">Academy Not Found</h3>
            <p className="text-muted-foreground">The academy you're looking for doesn't exist or has been removed.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const parsedSocialLinks = classroom.socialLinks ? JSON.parse(classroom.socialLinks) : {};
  const parsedTestimonials = classroom.testimonials ? JSON.parse(classroom.testimonials) : [];
  const parsedPricing = classroom.pricing ? JSON.parse(classroom.pricing) : [];
  const parsedSchedule = classroom.schedule ? JSON.parse(classroom.schedule) : [];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div 
        className="relative h-96 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground"
        style={{
          backgroundColor: classroom.primaryColor || '#3B82F6',
          backgroundImage: classroom.heroImage ? `url(${classroom.heroImage})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-4">
              {classroom.logoImage && (
                <Avatar className="h-16 w-16">
                  <AvatarImage src={classroom.logoImage} alt={classroom.academyName} />
                  <AvatarFallback className="text-2xl">
                    {classroom.academyName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              )}
              <div>
                <h1 className="text-4xl font-bold mb-2">{classroom.academyName}</h1>
                <p className="text-xl text-primary-foreground/90">{classroom.description}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {classroom.instruments?.map((instrument: string, index: number) => (
                <Badge key={index} variant="secondary" className="bg-white/20 text-white border-white/30">
                  {instrument}
                </Badge>
              ))}
            </div>
            <div className="flex gap-4">
              <Dialog open={joinDialogOpen} onOpenChange={setJoinDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                    <Heart className="h-4 w-4 mr-2" />
                    Join Academy
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Join {classroom.academyName}</DialogTitle>
                    <DialogDescription>
                      Send a request to join this academy. The master will review your application.
                    </DialogDescription>
                  </DialogHeader>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleJoinSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Why would you like to join?</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us about your musical goals and why you're interested in this academy..."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="experience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Musical Experience (Optional)</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g., Beginner, 2 years piano, etc."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex gap-2">
                        <Button type="submit" disabled={joinClassroomMutation.isPending}>
                          {joinClassroomMutation.isPending ? "Sending..." : "Send Request"}
                        </Button>
                        <Button type="button" variant="outline" onClick={() => setJoinDialogOpen(false)}>
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
              <Button variant="outline" size="lg" className="bg-white/20 border-white/30 text-white hover:bg-white/30" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Music className="h-5 w-5" />
                  About Our Academy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{classroom.about}</p>
                {classroom.curriculum && (
                  <div>
                    <h4 className="font-semibold mb-2">Curriculum</h4>
                    <p className="text-muted-foreground">{classroom.curriculum}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Features */}
            {classroom.features && classroom.features.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    What We Offer
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {classroom.features.map((feature: string, index: number) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Instruments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Music className="h-5 w-5" />
                  Instruments We Teach
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {classroom.instruments?.map((instrument: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-base py-2 px-4">
                      {instrument}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Schedule */}
            {parsedSchedule.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Class Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {parsedSchedule.map((scheduleItem: any, index: number) => (
                      <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{scheduleItem.day}</p>
                          <p className="text-sm text-muted-foreground">{scheduleItem.class}</p>
                        </div>
                        <Badge variant="outline">{scheduleItem.time}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Testimonials */}
            {parsedTestimonials.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Student Reviews
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {parsedTestimonials.map((testimonial: any, index: number) => (
                      <div key={index} className="border-l-4 border-primary pl-4">
                        <p className="italic mb-2">"{testimonial.text}"</p>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{testimonial.name}</p>
                          <div className="flex">
                            {[...Array(testimonial.rating || 5)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Master Info */}
            <Card>
              <CardHeader>
                <CardTitle>Academy Master</CardTitle>
              </CardHeader>
              <CardContent>
                {masterProfile && (
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar>
                      <AvatarImage src={masterProfile.avatar} />
                      <AvatarFallback>
                        {masterProfile.firstName?.charAt(0)}{masterProfile.lastName?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{masterProfile.firstName} {masterProfile.lastName}</p>
                      <p className="text-sm text-muted-foreground">Academy Founder</p>
                    </div>
                  </div>
                )}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>Max {classroom.maxStudents} students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Established {new Date(classroom.createdAt).getFullYear()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {classroom.contactEmail && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <a href={`mailto:${classroom.contactEmail}`} className="text-primary hover:underline">
                      {classroom.contactEmail}
                    </a>
                  </div>
                )}
                {classroom.contactPhone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <a href={`tel:${classroom.contactPhone}`} className="text-primary hover:underline">
                      {classroom.contactPhone}
                    </a>
                  </div>
                )}
                {classroom.website && (
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <a href={classroom.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      Visit Website
                    </a>
                  </div>
                )}
                {classroom.address && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{classroom.address}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Pricing */}
            {parsedPricing.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Pricing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {parsedPricing.map((price: any, index: number) => (
                      <div key={index} className="border rounded-lg p-3">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{price.name}</p>
                            <p className="text-sm text-muted-foreground">{price.description}</p>
                          </div>
                          <Badge>{price.price}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}