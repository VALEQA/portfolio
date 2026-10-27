import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, type MotionValue } from 'framer-motion';
import type { Project, ProjectCategory } from '../../types/portfolio';
import { projectsData } from '../../data/portfolioData';
import { FlagshipSlideCard } from './FlagshipProjectParallax';
import { FilteredProjectDock } from './FilteredProjectDock';
import { ProjectCaseStudyModal } from './ProjectCaseStudyModal';

interface ProjectShowcaseProps {
  onOpenProject?: (project: Project) => void;
}

interface IndicatorBarProps {
  index: number;
  smoothProgress: MotionValue<number>;
  totalCount: number;
}

const IndicatorBar: React.FC<IndicatorBarProps> = ({ index, smoothProgress, totalCount }) => {
  const step = 1 / totalCount;
  const scaleX = useTransform(
    smoothProgress,
    [index * step, (index + 1) * step],
    [0, 1],
    { clamp: true }
  );

  return (
    <div className="h-2 sm:h-2.5 rounded-full bg-[#faeed1] border border-[#0f172a] overflow-hidden w-4 sm:w-8">
      <motion.div className="h-full bg-[#0284c7]" style={{ scaleX }} />
    </div>
  );
};

interface FlagshipSlideStageProps {
  project: Project;
  index: number;
  totalStages: number;
  totalFlagships: number;
  smoothProgress: MotionValue<number>;
  onSelectProject: (project: Project) => void;
}

const FlagshipSlideStage: React.FC<FlagshipSlideStageProps> = ({
  project,
  index,
  totalStages,
  totalFlagships,
  smoothProgress,
  onSelectProject
}) => {
  const interval = 1 / totalStages;
  const start = (index - 0.2) * interval;
  const end = (index + 0.3) * interval;

  const y = useTransform(smoothProgress, [start, end], ['100%', '0%'], { clamp: true });
  const yMotion = index === 0 ? '0%' : y;

  return (
    <FlagshipSlideCard
      project={project}
      index={index}
      totalFlagships={totalFlagships}
      yMotion={yMotion}
      depthLevel={Math.min(index + 1, 5) as 1 | 2 | 3 | 4 | 5}
      onSelectProject={onSelectProject}
    />
  );
};

interface DockStageProps {
  dockIndex: number;
  totalStages: number;
  smoothProgress: MotionValue<number>;
  children: React.ReactNode;
}

const DockStage: React.FC<DockStageProps> = ({
  dockIndex,
  totalStages,
  smoothProgress,
  children
}) => {
  const interval = 1 / totalStages;
  const start = (dockIndex - 0.2) * interval;
  const end = (dockIndex + 0.3) * interval;
  const ySlide = useTransform(smoothProgress, [start, end], ['100%', '0%'], { clamp: true });

  return (
    <motion.div
      style={{ y: ySlide, zIndex: (dockIndex + 1) * 10 }}
      className="absolute inset-0 w-full h-full bg-[#020d18] shadow-[0_-8px_24px_rgba(15,23,42,0.35)]"
    >
      {children}
    </motion.div>
  );
};

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ onOpenProject }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [localActiveProject, setLocalActiveProject] = useState<Project | null>(null);

  const handleSelect = onOpenProject || setLocalActiveProject;
  const activeProject = onOpenProject ? null : localActiveProject;

  // featured flagship projects
  const flagshipProjects = projectsData.filter((p) => p.featured);
  const totalStages = flagshipProjects.length + 1; // Flagships + Dock

  // pinning scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // responsive spring synced with Lenis smooth scrolling
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 32,
    mass: 0.1,
    restDelta: 0.0005
  });

  return (
    <section
      id="projects"
      ref={containerRef}
      style={{ height: `${totalStages * 140}vh` }}
      className="relative bg-[#fdf6db] select-none"
    >
      {/* pinned viewport stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* progress indicators */}
        <div className="absolute top-[76px] sm:top-24 right-4 sm:right-12 z-50 flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-xl sm:rounded-2xl bg-[#fffdf5] border-2 border-[#0f172a] shadow-[2.5px_2.5px_0px_#0f172a] sm:shadow-[4px_4px_0px_#0f172a]">
          {Array.from({ length: totalStages }).map((_, idx) => (
            <IndicatorBar
              key={idx}
              index={idx}
              smoothProgress={smoothProgress}
              totalCount={totalStages}
            />
          ))}
        </div>

        {/* flagship slide presentation */}
        {flagshipProjects.map((project, index) => (
          <FlagshipSlideStage
            key={project.id}
            project={project}
            index={index}
            totalStages={totalStages}
            totalFlagships={flagshipProjects.length}
            smoothProgress={smoothProgress}
            onSelectProject={handleSelect}
          />
        ))}

        {/* project index overview */}
        <DockStage
          dockIndex={flagshipProjects.length}
          totalStages={totalStages}
          smoothProgress={smoothProgress}
        >
          <FilteredProjectDock
            projects={projectsData}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onSelectProject={handleSelect}
          />
        </DockStage>
      </div>

      {/* modal case study */}
      {activeProject && (
        <ProjectCaseStudyModal
          project={activeProject}
          isOpen={Boolean(activeProject)}
          onClose={() => setLocalActiveProject(null)}
        />
      )}
    </section>
  );
};
