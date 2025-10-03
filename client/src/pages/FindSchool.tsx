import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function FindSchool() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-md h-full flex flex-col">
        <div className="flex justify-start mb-8">
          <Button
            variant="ghost"
            onClick={() => setLocation("/welcome")}
            className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 p-2"
            data-testid="button-back"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="ml-2">Back</span>
          </Button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <h1 
            className="text-2xl font-bold text-gray-900 mb-4"
            data-testid="text-title"
          >
            My child is not yet enrolled in a school
          </h1>
          
          <p className="text-gray-600 mb-12 max-w-sm">
            Browse our network of partner schools, compare programs and tuition, and apply directly through the app.
          </p>

          <div className="relative w-64 h-64 mb-12">
            <svg className="w-full h-full" viewBox="0 0 200 200" fill="none">
              <circle cx="100" cy="100" r="80" fill="#E5E7EB"/>
              <path d="M100 40 L100 160 M60 100 L140 100" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round"/>
              <circle cx="70" cy="70" r="12" fill="#60A5FA"/>
              <circle cx="130" cy="70" r="12" fill="#60A5FA"/>
              <circle cx="100" cy="130" r="12" fill="#60A5FA"/>
              <path d="M50 180 Q100 160 150 180" stroke="#9CA3AF" strokeWidth="3" fill="none"/>
            </svg>
          </div>

          <Button
            onClick={() => setLocation("/home")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-lg text-base font-medium"
            data-testid="button-find-school"
          >
            Find a School
          </Button>
        </div>
      </div>
    </div>
  );
}
