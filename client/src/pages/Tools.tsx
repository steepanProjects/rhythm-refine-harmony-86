import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Play, 
  Pause, 
  Volume2, 
  Music, 
  Timer,
  Zap,
  Target,
  BookOpen,
  Mic,
  Download,
  Settings,
  RotateCcw,
  Square,
  Circle
} from "lucide-react";

const Tools = () => {
  const [isMetronomeActive, setIsMetronomeActive] = useState(false);
  const [bpm, setBpm] = useState([120]);
  const [selectedKey, setSelectedKey] = useState("C");
  const [selectedScale, setSelectedScale] = useState("major");
  const [tunerNote, setTunerNote] = useState("A4");
  const [frequency, setFrequency] = useState(440);

  const tools = [
    {
      category: "Practice Essentials",
      items: [
        {
          title: "Metronome",
          description: "Professional metronome with customizable beats and subdivisions",
          icon: Timer,
          color: "bg-blue-500",
          featured: true
        },
        {
          title: "Chromatic Tuner",
          description: "Accurate tuning for all instruments with visual feedback",
          icon: Target,
          color: "bg-green-500",
          featured: true
        },
        {
          title: "Scale Trainer",
          description: "Practice scales and modes with audio playback",
          icon: Music,
          color: "bg-purple-500",
          featured: true
        }
      ]
    },
    {
      category: "Theory & Training",
      items: [
        {
          title: "Interval Trainer",
          description: "Develop your ear with interval recognition exercises",
          icon: Zap,
          color: "bg-yellow-500"
        },
        {
          title: "Chord Progressions",
          description: "Generate and practice common chord progressions",
          icon: BookOpen,
          color: "bg-indigo-500"
        },
        {
          title: "Rhythm Trainer",
          description: "Master complex rhythms with visual and audio cues",
          icon: Circle,
          color: "bg-red-500"
        }
      ]
    },
    {
      category: "Recording & Analysis",
      items: [
        {
          title: "Practice Recorder",
          description: "Record your practice sessions for review and progress tracking",
          icon: Mic,
          color: "bg-pink-500"
        },
        {
          title: "Tempo Detector",
          description: "Analyze the tempo of any audio file or live performance",
          icon: Settings,
          color: "bg-teal-500"
        },
        {
          title: "Pitch Analyzer",
          description: "Visual feedback on pitch accuracy and intonation",
          icon: Volume2,
          color: "bg-orange-500"
        }
      ]
    }
  ];

  const scales = {
    major: ["C", "D", "E", "F", "G", "A", "B"],
    minor: ["C", "D", "Eb", "F", "G", "Ab", "Bb"],
    dorian: ["C", "D", "Eb", "F", "G", "A", "Bb"],
    mixolydian: ["C", "D", "E", "F", "G", "A", "Bb"],
    pentatonic: ["C", "D", "E", "G", "A"]
  };

  const chordProgressions = [
    { name: "I-V-vi-IV", chords: ["C", "G", "Am", "F"], description: "Pop progression" },
    { name: "ii-V-I", chords: ["Dm", "G", "C"], description: "Jazz standard" },
    { name: "I-vi-ii-V", chords: ["C", "Am", "Dm", "G"], description: "Circle progression" },
    { name: "I-IV-V", chords: ["C", "F", "G"], description: "Blues progression" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-4">
            Practice Tools
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional-grade practice tools to enhance your musical journey. From metronomes to ear training, everything you need in one place.
          </p>
        </div>

        {/* Featured Tools */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Featured Tools</h2>
          <Tabs defaultValue="metronome" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="metronome">Metronome</TabsTrigger>
              <TabsTrigger value="tuner">Tuner</TabsTrigger>
              <TabsTrigger value="scales">Scale Trainer</TabsTrigger>
            </TabsList>

            {/* Metronome */}
            <TabsContent value="metronome">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Timer className="h-5 w-5" />
                    Metronome
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="text-6xl font-bold mb-4">{bpm[0]}</div>
                    <div className="text-muted-foreground mb-6">BPM</div>
                    
                    <div className="flex items-center justify-center gap-4 mb-6">
                      <Button
                        size="lg"
                        variant={isMetronomeActive ? "destructive" : "hero"}
                        onClick={() => setIsMetronomeActive(!isMetronomeActive)}
                        className="px-8"
                      >
                        {isMetronomeActive ? (
                          <>
                            <Pause className="h-5 w-5 mr-2" />
                            Stop
                          </>
                        ) : (
                          <>
                            <Play className="h-5 w-5 mr-2" />
                            Start
                          </>
                        )}
                      </Button>
                      <Button variant="outline" size="lg">
                        <RotateCcw className="h-5 w-5 mr-2" />
                        Reset
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Tempo: {bpm[0]} BPM</Label>
                    <Slider
                      value={bpm}
                      onValueChange={setBpm}
                      max={200}
                      min={40}
                      step={1}
                      className="w-full"
                    />
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <Label className="text-sm">Time Signature</Label>
                        <Select defaultValue="4/4">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="4/4">4/4</SelectItem>
                            <SelectItem value="3/4">3/4</SelectItem>
                            <SelectItem value="2/4">2/4</SelectItem>
                            <SelectItem value="6/8">6/8</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label className="text-sm">Sound</Label>
                        <Select defaultValue="click">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="click">Click</SelectItem>
                            <SelectItem value="beep">Beep</SelectItem>
                            <SelectItem value="tick">Tick</SelectItem>
                            <SelectItem value="wood">Wood Block</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-sm">Volume</Label>
                        <Slider defaultValue={[75]} max={100} min={0} step={1} />
                      </div>

                      <div>
                        <Label className="text-sm">Subdivision</Label>
                        <Select defaultValue="quarter">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="quarter">Quarter Notes</SelectItem>
                            <SelectItem value="eighth">Eighth Notes</SelectItem>
                            <SelectItem value="sixteenth">Sixteenth Notes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tuner */}
            <TabsContent value="tuner">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Chromatic Tuner
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">{tunerNote}</div>
                    <div className="text-muted-foreground mb-6">{frequency} Hz</div>
                    
                    {/* Tuning Indicator */}
                    <div className="relative h-16 bg-muted rounded-lg mb-6 flex items-center justify-center">
                      <div className="absolute left-4 text-red-500">♭</div>
                      <div className="absolute right-4 text-red-500">♯</div>
                      <div className="w-1 h-12 bg-green-500 rounded"></div>
                      <div className="text-sm text-muted-foreground mt-16">In Tune</div>
                    </div>

                    <Button size="lg" variant="hero" className="mb-4">
                      <Mic className="h-5 w-5 mr-2" />
                      Start Listening
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm">Reference Pitch</Label>
                      <Input 
                        type="number" 
                        value={frequency} 
                        onChange={(e) => setFrequency(Number(e.target.value))}
                        min="400"
                        max="480"
                      />
                    </div>
                    <div>
                      <Label className="text-sm">Instrument</Label>
                      <Select defaultValue="guitar">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="guitar">Guitar</SelectItem>
                          <SelectItem value="bass">Bass</SelectItem>
                          <SelectItem value="violin">Violin</SelectItem>
                          <SelectItem value="ukulele">Ukulele</SelectItem>
                          <SelectItem value="chromatic">Chromatic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Scale Trainer */}
            <TabsContent value="scales">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Music className="h-5 w-5" />
                    Scale Trainer
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm">Key</Label>
                      <Select value={selectedKey} onValueChange={setSelectedKey}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"].map(key => (
                            <SelectItem key={key} value={key}>{key}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-sm">Scale Type</Label>
                      <Select value={selectedScale} onValueChange={setSelectedScale}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="major">Major</SelectItem>
                          <SelectItem value="minor">Natural Minor</SelectItem>
                          <SelectItem value="dorian">Dorian</SelectItem>
                          <SelectItem value="mixolydian">Mixolydian</SelectItem>
                          <SelectItem value="pentatonic">Pentatonic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="text-center">
                    <h3 className="text-xl font-semibold mb-4">{selectedKey} {selectedScale.charAt(0).toUpperCase() + selectedScale.slice(1)} Scale</h3>
                    <div className="flex justify-center gap-4 mb-6">
                      {scales[selectedScale as keyof typeof scales]?.map((note, index) => (
                        <div key={index} className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                          {note}
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-center gap-4">
                      <Button variant="hero">
                        <Play className="h-4 w-4 mr-2" />
                        Play Scale
                      </Button>
                      <Button variant="outline">
                        <Volume2 className="h-4 w-4 mr-2" />
                        Play Arpeggios
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* All Tools Grid */}
        <div className="space-y-8">
          {tools.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h2 className="text-2xl font-bold mb-6">{category.category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((tool, toolIndex) => (
                  <Card key={toolIndex} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 ${tool.color} rounded-lg flex items-center justify-center mb-4`}>
                        <tool.icon className="h-6 w-6 text-white" />
                      </div>
                      
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold">{tool.title}</h3>
                        {tool.featured && (
                          <Badge variant="secondary" className="text-xs">Featured</Badge>
                        )}
                      </div>
                      
                      <p className="text-muted-foreground text-sm mb-4">{tool.description}</p>
                      
                      <Button variant="outline" className="w-full">
                        Open Tool
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Tools */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Quick Tools</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chord Progressions */}
            <Card>
              <CardHeader>
                <CardTitle>Chord Progression Generator</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {chordProgressions.map((progression, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <div className="font-medium">{progression.name}</div>
                      <div className="text-sm text-muted-foreground">{progression.description}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {progression.chords.map((chord, chordIndex) => (
                          <Badge key={chordIndex} variant="outline" className="text-xs">
                            {chord}
                          </Badge>
                        ))}
                      </div>
                      <Button size="icon" variant="ghost">
                        <Play className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Practice Timer */}
            <Card>
              <CardHeader>
                <CardTitle>Practice Session Timer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">25:00</div>
                  <div className="text-muted-foreground mb-4">Practice Session</div>
                  
                  <div className="flex justify-center gap-2 mb-4">
                    <Button variant="hero">
                      <Play className="h-4 w-4 mr-2" />
                      Start
                    </Button>
                    <Button variant="outline">
                      <Pause className="h-4 w-4 mr-2" />
                      Pause
                    </Button>
                    <Button variant="outline">
                      <Square className="h-4 w-4 mr-2" />
                      Stop
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-sm">Session Duration</Label>
                    <Select defaultValue="25">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="25">25 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="45">45 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Tools;