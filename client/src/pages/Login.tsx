import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [language, setLanguage] = useState("en");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useMutation({
    mutationFn: async (data: { phoneNumber: string; password: string }) => {
      const res = await apiRequest("POST", "/api/login", data);
      return await res.json();
    },
    onSuccess: (user: any) => {
      localStorage.setItem("userId", user.id);
      localStorage.setItem("userName", user.fullName);
      setLocation("/welcome");
    },
    onError: () => {
      toast({
        title: "Login failed",
        description: "Invalid phone number or password",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullPhoneNumber = `+237${phoneNumber}`;
    loginMutation.mutate({ phoneNumber: fullPhoneNumber, password });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-md h-full flex flex-col">
        <div className="flex justify-between items-center mb-8">
          <Button
            variant="ghost"
            onClick={() => setLocation("/get-started")}
            className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 p-2"
            data-testid="button-back"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="ml-2">Back</span>
          </Button>
          
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-32" data-testid="select-language">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="fr">Français</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <h1 
            className="text-3xl font-bold text-gray-900 mb-2"
            data-testid="text-title"
          >
            Welcome back!
          </h1>
          <p className="text-gray-600 mb-8">
            Introduce your number and password
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="flex gap-2">
                <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
                  <span className="text-2xl">🇨🇲</span>
                  <span className="text-sm font-medium">+237</span>
                </div>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="698-024-135"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="flex-1"
                  data-testid="input-phone"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Min 6 chars, alphanumeric"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                data-testid="input-password"
                required
              />
            </div>

            <Button
              type="button"
              variant="link"
              className="p-0 h-auto text-blue-600 hover:text-blue-700 text-sm"
              onClick={() => setLocation("/forgot-password")}
              data-testid="button-forgot-password"
            >
              Forgot my password
            </Button>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-lg text-base font-medium"
              disabled={loginMutation.isPending}
              data-testid="button-login"
            >
              {loginMutation.isPending ? "Logging in..." : "Log in"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
