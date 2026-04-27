import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/features/relationship_patterns_unpacked/components/ui/sonner";
import { Toaster } from "@/features/relationship_patterns_unpacked/components/ui/toaster";
import { TooltipProvider } from "@/features/relationship_patterns_unpacked/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

