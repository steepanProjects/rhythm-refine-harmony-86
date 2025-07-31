import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Footer } from "@/components/Footer";
import { StudentNavigation } from "@/components/student/StudentNavigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Users, 
  MessageCircle, 
  Share2,
  Plus,
  TrendingUp,
  Clock,
  Award,
  Music,
  BookOpen,
  Star,
  ThumbsUp,
  Send,
  Calendar,
  Trophy
} from "lucide-react";

interface CommunityPost {
  id: number;
  author: string;
  avatar?: string;
  title: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  category: 'discussion' | 'achievement' | 'help' | 'showcase';
  tags: string[];
  isLiked?: boolean;
}

interface StudyGroup {
  id: number;
  name: string;
  description: string;
  members: number;
  category: string;
  level: string;
  nextSession?: string;
}

const StudentCommunity = () => {
  const [currentUser] = useState(() => {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  });

  const [newPost, setNewPost] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample community data - in real app would come from API
  const [posts] = useState<CommunityPost[]>([
    {
      id: 1,
      author: "Sarah M.",
      title: "Just completed my first piano piece! 🎹",
      content: "After 3 months of practice, I finally played 'Für Elise' without mistakes. The feeling is incredible! Thanks to everyone who encouraged me along the way.",
      timestamp: "2 hours ago",
      likes: 24,
      comments: 8,
      category: 'achievement',
      tags: ['piano', 'classical', 'milestone'],
      isLiked: false
    },
    {
      id: 2,
      author: "Mike C.",
      title: "Need help with guitar chord transitions",
      content: "I'm struggling with smooth transitions between G major and C major. Any tips or exercises that helped you master this?",
      timestamp: "4 hours ago",
      likes: 12,
      comments: 15,
      category: 'help',
      tags: ['guitar', 'chords', 'technique'],
      isLiked: true
    },
    {
      id: 3,
      author: "Emma L.",
      title: "Weekly Practice Challenge Results!",
      content: "This week's challenge was amazing! I practiced 45 minutes every day and can already feel the improvement. Who's joining next week's rhythm challenge?",
      timestamp: "1 day ago",
      likes: 31,
      comments: 22,
      category: 'discussion',
      tags: ['practice', 'challenge', 'motivation'],
      isLiked: false
    }
  ]);

  const [studyGroups] = useState<StudyGroup[]>([
    {
      id: 1,
      name: "Beginner Guitar Circle",
      description: "A supportive group for new guitar players to practice together and share tips",
      members: 24,
      category: "Guitar",
      level: "Beginner",
      nextSession: "Tomorrow 7:00 PM"
    },
    {
      id: 2,
      name: "Piano Practice Partners",
      description: "Weekly virtual practice sessions and technique discussions",
      members: 18,
      category: "Piano",
      level: "Intermediate",
      nextSession: "Friday 6:00 PM"
    },
    {
      id: 3,
      name: "Music Theory Study Group",
      description: "Deep dive into music theory concepts with fellow students",
      members: 15,
      category: "Theory",
      level: "All Levels",
      nextSession: "Sunday 4:00 PM"
    }
  ]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'achievement': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'help': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'discussion': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'showcase': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'achievement': return <Award className="h-4 w-4" />;
      case 'help': return <MessageCircle className="h-4 w-4" />;
      case 'discussion': return <Users className="h-4 w-4" />;
      case 'showcase': return <Star className="h-4 w-4" />;
      default: return <MessageCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar Navigation */}
      <div className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-0 h-screen">
          <StudentNavigation currentUser={currentUser} className="h-full" />
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 min-w-0">
        
        {/* Welcome Section */}
        <section className="py-8 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-800">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white mb-2">
                Student Community
              </h1>
              <p className="text-white/80">
                Connect, learn, and grow together with fellow music students
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">1,247</p>
                    <p className="text-xs text-muted-foreground">Active Students</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">89</p>
                    <p className="text-xs text-muted-foreground">Study Groups</p>
                  </div>
                  <BookOpen className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">342</p>
                    <p className="text-xs text-muted-foreground">Posts Today</p>
                  </div>
                  <MessageCircle className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">156</p>
                    <p className="text-xs text-muted-foreground">Achievements Shared</p>
                  </div>
                  <Award className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="feed" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="feed">Community Feed</TabsTrigger>
              <TabsTrigger value="groups">Study Groups</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>

            <TabsContent value="feed" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Main Feed */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Create Post */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Plus className="h-5 w-5" />
                        Share with the Community
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <Textarea
                          placeholder="Share your progress, ask for help, or celebrate an achievement..."
                          value={newPost}
                          onChange={(e) => setNewPost(e.target.value)}
                          className="min-h-[100px]"
                        />
                        <div className="flex justify-between items-center">
                          <div className="flex gap-2">
                            <Badge variant="outline">Achievement</Badge>
                            <Badge variant="outline">Help</Badge>
                            <Badge variant="outline">Discussion</Badge>
                          </div>
                          <Button className="gap-2">
                            <Send className="h-4 w-4" />
                            Post
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Posts */}
                  <div className="space-y-4">
                    {posts.map((post) => (
                      <Card key={post.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={post.avatar} />
                              <AvatarFallback>
                                {post.author.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-semibold">{post.author}</h4>
                                <Badge className={getCategoryColor(post.category)} variant="secondary">
                                  {getCategoryIcon(post.category)}
                                  <span className="ml-1">{post.category}</span>
                                </Badge>
                                <span className="text-sm text-muted-foreground">{post.timestamp}</span>
                              </div>
                              
                              <h3 className="font-medium mb-2">{post.title}</h3>
                              <p className="text-muted-foreground mb-3">{post.content}</p>
                              
                              <div className="flex flex-wrap gap-1 mb-3">
                                {post.tags.map((tag, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    #{tag}
                                  </Badge>
                                ))}
                              </div>
                              
                              <div className="flex items-center gap-4">
                                <Button variant="ghost" size="sm" className="gap-2">
                                  <ThumbsUp className={`h-4 w-4 ${post.isLiked ? 'text-blue-500' : ''}`} />
                                  {post.likes}
                                </Button>
                                <Button variant="ghost" size="sm" className="gap-2">
                                  <MessageCircle className="h-4 w-4" />
                                  {post.comments}
                                </Button>
                                <Button variant="ghost" size="sm" className="gap-2">
                                  <Share2 className="h-4 w-4" />
                                  Share
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Active Study Groups */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">My Study Groups</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {studyGroups.slice(0, 3).map((group) => (
                          <div key={group.id} className="p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                            <h4 className="font-medium text-sm">{group.name}</h4>
                            <p className="text-xs text-muted-foreground mb-2">{group.members} members</p>
                            {group.nextSession && (
                              <div className="flex items-center gap-1 text-xs text-primary">
                                <Clock className="h-3 w-3" />
                                {group.nextSession}
                              </div>
                            )}
                          </div>
                        ))}
                        <Button variant="outline" size="sm" className="w-full">
                          View All Groups
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Trending Topics */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Trending Topics
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="p-2 rounded hover:bg-muted/50 cursor-pointer">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">#guitar-practice</span>
                            <span className="text-xs text-muted-foreground">124 posts</span>
                          </div>
                        </div>
                        <div className="p-2 rounded hover:bg-muted/50 cursor-pointer">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">#piano-tips</span>
                            <span className="text-xs text-muted-foreground">89 posts</span>
                          </div>
                        </div>
                        <div className="p-2 rounded hover:bg-muted/50 cursor-pointer">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">#music-theory</span>
                            <span className="text-xs text-muted-foreground">67 posts</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="groups" className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Study Groups</h2>
                  <p className="text-muted-foreground">Join groups to practice and learn together</p>
                </div>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Create Group
                </Button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {studyGroups.map((group) => (
                  <Card key={group.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{group.name}</CardTitle>
                      <CardDescription>{group.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Members:</span>
                          <span className="font-medium">{group.members}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Level:</span>
                          <Badge variant="outline">{group.level}</Badge>
                        </div>
                        {group.nextSession && (
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Next Session:</span>
                            <span className="font-medium text-primary">{group.nextSession}</span>
                          </div>
                        )}
                        <Button className="w-full">Join Group</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="events" className="space-y-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">Community Events</h3>
                  <p className="text-muted-foreground mb-4">
                    Virtual concerts, workshops, and community challenges coming soon!
                  </p>
                  <Button variant="outline">Get Notified</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Trophy className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">Community Achievements</h3>
                  <p className="text-muted-foreground mb-4">
                    Celebrate milestones and achievements with fellow students
                  </p>
                  <Button variant="outline">Share Achievement</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default StudentCommunity;