import { useState } from "react";
import { Calendar, Clock, Users, Star, Video, MessageCircle, Heart, Mic, MicOff, VideoOff, Settings, Share, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// Interactive Demo Component for Live Session Interface
const LiveSessionDemo = ({ session, isLive = false }: { session: any, isLive?: boolean }) => {
  const [isJoined, setIsJoined] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoOff, setIsVideoOff] = useState(true);
  const [chatMessage, setChatMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { user: "Sarah M.", message: "Great technique on that chord progression!", time: "2:34" },
    { user: "Marcus J.", message: "Thanks! Let's try it together now", time: "2:35", isMentor: true },
    { user: "Alex R.", message: "Can you show that fingering again?", time: "2:36" },
  ]);
  const { toast } = useToast();

  const handleJoinSession = () => {
    setIsJoined(true);
    toast({
      title: "Joined Session!",
      description: `Welcome to ${session.title}`,
    });
  };

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      setChatMessages([...chatMessages, {
        user: "You",
        message: chatMessage,
        time: new Date().toLocaleTimeString().slice(0, 5)
      }]);
      setChatMessage("");
    }
  };

  if (!isJoined) {
    return (
      <Card className={`p-6 ${isLive ? 'border-red-200 bg-red-50/50 dark:bg-red-950/20' : ''} hover:shadow-glow transition-all duration-300`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">{session.title}</h3>
            <p className="text-muted-foreground mb-2">by {session.mentor}</p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              {isLive ? (
                <>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{session.viewers} watching</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{session.duration}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{session.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{session.time}</span>
                  </div>
                </>
              )}
            </div>
          </div>
          {isLive && <Badge className="bg-red-500 text-white">LIVE</Badge>}
          {!isLive && session.level && (
            <Badge className={session.level === 'Beginner' ? 'bg-green-100 text-green-800' : session.level === 'Advanced' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}>
              {session.level}
            </Badge>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {session.tags.map((tag: string) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {!isLive && (
          <div className="flex items-center justify-between mb-4">
            <div className="text-2xl font-bold text-primary">{session.price}</div>
            <div className="text-sm text-muted-foreground">
              {session.participants}/{session.maxParticipants} joined
            </div>
          </div>
        )}

        <Button variant="hero" className="w-full" onClick={handleJoinSession}>
          <Video className="mr-2 h-4 w-4" />
          {isLive ? 'Join Live Session' : 'Reserve Spot'}
        </Button>
      </Card>
    );
  }

  // Live Session Interface
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
      {/* Main Video Area */}
      <div className="lg:col-span-2">
        <Card className="h-full p-4">
          <div className="relative h-full bg-black rounded-lg overflow-hidden">
            {/* Simulated Video Feed */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-4xl mb-4">🎹</div>
                <h3 className="text-xl font-semibold mb-2">{session.mentor}</h3>
                <p className="text-sm opacity-75">{session.title}</p>
              </div>
            </div>

            {/* Your Video (Picture-in-Picture) */}
            <div className="absolute bottom-4 right-4 w-32 h-24 bg-gray-800 rounded-lg border-2 border-white/20 flex items-center justify-center">
              {isVideoOff ? (
                <div className="text-white text-xs">Camera Off</div>
              ) : (
                <div className="text-white text-xs">You</div>
              )}
            </div>

            {/* Live Indicators */}
            <div className="absolute top-4 left-4 flex items-center space-x-2">
              <div className="flex items-center space-x-1 bg-red-500 px-2 py-1 rounded text-white text-xs">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                LIVE
              </div>
              <div className="bg-black/50 px-2 py-1 rounded text-white text-xs">
                {isLive ? session.viewers : session.participants} participants
              </div>
            </div>

            {/* Controls */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2">
              <Button
                size="sm"
                variant={isMuted ? "destructive" : "secondary"}
                onClick={() => setIsMuted(!isMuted)}
                className="rounded-full w-10 h-10"
              >
                {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
              <Button
                size="sm"
                variant={isVideoOff ? "destructive" : "secondary"}
                onClick={() => setIsVideoOff(!isVideoOff)}
                className="rounded-full w-10 h-10"
              >
                {isVideoOff ? <VideoOff className="h-4 w-4" /> : <Video className="h-4 w-4" />}
              </Button>
              <Button size="sm" variant="secondary" className="rounded-full w-10 h-10">
                <Settings className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="secondary" className="rounded-full w-10 h-10">
                <Share className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="destructive" className="rounded-full w-10 h-10">
                <PhoneCall className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Chat & Participants */}
      <div className="space-y-4">
        {/* Participants Panel */}
        <Card className="p-4">
          <h4 className="font-semibold mb-3 flex items-center">
            <Users className="mr-2 h-4 w-4" />
            Participants ({isLive ? session.viewers : session.participants})
          </h4>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            <div className="flex items-center space-x-2 p-2 bg-primary/10 rounded">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-xs bg-gradient-hero text-primary-foreground">
                  {session.mentor.split(' ').map((n: string) => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{session.mentor}</span>
              <Badge variant="secondary" className="text-xs">Host</Badge>
            </div>
            {["Sarah M.", "Alex R.", "Emma K.", "David L."].map((name, i) => (
              <div key={name} className="flex items-center space-x-2 p-1">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-xs">{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <span className="text-sm">{name}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Chat Panel */}
        <Card className="p-4 flex-1">
          <h4 className="font-semibold mb-3 flex items-center">
            <MessageCircle className="mr-2 h-4 w-4" />
            Chat
          </h4>
          <div className="space-y-2 max-h-48 overflow-y-auto mb-3">
            {chatMessages.map((msg, i) => (
              <div key={i} className={`p-2 rounded text-sm ${msg.isMentor ? 'bg-primary/10 border-l-2 border-primary' : 'bg-muted/50'}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-xs">{msg.user}</span>
                  <span className="text-xs text-muted-foreground">{msg.time}</span>
                </div>
                <p className="text-xs">{msg.message}</p>
              </div>
            ))}
          </div>
          <div className="flex space-x-2">
            <Input
              placeholder="Type a message..."
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="text-sm"
            />
            <Button size="sm" onClick={handleSendMessage}>Send</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export const LiveSessions = () => {
  const [selectedSession, setSelectedSession] = useState<any>(null);

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
            Join interactive live sessions with expert mentors and fellow musicians. Click any session to try our interactive demo!
          </p>
        </div>

        {/* Demo Session (if selected) */}
        {selectedSession && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Live Session Demo</h2>
              <Button variant="outline" onClick={() => setSelectedSession(null)}>
                Back to Sessions
              </Button>
            </div>
            <LiveSessionDemo session={selectedSession} isLive={selectedSession.viewers !== undefined} />
          </div>
        )}

        {/* Live Now Section */}
        {!selectedSession && liveNow.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <h2 className="text-2xl font-bold">Live Now - Try Interactive Demo!</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {liveNow.map((session) => (
                <div key={session.id} onClick={() => setSelectedSession(session)} className="cursor-pointer">
                  <LiveSessionDemo session={session} isLive={true} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Sessions */}
        {!selectedSession && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Upcoming Sessions - Click to Try Demo!</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {upcomingSessions.map((session) => (
                <div key={session.id} onClick={() => setSelectedSession(session)} className="cursor-pointer">
                  <LiveSessionDemo session={session} isLive={false} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Host Session CTA */}
        {!selectedSession && (
          <div className="text-center mt-16 p-8 bg-gradient-subtle rounded-xl">
            <h3 className="text-2xl font-bold mb-4">Want to Host a Session?</h3>
            <p className="text-muted-foreground mb-6">Share your expertise with the community</p>
            <Button variant="hero" size="lg">
              Become a Mentor
            </Button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};