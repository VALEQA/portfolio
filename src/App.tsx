import { useState } from 'react';
import type { Project } from './types/portfolio';
import { useLenisSmoothScroll } from './hooks/useLenisSmoothScroll';
import { NavigationBar } from './components/navigation/NavigationBar';
import { HeroSection } from './components/hero/HeroSection';
import { WelcomeAnimation } from './components/hero/WelcomeAnimation';
import { EditorialProfile } from './components/profile/EditorialProfile';
import { ProjectShowcase } from './components/projects/ProjectShowcase';
import { TechGrid } from './components/tech/TechGrid';
// import { GithubActivitySection } from './components/activity/GithubActivitySection';
import { JourneyTimeline } from './components/journey/JourneyTimeline';
import { ContactSection } from './components/contact/ContactSection';
import { ProjectCaseStudyModal } from './components/projects/ProjectCaseStudyModal';
import { BeachAtmosphereProvider } from './context/BeachAtmosphereContext';

export function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  useLenisSmoothScroll();

  return (
    <BeachAtmosphereProvider>
      <div className="min-h-screen bg-[#fdf6db] text-[#0f172a] selection:bg-[#0284c7] selection:text-white">
        {showWelcome && (
          <WelcomeAnimation onComplete={() => setShowWelcome(false)} />
        )}

        <NavigationBar />

        <main className="relative">
          <HeroSection />
          <EditorialProfile />
          <ProjectShowcase onOpenProject={setActiveModalProject} />
          <TechGrid onOpenProject={setActiveModalProject} />
          {/* <GithubActivitySection /> */}
          <JourneyTimeline />
          <ContactSection />
        </main>

        <ProjectCaseStudyModal
          project={activeModalProject}
          isOpen={!!activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />
      </div>
    </BeachAtmosphereProvider>
  );
}

export default App;
