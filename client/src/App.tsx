import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import Splash from "@/pages/Splash";
import Carousel from "@/pages/Carousel";
import GetStarted from "@/pages/GetStarted";
import Login from "@/pages/Login";
import CreateAccount from "@/pages/CreateAccount";
import VerifyPhone from "@/pages/VerifyPhone";
import ForgotPassword from "@/pages/ForgotPassword";
import Welcome from "@/pages/Welcome";
import SchoolCode from "@/pages/SchoolCode";
import FindSchool from "@/pages/FindSchool";
import Home from "@/pages/Home";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Splash} />
      <Route path="/carousel" component={Carousel} />
      <Route path="/get-started" component={GetStarted} />
      <Route path="/login" component={Login} />
      <Route path="/create-account" component={CreateAccount} />
      <Route path="/verify-phone" component={VerifyPhone} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/welcome" component={Welcome} />
      <Route path="/school-code" component={SchoolCode} />
      <Route path="/find-school" component={FindSchool} />
      <Route path="/home" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
