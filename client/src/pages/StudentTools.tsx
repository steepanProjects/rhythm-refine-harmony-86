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

          {/* Main Practice Tools Grid */}
          <div className="grid lg:grid-cols-4 gap-6 mb-8">
            {/* Metronome Tool */}
            <div className="lg:col-span-2">

              <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900 border-blue-200 dark:border-blue-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
                    <div className="p-2 bg-blue-500 rounded-lg">
                      <Music className="h-6 w-6 text-white" />
                    </div>
                    Digital Metronome
                  </CardTitle>
                  <CardDescription className="text-blue-600 dark:text-blue-300">
                    Keep perfect time and improve your rhythm
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* BPM Display */}
                  <div className="text-center bg-white dark:bg-blue-900 rounded-xl p-6 shadow-inner">
                    <div className="text-7xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                      {bpm[0]}
                    </div>
                    <div className="text-lg text-blue-500 dark:text-blue-300 font-medium">BPM</div>
                    <div className="text-sm text-muted-foreground mt-1">{timeSignature} Time</div>
                  </div>

                  {/* BPM Slider */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm text-blue-600 dark:text-blue-300 font-medium">
                      <span>Slow (40)</span>
                      <span>Fast (220)</span>
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
                  <div className="flex items-center justify-center gap-3">
                    <Select value={timeSignature} onValueChange={setTimeSignature}>
                      <SelectTrigger className="w-20 bg-white dark:bg-blue-900 border-blue-300 dark:border-blue-700">
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
                      className="gap-2 bg-blue-600 hover:bg-blue-700 text-white"
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

                    <Button variant="outline" size="lg" className="border-blue-300 dark:border-blue-700">
                      <Volume2 className="h-5 w-5" />
                    </Button>
                  </div>

                  {/* Quick BPM Presets */}
                  <div className="grid grid-cols-4 gap-2">
                    {[60, 80, 120, 140].map((preset) => (
                      <Button
                        key={preset}
                        variant={bpm[0] === preset ? "default" : "outline"}
                        size="sm"
                        onClick={() => setBpm([preset])}
                        className={bpm[0] === preset ? "bg-blue-600 text-white" : "border-blue-300 dark:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900"}
                      >
                        {preset}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Practice Timer Tool */}
            <div className="lg:col-span-2">
              <Card className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950 dark:to-emerald-900 border-green-200 dark:border-green-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-200">
                    <div className="p-2 bg-green-500 rounded-lg">
                      <Timer className="h-6 w-6 text-white" />
                    </div>
                    Focus Timer
                  </CardTitle>
                  <CardDescription className="text-green-600 dark:text-green-300">
                    Pomodoro-style practice sessions for maximum focus
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Timer Display */}
                  <div className="text-center bg-white dark:bg-green-900 rounded-xl p-6 shadow-inner">
                    <div className="text-7xl font-bold text-green-600 dark:text-green-400 mb-2">
                      {formatTime(timeRemaining)}
                    </div>
                    <div className="text-lg text-green-500 dark:text-green-300 font-medium">
                      {timerActive ? "🎵 Practice Session Active" : "⏱️ Ready to Practice"}
                    </div>
                    <div className="w-full bg-green-200 dark:bg-green-800 rounded-full h-2 mt-4">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-1000" 
                        style={{ width: `${((practiceTime * 60 - timeRemaining) / (practiceTime * 60)) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Timer Presets */}
                  <div className="grid grid-cols-4 gap-2">
                    {[15, 25, 45, 60].map((minutes) => (
                      <Button
                        key={minutes}
                        variant={practiceTime === minutes ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                          setPracticeTime(minutes);
                          setTimeRemaining(minutes * 60);
                        }}
                        className={practiceTime === minutes ? "bg-green-600 text-white" : "border-green-300 dark:border-green-700 hover:bg-green-50 dark:hover:bg-green-900"}
                      >
                        {minutes}m
                      </Button>
                    ))}
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-center gap-3">
                    <Button
                      size="lg"
                      onClick={() => setTimerActive(!timerActive)}
                      className="gap-2 bg-green-600 hover:bg-green-700 text-white"
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
                      className="border-green-300 dark:border-green-700"
                    >
                      <RotateCcw className="h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Secondary Tools Grid */}
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            {/* Scale Trainer */}
            <Card className="bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-950 dark:to-violet-900 border-purple-200 dark:border-purple-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-800 dark:text-purple-200">
                  <div className="p-2 bg-purple-500 rounded-lg">
                    <Activity className="h-6 w-6 text-white" />
                  </div>
                  Scale Trainer
                </CardTitle>
                <CardDescription className="text-purple-600 dark:text-purple-300">
                  Master scales and improve your technique
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">

                {/* Scale Selection */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block text-purple-700 dark:text-purple-300">Scale</label>
                      <Select value={selectedScale} onValueChange={setSelectedScale}>
                        <SelectTrigger className="bg-white dark:bg-purple-900 border-purple-300 dark:border-purple-700">
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
                      <label className="text-sm font-medium mb-2 block text-purple-700 dark:text-purple-300">Mode</label>
                      <Select value={scaleMode} onValueChange={setScaleMode}>
                        <SelectTrigger className="bg-white dark:bg-purple-900 border-purple-300 dark:border-purple-700">
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
                </div>

                {/* Scale Display */}
                <div className="bg-white dark:bg-purple-900 rounded-xl p-6 text-center shadow-inner">
                  <div className="text-3xl font-bold mb-2 text-purple-600 dark:text-purple-400">{selectedScale}</div>
                  <div className="text-purple-500 dark:text-purple-300 mb-4 font-medium">
                    🎼 {scaleMode.charAt(0).toUpperCase() + scaleMode.slice(1)} Practice
                  </div>
                  
                  {/* Note sequence visualization */}
                  <div className="flex justify-center gap-2 mb-4">
                    {['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C'].map((note, index) => (
                      <div key={index} className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md hover:scale-110 transition-transform">
                        {note}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Controls */}
                <div className="flex justify-center gap-3">
                  <Button size="lg" className="gap-2 bg-purple-600 hover:bg-purple-700 text-white">
                    <Play className="h-5 w-5" />
                    Play Scale
                  </Button>
                  <Button variant="outline" size="lg" className="border-purple-300 dark:border-purple-700">
                    <Settings className="h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Instrument Tuner */}
            <Card className="bg-gradient-to-br from-orange-50 to-red-100 dark:from-orange-950 dark:to-red-900 border-orange-200 dark:border-orange-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-800 dark:text-orange-200">
                  <div className="p-2 bg-orange-500 rounded-lg">
                    <Radio className="h-6 w-6 text-white" />
                  </div>
                  Precision Tuner
                </CardTitle>
                <CardDescription className="text-orange-600 dark:text-orange-300">
                  Get perfectly in tune with chromatic accuracy
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Tuner Display */}
                <div className="text-center bg-white dark:bg-orange-900 rounded-xl p-6 shadow-inner">
                  <div className="text-5xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                    {tunerNote}
                  </div>
                  <div className="text-lg text-orange-500 dark:text-orange-300 mb-4 font-medium">
                    🎵 {tunerFrequency}
                  </div>
                  
                  {/* Tuning indicator */}
                  <div className="w-full max-w-sm mx-auto mb-4">
                    <div className="h-6 bg-orange-200 dark:bg-orange-800 rounded-full relative overflow-hidden">
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-6 bg-orange-600 dark:bg-orange-400 rounded-full z-10"></div>
                      <div className="absolute top-0 left-0 w-full h-6 bg-gradient-to-r from-red-400 via-green-400 to-red-400 opacity-60"></div>
                    </div>
                    <div className="flex justify-between text-xs text-orange-600 dark:text-orange-300 mt-2 font-medium">
                      <span>♭ Flat</span>
                      <span>✓ Perfect</span>
                      <span>♯ Sharp</span>
                    </div>
                  </div>
                </div>

                {/* Note Selection */}
                <div className="grid grid-cols-7 gap-2">
                  {['C', 'D', 'E', 'F', 'G', 'A', 'B'].map((note) => (
                    <Button
                      key={note}
                      variant={tunerNote.startsWith(note) ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTunerNote(`${note}4`)}
                      className={tunerNote.startsWith(note) ? "bg-orange-600 text-white" : "border-orange-300 dark:border-orange-700 hover:bg-orange-50 dark:hover:bg-orange-900"}
                    >
                      {note}
                    </Button>
                  ))}
                </div>

                {/* Controls */}
                <div className="flex justify-center gap-3">
                  <Button size="lg" className="gap-2 bg-orange-600 hover:bg-orange-700 text-white">
                    <Headphones className="h-5 w-5" />
                    Listen
                  </Button>
                  <Button variant="outline" size="lg" className="border-orange-300 dark:border-orange-700">
                    <Settings className="h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Tools and Sidebar */}
          <div className="grid lg:grid-cols-3 gap-6">
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