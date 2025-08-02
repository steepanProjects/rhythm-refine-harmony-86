import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { getCurrentUser } from "@/lib/auth";

type Role = "master" | "staff" | "student";

interface CreateClassroomButtonProps {
  role: Role;
}

interface ClassroomFormData {
  title: string;
  description: string;
  subject: string;
  level: string;
  maxStudents: string;
}

const subjects = [
  "Piano", "Guitar", "Vocals", "Drums", "Violin", "Bass", 
  "Music Theory", "Composition", "Production", "Other"
];

const levels = ["Beginner", "Intermediate", "Advanced", "All Levels"];

export const CreateClassroomButton = ({ role }: CreateClassroomButtonProps) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const currentUser = getCurrentUser();
  
  const form = useForm<ClassroomFormData>({
    defaultValues: {
      title: "",
      description: "",
      subject: "",
      level: "",
      maxStudents: "20"
    }
  });

  const createClassroomMutation = useMutation({
    mutationFn: (data: ClassroomFormData) => {
      // Generate a unique slug based on the title and timestamp
      const slug = data.title.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '') + '-' + Date.now();
      
      return apiRequest("/api/classrooms", {
        method: "POST",
        body: JSON.stringify({
          academyName: data.title,
          description: data.description,
          about: data.description, // Use description for both fields
          masterId: currentUser?.id,
          instruments: [data.subject],
          curriculum: `${data.level} level ${data.subject} instruction`,
          maxStudents: parseInt(data.maxStudents),
          isActive: true,
          isPublic: true,
          primaryColor: "#3B82F6",
          customSlug: slug,
        }),
      });
    },
    onSuccess: () => {
      toast({
        title: "Classroom Created!",
        description: `${form.getValues().title} has been created successfully.`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/classrooms"] });
      setOpen(false);
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create classroom",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ClassroomFormData) => {
    if (!currentUser) {
      toast({
        title: "Authentication Required",
        description: "Please log in to create a classroom.",
        variant: "destructive",
      });
      return;
    }
    createClassroomMutation.mutate(data);
  };

  if (role === "student") return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Classroom
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Classroom</DialogTitle>
          <DialogDescription>
            Set up a new classroom for your students. You can modify these settings later.
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
                    <Input placeholder="e.g., Advanced Piano Techniques" {...field} />
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
                      placeholder="Describe what students will learn in this classroom..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
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
                        {subjects.map((subject) => (
                          <SelectItem key={subject} value={subject}>
                            {subject}
                          </SelectItem>
                        ))}
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
                        {levels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="maxStudents"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maximum Students</FormLabel>
                  <FormControl>
                    <Input type="number" min="1" max="100" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
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
  );
};