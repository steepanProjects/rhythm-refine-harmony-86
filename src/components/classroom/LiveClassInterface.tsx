import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Video, 
  Mic, 
  MicOff, 
  VideoOff, 
  Users, 
  MessageSquare, 
  Share, 
  Settings,
  Hand,
  PhoneOff
} from "lucide-react";

type Role = "master" | "staff" | "student";

interface LiveClassInterfaceProps {
  role: Role;
  classId: string;
}

export const LiveClassInterface = ({ role, classId }: LiveClassInterfaceProps) => {
  return (
    <div className="space-y-6">
      {/* Class Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5" />
                Advanced Piano Techniques - Live Session
              </CardTitle>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="destructive" className="animate-pulse">🔴 LIVE</Badge>
                <span className="text-sm text-muted-foreground">24 participants</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="destructive" size="sm">
                <PhoneOff className="h-4 w-4 mr-2" />
                Leave
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Video Area */}
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="p-0">
              <div className="aspect-video bg-black rounded-t-lg flex items-center justify-center">
                <div className="text-white text-center">
                  <Video className="h-16 w-16 mx-auto mb-4" />
                  <p className="text-lg">Video Stream Placeholder</p>
                  <p className="text-sm opacity-75">Live class video would appear here</p>
                </div>
              </div>
              
              {/* Controls */}
              <div className="p-4 flex items-center justify-between bg-card border-t">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Mic className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Video className="h-4 w-4" />
                  </Button>
                  {role === "student" && (
                    <Button variant="outline" size="sm">
                      <Hand className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Participants */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Users className="h-4 w-4" />
                Participants (24)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {Array.from({ length: 8 }, (_, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span>Student {i + 1}</span>
                    <div className="flex gap-1">
                      {i < 3 && <MicOff className="h-3 w-3 text-muted-foreground" />}
                      {i === 1 && <Hand className="h-3 w-3 text-primary" />}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Live Chat
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-2 max-h-64 overflow-y-auto">
                <div className="text-xs p-2 bg-muted rounded">
                  <span className="font-medium">Alice:</span> Great explanation!
                </div>
                <div className="text-xs p-2 bg-muted rounded">
                  <span className="font-medium">Bob:</span> Can you repeat the last part?
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};