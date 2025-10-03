import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function SchoolCode() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [code, setCode] = useState("");
  const userId = localStorage.getItem("userId");

  const validateCodeMutation = useMutation({
    mutationFn: async (schoolCode: string) => {
      const res = await fetch(`/api/schools/code/${schoolCode}`);
      if (!res.ok) throw new Error("School not found");
      return await res.json();
    },
    onSuccess: async (school: any) => {
      if (userId) {
        await apiRequest("POST", "/api/applications", {
          userId,
          schoolId: school.id,
          status: "Pending",
        });
      }
      
      toast({
        title: "School found!",
        description: `Connected to ${school.name}`,
      });
      setLocation("/home");
    },
    onError: () => {
      toast({
        title: "Invalid code",
        description: "School code not found. Please check and try again.",
        variant: "destructive",
      });
    },
  });

  const handleValidate = () => {
    if (code.trim()) {
      validateCodeMutation.mutate(code.trim().toUpperCase());
    }
  };

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

        <div className="flex-1 flex flex-col justify-center">
          <h1 
            className="text-2xl font-bold text-gray-900 mb-2"
            data-testid="text-title"
          >
            My child is enrolled and I have a school code
          </h1>
          <p className="text-gray-600 mb-8">
            If your child is already registered at one of our partner schools, enter the code provided by the school to access real-time updates and services.
          </p>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="code">Enter school code</Label>
              <Input
                id="code"
                type="text"
                placeholder="e.g. HEM1234"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                data-testid="input-school-code"
                className="uppercase"
              />
            </div>

            <Button
              onClick={handleValidate}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-lg text-base font-medium"
              disabled={!code.trim() || validateCodeMutation.isPending}
              data-testid="button-validate"
            >
              {validateCodeMutation.isPending ? "Validating..." : "Validate code"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
