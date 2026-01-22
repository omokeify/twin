import React, { useState } from 'react';
import { CelebrityMatch, NameAnalysis } from '../types';
import { Skull, HeartPulse, ChevronRight, Sparkles, BookOpen, Loader2, ExternalLink, Calendar, User, Crown, MapPin } from 'lucide-react';

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

  const getMatchTypeIcon = (type: string) => {
    switch (type) {
      case 'Perfect Match': return <Crown className="w-3 h-3 text-yellow-400" />;
      case 'Birthday Twin': return <Calendar className="w-3 h-3 text-pink-400" />;
      case 'Name Twin': return <User className="w-3 h-3 text-blue-400" />;
      default: return <Sparkles className="w-3 h-3 text-purple-400" />;
    }
  };

  const getMatchTypeColor = (type: string) => {
    switch (type) {
      case 'Perfect Match': return 'bg-yellow-900/40 text-yellow-200 border-yellow-500/40';
      case 'Birthday Twin': return 'bg-pink-900/40 text-pink-200 border-pink-500/40';
      case 'Name Twin': return 'bg-blue-900/40 text-blue-200 border-blue-500/40';
      default: return 'bg-purple-900/40 text-purple-200 border-purple-500/40';
    }
  };

  return (
    <div className="w-full max-w-6xl animate-fade-in pb-10">
      
      {/* Name Analysis Hero Section */}
      <div className="glass-panel p-8 rounded-2xl mb-8 border-purple-500/30 relative overflow-hidden text-center max-w-4xl mx-auto">
        <div className="absolute top-0 right-0 p-6 opacity-5">
           <BookOpen className="w-32 h-32 text-white" />
        </div>
        
        <h2 className="text-lg uppercase tracking-widest text-purple-300 mb-2 font-semibold">The Power of Your Name</h2>
        <h1 className="text-4xl md:text-5xl font-serif text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
          {userName}
        </h1>
        
        <div className="flex justify-center mb-8">
          <div className="bg-purple-500/10 border border-purple-500/30 px-6 py-3 rounded-full flex items-center gap-3 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <MapPin className="w-5 h-5 text-purple-400" />
            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2 text-left md:text-center">
               <span className="text-xs text-purple-300 uppercase tracking-widest font-semibold">Origin</span>
               <span className="hidden md:inline text-purple-500">•</span>
               <span className="text-white font-bold text-lg leading-none">{analysis.origin}</span>
            </div>
          </div>
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
        <h3 className="text-lg text-gray-400 font-light">Your Cosmic Constellation ({matches.length} Matches Found):</h3>
      </div>

      {/* Grid extended for potential 6 matches */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {matches.map((match) => (
          <div
            key={match.id}
            className={`flex flex-col h-full bg-glass-panel border border-white/10 rounded-xl transition-all group text-left relative overflow-hidden ${
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
            
            {/* Learn More External Link - Positioned Top Right */}
            <a
              href={`https://www.google.com/search?q=${encodeURIComponent(match.name + ' celebrity')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/20 text-gray-400 hover:text-white rounded-full transition-colors z-20"
              title="Learn more on Google"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {/* Main Clickable Content */}
            <button
              onClick={() => handleSelect(match)}
              disabled={loadingId !== null}
              className="flex-1 p-6 flex flex-col w-full text-left"
            >
              <div className="flex flex-wrap items-start gap-2 mb-4 w-full pr-10">
                 {/* Match Type Badge */}
                 <div className={`px-2 py-1 rounded text-[10px] uppercase tracking-wider font-bold border flex items-center gap-1.5 ${getMatchTypeColor(match.matchType)}`}>
                    {getMatchTypeIcon(match.matchType)}
                    {match.matchType}
                 </div>

                 {/* Living Status Badge */}
                <div className={`px-2 py-1 rounded text-[10px] uppercase tracking-wider font-bold ${
                  match.status === 'deceased' ? 'bg-purple-900/30 text-purple-300' : 'bg-blue-900/30 text-blue-300'
                }`}>
                  {match.status === 'deceased' ? (
                    <span className="flex items-center gap-1"><Skull className="w-3 h-3" /> Legacy</span>
                  ) : (
                    <span className="flex items-center gap-1"><HeartPulse className="w-3 h-3" /> Living</span>
                  )}
                </div>
              </div>
              
              <h3 className="text-xl font-serif text-white mb-1 group-hover:text-purple-300 transition-colors pr-6">
                {match.name}
              </h3>
              <p className="text-xs text-gray-400 mb-1">{match.birthDate}</p>
              <p className="text-xs text-gray-500 mb-4 uppercase tracking-wide">{match.occupation}</p>
              
              <p className="text-sm text-gray-300 line-clamp-3 flex-grow mb-4">
                {match.matchReason}
              </p>

              <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-400 group-hover:text-white w-full">
                <span>View Cosmic Prophecy</span>
                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" />
              </div>
            </button>
          </div>
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