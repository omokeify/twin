import React, { useState } from 'react';
import { Sparkles, Brain, Heart, Zap, Coffee, Music, BookOpen, Smile, Compass, Shield, Eye, Moon, Users, Rocket } from 'lucide-react';
import { PersonalityTrait } from '../types';

interface StepPersonalityProps {
  onNext: (traits: string[]) => void;
  onBack: () => void;
}

const TRAITS: PersonalityTrait[] = [
  { id: 'creative', label: 'Creative', icon: 'Sparkles' },
  { id: 'analytical', label: 'Analytical', icon: 'Brain' },
  { id: 'passionate', label: 'Passionate', icon: 'Heart' },
  { id: 'energetic', label: 'Energetic', icon: 'Zap' },
  { id: 'calm', label: 'Calm', icon: 'Coffee' },
  { id: 'artistic', label: 'Artistic', icon: 'Music' },
  { id: 'intellectual', label: 'Intellectual', icon: 'BookOpen' },
  { id: 'optimistic', label: 'Optimistic', icon: 'Smile' },
  { id: 'adventurous', label: 'Adventurous', icon: 'Compass' },
  { id: 'resilient', label: 'Resilient', icon: 'Shield' },
  { id: 'visionary', label: 'Visionary', icon: 'Eye' },
  { id: 'mysterious', label: 'Mysterious', icon: 'Moon' },
  { id: 'charismatic', label: 'Charismatic', icon: 'Users' },
  { id: 'ambitious', label: 'Ambitious', icon: 'Rocket' },
];

const StepPersonality: React.FC<StepPersonalityProps> = ({ onNext, onBack }) => {
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);

  const toggleTrait = (id: string) => {
    if (selectedTraits.includes(id)) {
      setSelectedTraits(prev => prev.filter(t => t !== id));
    } else {
      if (selectedTraits.length < 3) {
        setSelectedTraits(prev => [...prev, id]);
      }
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'Brain': return <Brain className="w-5 h-5" />;
      case 'Heart': return <Heart className="w-5 h-5" />;
      case 'Zap': return <Zap className="w-5 h-5" />;
      case 'Coffee': return <Coffee className="w-5 h-5" />;
      case 'Music': return <Music className="w-5 h-5" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5" />;
      case 'Smile': return <Smile className="w-5 h-5" />;
      case 'Compass': return <Compass className="w-5 h-5" />;
      case 'Shield': return <Shield className="w-5 h-5" />;
      case 'Eye': return <Eye className="w-5 h-5" />;
      case 'Moon': return <Moon className="w-5 h-5" />;
      case 'Users': return <Users className="w-5 h-5" />;
      case 'Rocket': return <Rocket className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <div className="glass-panel p-8 rounded-2xl shadow-2xl animate-fade-in max-w-4xl w-full">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-serif text-white mb-2">Define Your Aura</h2>
        <p className="text-gray-400 font-light">Select up to 3 traits that describe you best.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {TRAITS.map((trait) => (
          <button
            key={trait.id}
            onClick={() => toggleTrait(trait.id)}
            className={`p-4 rounded-xl border flex items-center gap-3 transition-all ${
              selectedTraits.includes(trait.id)
                ? 'bg-purple-600/50 border-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.5)] transform scale-105'
                : 'bg-black/20 border-white/10 text-gray-400 hover:bg-white/5 hover:border-white/20'
            }`}
          >
            {getIcon(trait.icon)}
            <span className="font-medium text-sm">{trait.label}</span>
          </button>
        ))}
      </div>

      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="px-6 py-4 rounded-lg border border-white/20 hover:bg-white/5 text-gray-300 transition-colors"
        >
          Back
        </button>
        <button
          onClick={() => onNext(selectedTraits)}
          disabled={selectedTraits.length === 0}
          className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          Find My Match
        </button>
      </div>
    </div>
  );
};

export default StepPersonality;