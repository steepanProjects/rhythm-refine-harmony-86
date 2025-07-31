import { Guitar, Piano, Drum, Mic, Music4, Music } from "lucide-react";
import { CourseCard } from "./CourseCard";

export const CourseCategories = () => {
  const categories = [
    { icon: Piano, name: "Piano", count: 245, color: "text-blue-500" },
    { icon: Guitar, name: "Guitar", count: 189, color: "text-green-500" },
    { icon: Music4, name: "Violin", count: 156, color: "text-purple-500" },
    { icon: Drum, name: "Drums", count: 98, color: "text-red-500" },
    { icon: Mic, name: "Vocals", count: 167, color: "text-yellow-500" },
    { icon: Music, name: "Theory", count: 203, color: "text-indigo-500" }
  ];

  const featuredCourses = [
    {
      title: "Complete Guitar Mastery Course",
      instructor: "John Martinez",
      rating: 4.9,
      students: 12547,
      duration: "40h",
      level: "Beginner" as const,
      price: "$89",
      image: "",
      category: "Guitar"
    },
    {
      title: "Piano for Complete Beginners",
      instructor: "Sarah Williams",
      rating: 4.8,
      students: 18923,
      duration: "25h",
      level: "Beginner" as const,
      price: "$79",
      image: "",
      category: "Piano"
    },
    {
      title: "Advanced Jazz Improvisation",
      instructor: "Marcus Johnson",
      rating: 4.9,
      students: 5647,
      duration: "35h",
      level: "Advanced" as const,
      price: "$149",
      image: "",
      category: "Jazz"
    },
    {
      title: "Violin Fundamentals & Technique",
      instructor: "Elena Rossi",
      rating: 4.7,
      students: 8934,
      duration: "30h",
      level: "Intermediate" as const,
      price: "$99",
      image: "",
      category: "Violin"
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Categories */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Learn Any Instrument
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            Choose from our wide selection of instrument courses taught by world-class musicians
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <div
                key={category.name}
                className="group p-6 bg-card rounded-xl shadow-musical hover:shadow-glow transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <div className={`p-4 rounded-lg bg-muted/50 mb-4 ${category.color} mx-auto w-fit group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300`}>
                  <category.icon className="h-8 w-8" />
                </div>
                <h3 className="font-semibold mb-2">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count} courses</p>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Courses */}
        <div className="mb-12">
          <h3 className="text-3xl font-bold mb-8 text-center">Featured Courses</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCourses.map((course, index) => (
              <CourseCard key={index} {...course} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};