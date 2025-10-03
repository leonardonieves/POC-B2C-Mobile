import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Splash() {
  const [, setLocation] = useLocation();
  const [language, setLanguage] = useState("fr");

  const handleContinue = () => {
    setLocation("/carousel");
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md flex flex-col items-center justify-center space-y-8">
        <div className="w-full flex justify-end mb-4">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger 
              className="w-32 border-gray-300"
              data-testid="select-language"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fr">Français</SelectItem>
              <SelectItem value="en">English</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center space-y-12">
          <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-gray-400"></div>
          </div>

          <h1 
            className="text-5xl font-semibold text-gray-700 tracking-wide"
            data-testid="text-logo"
          >
            HEMLE
          </h1>
        </div>

        <Button
          onClick={handleContinue}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-lg text-base font-medium"
          data-testid="button-continue"
        >
          {language === "fr" ? "Continuer" : "Continue"}
        </Button>
      </div>
    </div>
  );
}
