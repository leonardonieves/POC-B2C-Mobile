import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { ArrowLeft } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function VerifyPhone() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [code, setCode] = useState("");
  const userId = localStorage.getItem("userId");

  const verifyMutation = useMutation({
    mutationFn: async (data: { userId: string; code: string }) => {
      const res = await apiRequest("POST", "/api/verify", data);
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Phone verified!",
        description: "Your account has been verified successfully",
      });
      setLocation("/welcome");
    },
    onError: () => {
      toast({
        title: "Verification failed",
        description: "Invalid verification code",
        variant: "destructive",
      });
    },
  });

  const handleVerify = () => {
    if (code.length === 6 && userId) {
      verifyMutation.mutate({ userId, code });
    }
  };

  const handleResend = () => {
    toast({
      title: "Code sent",
      description: "A new verification code has been sent",
    });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-md h-full flex flex-col">
        <div className="flex justify-start mb-8">
          <Button
            variant="ghost"
            onClick={() => setLocation("/create-account")}
            className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 p-2"
            data-testid="button-back"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="ml-2">Back</span>
          </Button>
        </div>

        <div className="flex-1 flex flex-col justify-center items-center">
          <h1 
            className="text-3xl font-bold text-gray-900 mb-2 text-center"
            data-testid="text-title"
          >
            Verify your number
          </h1>
          <p className="text-gray-600 mb-12 text-center text-sm">
            A 6 digits code have been sent to<br />+237********35
          </p>

          <div className="mb-8">
            <Label className="block text-sm font-medium text-gray-700 mb-4">
              Enter Verification Code
            </Label>
            <InputOTP
              maxLength={6}
              value={code}
              onChange={setCode}
              data-testid="input-verification-code"
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <p className="text-sm text-gray-600 mb-8">
            Haven't received?{" "}
            <Button
              variant="link"
              className="p-0 h-auto text-blue-600 hover:text-blue-700 text-sm"
              onClick={handleResend}
              data-testid="button-resend"
            >
              Resend OTP
            </Button>
          </p>

          <Button
            onClick={handleVerify}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-lg text-base font-medium"
            disabled={code.length !== 6 || verifyMutation.isPending}
            data-testid="button-verify"
          >
            {verifyMutation.isPending ? "Verifying..." : "Verify"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function Label({ className, children }: { className?: string; children: React.ReactNode }) {
  return <label className={className}>{children}</label>;
}
