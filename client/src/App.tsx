import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Instruments from "./pages/Instruments";
import FAQ from "./pages/FAQ";
import Donations from "./pages/Donations";
import Partnership from "./pages/Partnership";
import Login from "./pages/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";
import { useEffect } from "react";
import applyTextAlternation, { removeTextAlternation } from "./lib/textAlternator";
import { useLocation } from "wouter";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/about"} component={About} />
      <Route path={"/instruments"} component={Instruments} />
      <Route path={"/faq"} component={FAQ} />
      <Route path={"/donations"} component={Donations} />
      <Route path={"/partnership"} component={Partnership} />
      <Route path={"/login"} component={Login} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [location] = useLocation();
  useEffect(() => {
    // apply the alternation after mount and on SPA route changes
    if (typeof window !== "undefined") {
      try {
        const root = document.querySelector("main") || document.body;
        // remove previous alternation to avoid stale spans
        removeTextAlternation(root as HTMLElement);
        // apply alternation to current content
        applyTextAlternation(root as HTMLElement);
      } catch (e) {
        // fail silently
      }
    }
  }, [location]);
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              <Router />
            </main>
            <Footer />
          </div>
          <ChatBot />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
