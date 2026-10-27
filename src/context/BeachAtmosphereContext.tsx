import React, { createContext, useContext, useState, useEffect } from 'react';
import { beachAudio } from '../hooks/useBeachAudio';

export type BeachAtmosphere = 'day' | 'sunset' | 'night';

interface BeachAtmosphereContextType {
  atmosphere: BeachAtmosphere;
  setAtmosphere: (mode: BeachAtmosphere) => void;
  isSoundOn: boolean;
  toggleSound: () => void;
  triggerSoundSplash: (intensity?: number) => void;
  triggerCorkPop: () => void;
}

const BeachAtmosphereContext = createContext<BeachAtmosphereContextType | undefined>(undefined);

export const BeachAtmosphereProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Detect local time as initial suggestion: >=18:00 sunset, >=20:00 night, otherwise day
  const [atmosphere, setAtmosphere] = useState<BeachAtmosphere>(() => {
    try {
      const hour = new Date().getHours();
      if (hour >= 19 || hour < 5) return 'night';
      if (hour >= 17) return 'sunset';
      return 'day';
    } catch {
      return 'day';
    }
  });

  const [isSoundOn, setIsSoundOn] = useState<boolean>(false);

  const toggleSound = () => {
    setIsSoundOn((prev) => {
      const next = !prev;
      if (next) {
        beachAudio.startOceanSurf();
      } else {
        beachAudio.stopOceanSurf();
      }
      return next;
    });
  };

  const triggerSoundSplash = (intensity: number = 1) => {
    if (isSoundOn) {
      beachAudio.playWaterSplash(intensity);
    }
  };

  const triggerCorkPop = () => {
    if (isSoundOn) {
      beachAudio.playCorkPop();
    }
  };

  // Stop surf audio on page unmount
  useEffect(() => {
    return () => {
      beachAudio.stopOceanSurf();
    };
  }, []);

  return (
    <BeachAtmosphereContext.Provider
      value={{
        atmosphere,
        setAtmosphere,
        isSoundOn,
        toggleSound,
        triggerSoundSplash,
        triggerCorkPop
      }}
    >
      {children}
    </BeachAtmosphereContext.Provider>
  );
};

export const useBeachAtmosphere = (): BeachAtmosphereContextType => {
  const context = useContext(BeachAtmosphereContext);
  if (!context) {
    throw new Error('useBeachAtmosphere must be used within a BeachAtmosphereProvider');
  }
  return context;
};
