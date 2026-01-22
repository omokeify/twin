import React, { useState } from 'react';
import { CelebrityMatch, NameAnalysis } from '../types';
import { Skull, HeartPulse, ChevronRight, Sparkles, BookOpen, Loader2 } from 'lucide-react';

interface StepSelectionProps {
  matches: CelebrityMatch[];
  analysis: NameAnalysis;
  userName: string;
  onSelect: (match: CelebrityMatch) => void;
  onBack: () => void;
}

const StepSelection: React.FC<StepSelectionProps> = ({ matches, analysis, userName, onSelect, onBack }) => {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleSelect = (match: CelebrityMatch) => {
    if (loadingId) return; // Prevent multiple clicks
    setLoadingId(match.id);
    
    // Artificial delay to provide visual feedback and build suspense
    setTimeout(() => {
      onSelect(match);
    }, 1500);
  };

  return (
    <div className="w-full max-w-4xl animate-fade-in">
      
      {/* Name Analysis Hero Section */}
      <div className="glass-panel p-8 rounded-2xl mb-8 border-purple-500/30 relative overflow-hidden text-center">
        <div className="absolute top-0 right-0 p-6 opacity-5">
           <BookOpen className="w-32 h-32 text-white" />
        </div>
        
        <h2 className="text-lg uppercase tracking-widest text-purple-300 mb-2 font-semibold">The Power of Your Name</h2>
        <h1 className="text-4xl md:text-5xl font-serif text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
          {userName}
        </h1>
        
        <div className="inline-block bg-white/5 border border-white/10 rounded-lg px-4 py-1 mb-6 text-sm text-indigo-200">
          Origin: <span className="text-white font-medium">{analysis.origin}</span>
        </div>

        <div className="max-w-2xl mx-auto space-y-4 relative z-10">
          <p className="text-xl md:text-2xl font-serif text-yellow-100 italic">
            "{analysis.meaning}"
          </p>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed border-t border-white/10 pt-4 mt-4">
            <Sparkles className="w-4 h-4 inline mr-2 text-purple-400" />
            {analysis.soulVibration}
          </p>
        </div>
      </div>

      <div className="text-center mb-6">
        <h3 className="text-lg text-gray-400 font-light">Kindred Spirits who share your Name & Energy:</h3>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {matches.map((match) => (
          <button
            key={match.id}
            onClick={() => handleSelect(match)}
            disabled={loadingId !== null}
            className={`flex flex-col h-full bg-glass-panel border border-white/10 rounded-xl p-6 transition-all group text-left relative overflow-hidden ${
              loadingId === match.id 
                ? 'bg-purple-900/20 border-purple-500/50 scale-[1.02]' 
                : loadingId !== null 
                  ? 'opacity-50 grayscale cursor-not-allowed' 
                  : 'hover:bg-white/5 hover:border-purple-500/50 hover:transform hover:scale-[1.02]'
            }`}
          >
            {loadingId === match.id && (
              <div className="absolute inset-0 z-20 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center animate-fade-in">
                <Loader2 className="w-10 h-10 text-purple-400 animate-spin mb-3" />
                <span className="text-xs font-serif text-purple-200 tracking-widest uppercase animate-pulse">Aligning Fate...</span>
              </div>
            )}

            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="flex justify-between items-start mb-4">
              <div className={`px-2 py-1 rounded text-[10px] uppercase tracking-wider font-bold ${
                match.status === 'deceased' ? 'bg-purple-900/50 text-purple-300' : 'bg-blue-900/50 text-blue-300'
              }`}>
                {match.status === 'deceased' ? (
                  <span className="flex items-center gap-1"><Skull className="w-3 h-3" /> Legacy</span>
                ) : (
                  <span className="flex items-center gap-1"><HeartPulse className="w-3 h-3" /> Living</span>
                )}
              </div>
            </div>
            
            <h3 className="text-xl font-serif text-white mb-1 group-hover:text-purple-300 transition-colors">
              {match.name}
            </h3>
            <p className="text-xs text-gray-500 mb-4 uppercase tracking-wide">{match.occupation}</p>
            
            <p className="text-sm text-gray-300 line-clamp-4 flex-grow mb-4">
              {match.matchReason}
            </p>

            <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-400 group-hover:text-white">
              <span>View Cosmic Prophecy</span>
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" />
            </div>
          </button>
        ))}
      </div>

      <div className="text-center">
        <button 
          onClick={onBack}
          disabled={loadingId !== null}
          className={`text-gray-500 hover:text-white transition-colors text-sm underline underline-offset-4 ${loadingId ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Consult the stars again
        </button>
      </div>
    </div>
  );
};

export default StepSelection;