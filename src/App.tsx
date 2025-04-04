
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ChatbotProvider } from "@/context/ChatbotContext";
import Index from "./pages/Index";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Resources from "./pages/Resources";
import GrantAssistant from "./pages/GrantAssistant";
import Applications from "./pages/Applications";
import NewApplication from "./pages/NewApplication";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Statistics from "./pages/Statistics";
import { ChatBot } from "./components/ChatBot";
import { GrantApplicationForm } from "./components/GrantApplicationForm";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ChatbotProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/grant-assistant" element={<GrantAssistant />} />
              <Route path="/applications" element={<Applications />} />
              <Route path="/new-application" element={<NewApplication />} />
              <Route path="/apply" element={<GrantApplicationForm />} />
              <Route path="/apply/:grantId" element={<GrantApplicationForm />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/stats" element={<Statistics />} />
            </Routes>
            <ChatBot />
          </BrowserRouter>
        </TooltipProvider>
      </ChatbotProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
