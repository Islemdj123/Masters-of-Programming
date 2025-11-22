
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Founders from "@/pages/founders";
import Administration from "@/pages/administration";
import Members from "@/pages/members";
import Projects from "@/pages/projects";
import Join from "@/pages/join";
import Contact from "@/pages/contact";
import Login from "@/pages/login";
import Dashboard from "@/pages/dashboard";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/founders" component={Founders} />
      <Route path="/administration" component={Administration} />
      <Route path="/members" component={Members} />
      <Route path="/projects" component={Projects} />
      <Route path="/join" component={Join} />
      <Route path="/contact" component={Contact} />
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
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
