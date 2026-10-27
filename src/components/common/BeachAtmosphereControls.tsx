import React from 'react';
import { Sun, Sunset, Moon, Volume2, VolumeX } from 'lucide-react';
import { useBeachAtmosphere, type BeachAtmosphere } from '../../context/BeachAtmosphereContext';

interface BeachAtmosphereControlsProps {
  className?: string;
}

export const BeachAtmosphereControls: React.FC<BeachAtmosphereControlsProps> = ({
  className = ''
}) => {
  const { atmosphere, setAtmosphere, isSoundOn, toggleSound } = useBeachAtmosphere();

  const atmosphereOptions: { id: BeachAtmosphere; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'day', label: 'Siang', icon: Sun },
    { id: 'sunset', label: 'Sunset', icon: Sunset },
    { id: 'night', label: 'Malam', icon: Moon }
  ];

  return (
    <div
      className={`inline-flex items-center gap-1.5 p-1 rounded-2xl bg-[#fffdf5]/90 backdrop-blur-md border-2 border-[#0f172a] shadow-[3px_3px_0px_#0f172a] select-none ${className}`}
    >
      {/* Time Atmosphere Switcher */}
      <div className="flex items-center gap-1 bg-[#faeed1] p-0.5 rounded-xl border border-[#0f172a]/20">
        {atmosphereOptions.map((opt) => {
          const Icon = opt.icon;
          const isActive = atmosphere === opt.id;

          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => setAtmosphere(opt.id)}
              className={`relative flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#0f172a] text-white shadow-xs'
                  : 'text-[#475569] hover:text-[#0f172a] hover:bg-white/60'
              }`}
              title={`Ubah suasana pantai ke ${opt.label}`}
            >
              <Icon className={`w-3 h-3 ${isActive ? (opt.id === 'day' ? 'text-[#fde047]' : opt.id === 'sunset' ? 'text-[#fb923c]' : 'text-[#38bdf8]') : ''}`} />
              <span className="hidden sm:inline">{opt.label}</span>
            </button>
          );
        })}
      </div>

      <div className="w-[1px] h-5 bg-[#0f172a]/20 mx-0.5" />

      {/* Ocean Waves Surf Audio Synth Toggle */}
      <button
        type="button"
        onClick={toggleSound}
        className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-[10px] font-mono font-bold transition-all cursor-pointer border border-[#0f172a]/30 ${
          isSoundOn
            ? 'bg-[#0284c7] text-white shadow-xs'
            : 'bg-[#fff9d4] hover:bg-[#fde047] text-[#0f172a]'
        }`}
        title={isSoundOn ? 'Matikan suara ombak' : 'Nyalakan efek suara deburan ombak pantai'}
      >
        {isSoundOn ? (
          <>
            <Volume2 className="w-3 h-3 text-[#fde047]" />
            <span className="hidden sm:inline">Ombak ON</span>
          </>
        ) : (
          <>
            <VolumeX className="w-3 h-3 text-[#64748b]" />
            <span className="hidden sm:inline">Suara</span>
          </>
        )}
      </button>
    </div>
  );
};
