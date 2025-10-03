import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const slides = [
  {
    title: "Real-time updates and effortless school management—making school life easier for every parent.",
    illustration: (
      <div className="relative w-48 h-48 mx-auto">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center">
            <svg className="w-20 h-20 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-12 h-12 bg-blue-600 rounded transform -translate-x-4 -translate-y-4"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-4 border-gray-300 rounded-full"></div>
      </div>
    ),
  },
  {
    title: "Discover the right school and apply in minutes, stay on top of grades and homework instantly and track your child's bus.",
    illustration: (
      <div className="relative w-48 h-48 mx-auto">
        <div className="relative flex items-center justify-center h-full">
          <svg className="w-40 h-40" viewBox="0 0 200 200" fill="none">
            <rect x="30" y="80" width="140" height="70" rx="10" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="3"/>
            <rect x="40" y="95" width="40" height="30" rx="4" fill="#60A5FA"/>
            <rect x="90" y="95" width="40" height="30" rx="4" fill="#60A5FA"/>
            <circle cx="60" cy="140" r="12" fill="#1F2937"/>
            <circle cx="140" cy="140" r="12" fill="#1F2937"/>
            <path d="M30 80 L100 40 L170 80" stroke="#9CA3AF" strokeWidth="3" fill="none"/>
            <circle cx="170" cy="60" r="15" fill="#3B82F6"/>
            <path d="M165 60 L170 65 L178 52" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    ),
  },
  {
    title: "Faster, simpler, and more secure than any school portal — everything parents need in one app.",
    illustration: (
      <div className="relative w-48 h-48 mx-auto">
        <div className="relative flex items-center justify-center h-full">
          <svg className="w-40 h-40" viewBox="0 0 200 200" fill="none">
            <path d="M100 40 L100 160 M60 80 L140 80 M60 120 L140 120" stroke="#9CA3AF" strokeWidth="3" strokeLinecap="round"/>
            <circle cx="100" cy="100" r="50" fill="none" stroke="#3B82F6" strokeWidth="4"/>
            <path d="M80 100 L95 115 L125 85" stroke="#3B82F6" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="160" cy="60" r="8" fill="#1F2937"/>
            <circle cx="40" cy="140" r="8" fill="#1F2937"/>
          </svg>
        </div>
      </div>
    ),
  },
];

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [, setLocation] = useLocation();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setLocation("/get-started");
    }
  };

  const handleSkip = () => {
    setLocation("/get-started");
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-md h-full flex flex-col">
        <div className="flex justify-end mb-8">
          <Button
            variant="ghost"
            onClick={handleSkip}
            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            data-testid="button-skip"
          >
            SKIP
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <div className="mb-12" data-testid={`illustration-${currentSlide}`}>
            {slides[currentSlide].illustration}
          </div>

          <h2 
            className="text-xl font-semibold text-gray-900 text-center leading-relaxed mb-16 max-w-sm"
            data-testid={`text-slide-title-${currentSlide}`}
          >
            {slides[currentSlide].title}
          </h2>

          <div className="flex gap-2 mb-8" data-testid="carousel-indicators">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? "w-8 bg-blue-600"
                    : "w-2 bg-gray-300"
                }`}
                data-testid={`indicator-${index}`}
              />
            ))}
          </div>
        </div>

        <Button
          onClick={handleNext}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-lg text-base font-medium"
          data-testid="button-next"
        >
          {currentSlide < slides.length - 1 ? "Next" : "Get Started"}
        </Button>
      </div>
    </div>
  );
}
