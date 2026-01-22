import React, { useState } from 'react';
import { Skull, HeartPulse, Infinity, User, UserCheck, Globe, MapPin } from 'lucide-react';

interface StepPreferenceProps {
  onSelect: (
    preference: 'living' | 'deceased' | 'all', 
    gender: 'male' | 'female' | 'any',
    region: 'africa' | 'asia' | 'europe' | 'north_america' | 'south_america' | 'oceania' | 'global'
  ) => void;
}

const StepPreference: React.FC<StepPreferenceProps> = ({ onSelect }) => {
  const [gender, setGender] = useState<'male' | 'female' | 'any'>('any');
  const [region, setRegion] = useState<'africa' | 'asia' | 'europe' | 'north_america' | 'south_america' | 'oceania' | 'global'>('global');

  const regions = [
    { id: 'global', label: 'Global (Any)', icon: <Globe className="w-4 h-4" /> },
    { id: 'africa', label: 'Africa', icon: <MapPin className="w-4 h-4" /> },
    { id: 'asia', label: 'Asia', icon: <MapPin className="w-4 h-4" /> },
    { id: 'europe', label: 'Europe', icon: <MapPin className="w-4 h-4" /> },
    { id: 'north_america', label: 'N. America', icon: <MapPin className="w-4 h-4" /> },
    { id: 'south_america', label: 'S. America', icon: <MapPin className="w-4 h-4" /> },
    { id: 'oceania', label: 'Oceania', icon: <MapPin className="w-4 h-4" /> },
  ] as const;

  return (
    <div className="glass-panel p-8 rounded-2xl shadow-2xl animate-fade-in max-w-2xl w-full text-center">
      <h2 className="text-3xl font-serif text-white mb-2">Refine Your Connection</h2>
      <p className="text-gray-400 font-light mb-6">
        Tailor the cosmic search to your spirit's desire.
      </p>

      {/* Gender Selection */}
      <div className="mb-6">
        <label className="block text-xs text-purple-200 mb-3 uppercase tracking-widest font-semibold">
          Gender
        </label>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => setGender('male')}
            className={`px-4 py-2 rounded-lg border transition-all flex items-center gap-2 text-sm ${
              gender === 'male'
                ? 'bg-purple-600 border-purple-400 text-white shadow-lg'
                : 'bg-black/30 border-white/10 text-gray-400 hover:bg-white/5'
            }`}
          >
            <User className="w-4 h-4" /> Male
          </button>
          <button
            onClick={() => setGender('female')}
            className={`px-4 py-2 rounded-lg border transition-all flex items-center gap-2 text-sm ${
              gender === 'female'
                ? 'bg-purple-600 border-purple-400 text-white shadow-lg'
                : 'bg-black/30 border-white/10 text-gray-400 hover:bg-white/5'
            }`}
          >
            <User className="w-4 h-4" /> Female
          </button>
          <button
            onClick={() => setGender('any')}
            className={`px-4 py-2 rounded-lg border transition-all flex items-center gap-2 text-sm ${
              gender === 'any'
                ? 'bg-purple-600 border-purple-400 text-white shadow-lg'
                : 'bg-black/30 border-white/10 text-gray-400 hover:bg-white/5'
            }`}
          >
            <UserCheck className="w-4 h-4" /> Any
          </button>
        </div>
      </div>

      <div className="h-px bg-white/10 w-1/2 mx-auto mb-6"></div>

      {/* Region Selection */}
      <div className="mb-8">
        <label className="block text-xs text-purple-200 mb-3 uppercase tracking-widest font-semibold">
          Origin Region
        </label>
        <div className="flex flex-wrap justify-center gap-2">
          {regions.map((r) => (
            <button
              key={r.id}
              onClick={() => setRegion(r.id)}
              className={`px-3 py-2 rounded-lg border transition-all flex items-center gap-2 text-xs ${
                region === r.id
                  ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg'
                  : 'bg-black/30 border-white/10 text-gray-400 hover:bg-white/5'
              }`}
            >
              {r.icon}
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-white/10 w-1/2 mx-auto mb-6"></div>

      {/* Status Selection */}
      <p className="text-gray-400 font-light mb-4 text-sm">
        Select the timeline to begin your search:
      </p>

      <div className="grid gap-3">
        <button
          onClick={() => onSelect('deceased', gender, region)}
          className="group relative overflow-hidden bg-black/20 hover:bg-purple-900/30 border border-white/10 hover:border-purple-500/50 p-4 rounded-xl transition-all duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/0 via-purple-900/0 to-purple-900/0 group-hover:via-purple-500/10 transition-all" />
          <div className="relative flex items-center gap-4 justify-center">
            <div className="p-2 bg-purple-500/20 rounded-full text-purple-300">
              <Skull className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h3 className="text-base font-serif text-white group-hover:text-purple-200">The Ascended (Deceased)</h3>
            </div>
          </div>
        </button>

        <button
          onClick={() => onSelect('living', gender, region)}
          className="group relative overflow-hidden bg-black/20 hover:bg-blue-900/30 border border-white/10 hover:border-blue-500/50 p-4 rounded-xl transition-all duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/0 via-blue-900/0 to-blue-900/0 group-hover:via-blue-500/10 transition-all" />
          <div className="relative flex items-center gap-4 justify-center">
            <div className="p-2 bg-blue-500/20 rounded-full text-blue-300">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h3 className="text-base font-serif text-white group-hover:text-blue-200">The Living (Alive)</h3>
            </div>
          </div>
        </button>

        <button
          onClick={() => onSelect('all', gender, region)}
          className="group relative overflow-hidden bg-black/20 hover:bg-pink-900/30 border border-white/10 hover:border-pink-500/50 p-4 rounded-xl transition-all duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-pink-900/0 via-pink-900/0 to-pink-900/0 group-hover:via-pink-500/10 transition-all" />
          <div className="relative flex items-center gap-4 justify-center">
            <div className="p-2 bg-pink-500/20 rounded-full text-pink-300">
              <Infinity className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h3 className="text-base font-serif text-white group-hover:text-pink-200">All Timelines (Any)</h3>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default StepPreference;