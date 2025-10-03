import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Mail, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ForgotPassword() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [method, setMethod] = useState<"sms" | "email">("sms");
  const [contact, setContact] = useState("");

  const handleSendInstructions = () => {
    toast({
      title: "Instructions sent",
      description: `Reset instructions have been sent via ${method}`,
    });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-md h-full flex flex-col">
        <div className="flex justify-start mb-8">
          <Button
            variant="ghost"
            onClick={() => setLocation("/login")}
            className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 p-2"
            data-testid="button-back"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="ml-2">Back</span>
          </Button>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <h1 
            className="text-3xl font-bold text-gray-900 mb-2"
            data-testid="text-title"
          >
            Forgot Password
          </h1>
          <p className="text-gray-600 mb-8">
            Enter your email or phone number to receive reset instructions
          </p>

          <div className="flex gap-2 mb-6">
            <Button
              type="button"
              variant={method === "sms" ? "default" : "outline"}
              className={`flex-1 ${method === "sms" ? "bg-blue-600 hover:bg-blue-700" : "border-blue-600 text-blue-600"}`}
              onClick={() => setMethod("sms")}
              data-testid="button-method-sms"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              SMS
            </Button>
            <Button
              type="button"
              variant={method === "email" ? "default" : "outline"}
              className={`flex-1 ${method === "email" ? "bg-blue-600 hover:bg-blue-700" : "border-blue-600 text-blue-600"}`}
              onClick={() => setMethod("email")}
              data-testid="button-method-email"
            >
              <Mail className="w-4 h-4 mr-2" />
              Email
            </Button>
          </div>

          <div className="space-y-6">
            {method === "sms" ? (
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
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="flex-1"
                    data-testid="input-contact"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  data-testid="input-contact"
                />
              </div>
            )}

            <Button
              onClick={handleSendInstructions}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-lg text-base font-medium"
              data-testid="button-send"
            >
              Send instructions
            </Button>

            <Button
              variant="link"
              onClick={() => setLocation("/login")}
              className="w-full text-blue-600 hover:text-blue-700 text-sm"
              data-testid="button-back-login"
            >
              ← Back to Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
