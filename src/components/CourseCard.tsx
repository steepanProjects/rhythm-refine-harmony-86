import { Star, Clock, Users, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CourseCardProps {
  title: string;
  instructor: string;
  rating: number;
  students: number;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  price: string;
  image: string;
  category: string;
}

export const CourseCard = ({
  title,
  instructor,
  rating,
  students,
  duration,
  level,
  price,
  image,
  category
}: CourseCardProps) => {
  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      case "Advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="group bg-card rounded-xl shadow-musical hover:shadow-glow transition-all duration-300 hover:scale-105 overflow-hidden">
      {/* Course Image */}
      <div className="relative overflow-hidden">
        <div className="h-48 bg-gradient-cool"></div>
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
        <Badge className={`absolute top-3 left-3 ${getLevelColor(level)}`}>
          {level}
        </Badge>
        <Badge className="absolute top-3 right-3 bg-background/90 text-foreground">
          {category}
        </Badge>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button variant="hero" size="icon" className="rounded-full">
            <Play className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Course Info */}
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm mb-3">by {instructor}</p>

        {/* Rating and Stats */}
        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium text-foreground">{rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{students.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-primary">{price}</div>
          <Button variant="musical" size="sm">
            Enroll Now
          </Button>
        </div>
      </div>
    </div>
  );
};