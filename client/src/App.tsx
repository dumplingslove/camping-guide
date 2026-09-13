import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, Router as WouterRouter } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import Home from "./pages/Home";
import CampgroundDetail from "./pages/CampgroundDetail";
import Compare from "./pages/Compare";
import Favorites from "./pages/Favorites";
import Itinerary from "./pages/Itinerary";
import AdminReviews from "./pages/AdminReviews";
import MapPage from "./pages/MapPage";
import Stats from "./pages/Stats";
import Login from "./pages/Login";
function AppRouter() {
  // make sure to consider if you need authentication for certain routes
  // base="/camping-guide" because the site is served from the GitHub Pages project subpath
  return (
    <WouterRouter base="/camping-guide">
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/campground/:id" component={CampgroundDetail} />
      <Route path="/compare" component={Compare} />
      <Route path="/favorites" component={Favorites} />
      <Route path="/itinerary" component={Itinerary} />
      <Route path="/map" component={MapPage} />
      <Route path="/stats" component={Stats} />
      <Route path="/admin/reviews" component={AdminReviews} />
      <Route path="/login" component={Login} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
    </WouterRouter>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <FavoritesProvider>
          <TooltipProvider>
            <Toaster />
            <AppRouter />
          </TooltipProvider>
        </FavoritesProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
