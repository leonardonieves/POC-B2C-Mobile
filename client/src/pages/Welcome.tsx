import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export default function Welcome() {
  const [, setLocation] = useLocation();
  const userName = localStorage.getItem("userName") || "User";

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-md flex flex-col items-center justify-center space-y-12">
        <div className="text-center">
          <h1 
            className="text-3xl font-bold text-gray-900 mb-4"
            data-testid="text-title"
          >
            Welcome to HEMLE!
          </h1>
          <p className="text-xl text-gray-700 mb-2">
            Let's connect your child's education
          </p>
        </div>

        <div className="w-full space-y-4">
          <Button
            onClick={() => setLocation("/find-school")}
            variant="outline"
            className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 py-6 rounded-lg text-base font-medium flex items-center justify-between"
            data-testid="button-apply-school"
          >
            <span>Apply to a partner school →</span>
          </Button>
          <p className="text-sm text-gray-600 text-center">
            Your child is not yet affiliated with a school
          </p>

          <Button
            onClick={() => setLocation("/school-code")}
            variant="outline"
            className="w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 py-6 rounded-lg text-base font-medium flex items-center justify-between"
            data-testid="button-school-code"
          >
            <span>Enter a school code →</span>
          </Button>
          <p className="text-sm text-gray-600 text-center">
            Your child is already enrolled in a school
          </p>
        </div>
      </div>
    </div>
  );
}
