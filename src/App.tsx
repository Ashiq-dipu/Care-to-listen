import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AudioProvider } from "./context/AudioContext";
import { Navbar } from "./components/Navbar";
import { AudioPlayer } from "./components/AudioPlayer";
import { Home } from "./pages/Home";
import { Episodes } from "./pages/Episodes";
import { Hosts } from "./pages/Hosts";
import { Guests } from "./pages/Guests";
import { Videos } from "./pages/Videos";
import { About } from "./pages/About";
import { Mission } from "./pages/Mission";
import { Resources } from "./pages/Resources";
import { Community } from "./pages/Community";
import { Contact } from "./pages/Contact";
import { BecomeAGuest } from "./pages/BecomeAGuest";
import { RequestEpisode } from "./pages/RequestEpisode";
import { Admin } from "./pages/Admin";

// Scroll to top helper on navigation
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export const App: React.FC = () => {
  return (
    <AudioProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-[#F4F1EA] text-[#111111] font-sans antialiased selection:bg-[#E63B2E] selection:text-white">
          <Navbar />
          
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/index.html" element={<Home />} />
              
              <Route path="/episodes" element={<Episodes />} />
              <Route path="/episodes.html" element={<Episodes />} />
              
              <Route path="/hosts" element={<Hosts />} />
              <Route path="/hosts.html" element={<Hosts />} />
              
              <Route path="/guests" element={<Guests />} />
              <Route path="/guests.html" element={<Guests />} />
              
              <Route path="/videos" element={<Videos />} />
              <Route path="/videos.html" element={<Videos />} />
              
              <Route path="/about" element={<About />} />
              <Route path="/about.html" element={<About />} />
              
              <Route path="/mission" element={<Mission />} />
              <Route path="/mission.html" element={<Mission />} />
              
              <Route path="/resources" element={<Resources />} />
              <Route path="/resources.html" element={<Resources />} />
              
              <Route path="/community" element={<Community />} />
              <Route path="/community.html" element={<Community />} />
              
              <Route path="/contact" element={<Contact />} />
              <Route path="/contact.html" element={<Contact />} />
              
              <Route path="/become-a-guest" element={<BecomeAGuest />} />
              <Route path="/become-a-guest.html" element={<BecomeAGuest />} />
              
              <Route path="/request-episode" element={<RequestEpisode />} />
              <Route path="/request-episode.html" element={<RequestEpisode />} />
              
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin.html" element={<Admin />} />
              
              <Route path="*" element={<Home />} />
            </Routes>
          </main>

          <AudioPlayer />
        </div>
      </BrowserRouter>
    </AudioProvider>
  );
};

export default App;
