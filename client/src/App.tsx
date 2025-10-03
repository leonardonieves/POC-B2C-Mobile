import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import Splash from "@/pages/Splash";
import Carousel from "@/pages/Carousel";
import GetStarted from "@/pages/GetStarted";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Splash} />
      <Route path="/carousel" component={Carousel} />
      <Route path="/get-started" component={GetStarted} />
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
