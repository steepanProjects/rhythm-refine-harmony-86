import { useState } from "react";
import { Footer } from "@/components/Footer";
import { StudentNavigation } from "@/components/student/StudentNavigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Music, 
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Settings,
  Timer,
  Target,
  Zap,
  Clock,
  Headphones,
  Radio,
  Activity
} from "lucide-react";

interface PracticeSession {
  id: number;
  date: string;
  duration: number;
  tool: string;
  exercises: number;
}

const StudentTools = () => {
  const [currentUser] = useState(() => {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  });

  // Metronome State
  const [metronomeActive, setMetronomeActive] = useState(false);
  const [bpm, setBpm] = useState([120]);
  const [timeSignature, setTimeSignature] = useState("4/4");

  // Practice Timer State
  const [practiceTime, setPracticeTime] = useState(25); // minutes
  const [timerActive, setTimerActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(25 * 60); // seconds

  // Scale Trainer State
  const [selectedScale, setSelectedScale] = useState("C Major");
  const [scaleMode, setScaleMode] = useState("ascending");

  // Tuner State
  const [tunerNote, setTunerNote] = useState("A4");
  const [tunerFrequency, setTunerFrequency] = useState("440 Hz");

  // Practice stats
  const [practiceStats] = useState({
    totalSessions: 47,
    totalHours: 28.5,
    averageSession: 36,
    streakDays: 12
  });

  // Recent practice sessions
  const [recentSessions] = useState<PracticeSession[]>([
    { id: 1, date: "Today", duration: 45, tool: "Metronome", exercises: 8 },
    { id: 2, date: "Yesterday", duration: 30, tool: "Scale Trainer", exercises: 12 },
    { id: 3, date: "2 days ago", duration: 50, tool: "Practice Timer", exercises: 6 },
    { id: 4, date: "3 days ago", duration: 35, tool: "Tuner", exercises: 10 }
  ]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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
        <section className="py-8 bg-gradient-to-r from-green-600 via-blue-600 to-purple-800">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white mb-2">
                Practice Tools
              </h1>
              <p className="text-white/80">
                Professional practice tools to improve your musical skills
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          {/* Practice Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{practiceStats.totalSessions}</p>
                    <p className="text-xs text-muted-foreground">Practice Sessions</p>
                  </div>
                  <Target className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{practiceStats.totalHours}h</p>
                    <p className="text-xs text-muted-foreground">Total Practice</p>
                  </div>
                  <Clock className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{practiceStats.averageSession}m</p>
                    <p className="text-xs text-muted-foreground">Average Session</p>
                  </div>
                  <Timer className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{practiceStats.streakDays}</p>
                    <p className="text-xs text-muted-foreground">Day Streak</p>
                  </div>
                  <Zap className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Practice Tools */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="metronome" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="metronome">Metronome</TabsTrigger>
                  <TabsTrigger value="timer">Practice Timer</TabsTrigger>
                  <TabsTrigger value="scales">Scale Trainer</TabsTrigger>
                  <TabsTrigger value="tuner">Tuner</TabsTrigger>
                </TabsList>

                <TabsContent value="metronome" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Music className="h-5 w-5" />
                        Metronome
                      </CardTitle>
                      <CardDescription>
                        Practice with a steady beat to improve your timing
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* BPM Display */}
                      <div className="text-center">
                        <div className="text-6xl font-bold text-primary mb-2">
                          {bpm[0]}
                        </div>
                        <div className="text-lg text-muted-foreground">BPM</div>
                      </div>

                      {/* BPM Slider */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>40</span>
                          <span>220</span>
                        </div>
                        <Slider
                          value={bpm}
                          onValueChange={setBpm}
                          max={220}
                          min={40}
                          step={1}
                          className="w-full"
                        />
                      </div>

                      {/* Controls */}
                      <div className="flex items-center justify-center gap-4">
                        <Select value={timeSignature} onValueChange={setTimeSignature}>
                          <SelectTrigger className="w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="4/4">4/4</SelectItem>
                            <SelectItem value="3/4">3/4</SelectItem>
                            <SelectItem value="2/4">2/4</SelectItem>
                            <SelectItem value="6/8">6/8</SelectItem>
                          </SelectContent>
                        </Select>

                        <Button
                          size="lg"
                          onClick={() => setMetronomeActive(!metronomeActive)}
                          className="gap-2"
                        >
                          {metronomeActive ? (
                            <>
                              <Pause className="h-5 w-5" />
                              Stop
                            </>
                          ) : (
                            <>
                              <Play className="h-5 w-5" />
                              Start
                            </>
                          )}
                        </Button>

                        <Button variant="outline" size="lg">
                          <Volume2 className="h-5 w-5" />
                        </Button>
                      </div>

                      {/* Quick BPM Presets */}
                      <div className="grid grid-cols-4 gap-2">
                        {[60, 80, 120, 140].map((preset) => (
                          <Button
                            key={preset}
                            variant="outline"
                            size="sm"
                            onClick={() => setBpm([preset])}
                            className={bpm[0] === preset ? "bg-primary text-primary-foreground" : ""}
                          >
                            {preset}
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="timer" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Timer className="h-5 w-5" />
                        Practice Timer
                      </CardTitle>
                      <CardDescription>
                        Set focused practice sessions with Pomodoro technique
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Timer Display */}
                      <div className="text-center">
                        <div className="text-6xl font-bold text-primary mb-2">
                          {formatTime(timeRemaining)}
                        </div>
                        <div className="text-lg text-muted-foreground">
                          {timerActive ? "Practice Session Active" : "Ready to Practice"}
                        </div>
                      </div>

                      {/* Timer Presets */}
                      <div className="grid grid-cols-4 gap-2">
                        {[15, 25, 45, 60].map((minutes) => (
                          <Button
                            key={minutes}
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setPracticeTime(minutes);
                              setTimeRemaining(minutes * 60);
                            }}
                            className={practiceTime === minutes ? "bg-primary text-primary-foreground" : ""}
                          >
                            {minutes}m
                          </Button>
                        ))}
                      </div>

                      {/* Controls */}
                      <div className="flex items-center justify-center gap-4">
                        <Button
                          size="lg"
                          onClick={() => setTimerActive(!timerActive)}
                          className="gap-2"
                        >
                          {timerActive ? (
                            <>
                              <Pause className="h-5 w-5" />
                              Pause
                            </>
                          ) : (
                            <>
                              <Play className="h-5 w-5" />
                              Start
                            </>
                          )}
                        </Button>

                        <Button
                          variant="outline"
                          size="lg"
                          onClick={() => {
                            setTimerActive(false);
                            setTimeRemaining(practiceTime * 60);
                          }}
                        >
                          <RotateCcw className="h-5 w-5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="scales" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Activity className="h-5 w-5" />
                        Scale Trainer
                      </CardTitle>
                      <CardDescription>
                        Practice scales and improve your technique
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Scale Selection */}
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Scale</label>
                          <Select value={selectedScale} onValueChange={setSelectedScale}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="C Major">C Major</SelectItem>
                              <SelectItem value="G Major">G Major</SelectItem>
                              <SelectItem value="D Major">D Major</SelectItem>
                              <SelectItem value="A Major">A Major</SelectItem>
                              <SelectItem value="E Major">E Major</SelectItem>
                              <SelectItem value="A minor">A minor</SelectItem>
                              <SelectItem value="E minor">E minor</SelectItem>
                              <SelectItem value="B minor">B minor</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <label className="text-sm font-medium mb-2 block">Mode</label>
                          <Select value={scaleMode} onValueChange={setScaleMode}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ascending">Ascending</SelectItem>
                              <SelectItem value="descending">Descending</SelectItem>
                              <SelectItem value="both">Both Directions</SelectItem>
                              <SelectItem value="random">Random Notes</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Scale Display */}
                      <div className="p-6 bg-muted rounded-lg text-center">
                        <div className="text-2xl font-bold mb-2">{selectedScale}</div>
                        <div className="text-muted-foreground mb-4">
                          {scaleMode.charAt(0).toUpperCase() + scaleMode.slice(1)} Practice
                        </div>
                        
                        {/* Note sequence visualization */}
                        <div className="flex justify-center gap-2 mb-4">
                          {['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C'].map((note, index) => (
                            <div key={index} className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                              {note}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="flex justify-center gap-4">
                        <Button size="lg" className="gap-2">
                          <Play className="h-5 w-5" />
                          Play Scale
                        </Button>
                        <Button variant="outline" size="lg">
                          <Settings className="h-5 w-5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="tuner" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Radio className="h-5 w-5" />
                        Instrument Tuner
                      </CardTitle>
                      <CardDescription>
                        Tune your instrument with precision
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Tuner Display */}
                      <div className="text-center">
                        <div className="text-4xl font-bold text-primary mb-2">
                          {tunerNote}
                        </div>
                        <div className="text-lg text-muted-foreground mb-4">
                          {tunerFrequency}
                        </div>
                        
                        {/* Tuning indicator */}
                        <div className="w-full max-w-md mx-auto mb-6">
                          <div className="h-4 bg-muted rounded-full relative">
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-4 bg-primary rounded-full"></div>
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground mt-1">
                            <span>Flat</span>
                            <span>Perfect</span>
                            <span>Sharp</span>
                          </div>
                        </div>
                      </div>

                      {/* Note Selection */}
                      <div className="grid grid-cols-7 gap-2 mb-6">
                        {['C', 'D', 'E', 'F', 'G', 'A', 'B'].map((note) => (
                          <Button
                            key={note}
                            variant={tunerNote.startsWith(note) ? "default" : "outline"}
                            size="sm"
                            onClick={() => setTunerNote(`${note}4`)}
                          >
                            {note}
                          </Button>
                        ))}
                      </div>

                      {/* Controls */}
                      <div className="flex justify-center gap-4">
                        <Button size="lg" className="gap-2">
                          <Headphones className="h-5 w-5" />
                          Listen
                        </Button>
                        <Button variant="outline" size="lg">
                          <Settings className="h-5 w-5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Recent Practice */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Practice</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentSessions.map((session) => (
                      <div key={session.id} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-medium text-sm">{session.tool}</h4>
                          <span className="text-xs text-muted-foreground">{session.date}</span>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{session.duration} minutes</span>
                          <span>{session.exercises} exercises</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Practice Goals */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Today's Goals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Practice Time</span>
                        <span>30/45 min</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '67%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Scale Practice</span>
                        <span>3/5 scales</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default StudentTools;