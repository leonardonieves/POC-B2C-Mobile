import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export default function GetStarted() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-md flex flex-col items-center justify-center space-y-8">
        <div className="text-center space-y-4 mb-8">
          <h1 
            className="text-4xl font-bold text-gray-900"
            data-testid="text-title"
          >
            Get started!
          </h1>
          <p 
            className="text-gray-600 text-sm"
            data-testid="text-subtitle"
          >
            Choose how you'd like to continue
          </p>
        </div>

        <div className="w-full space-y-4">
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-lg text-base font-medium"
            data-testid="button-create-account"
          >
            Create an Account
          </Button>

          <Button
            variant="outline"
            className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 py-6 rounded-lg text-base font-medium"
            data-testid="button-login"
          >
            I have an account: Login
          </Button>

          <Button
            variant="link"
            className="w-full text-gray-600 hover:text-gray-900 py-3 text-sm"
            data-testid="button-forgot-password"
          >
            Forgot my password
          </Button>

          <Button
            variant="link"
            className="w-full text-blue-600 hover:text-blue-700 py-3 text-sm flex items-center justify-center gap-1"
            data-testid="button-continue-guest"
          >
            Continue as Guest
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
