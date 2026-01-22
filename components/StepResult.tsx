import React from 'react';
import { CelebrityMatch } from '../types';
import { RefreshCw, Star, Clock, AlertTriangle, Sparkles, Link as LinkIcon } from 'lucide-react';

interface StepResultProps {
  match: CelebrityMatch;
  userDate: string;
  onReset: () => void;
}

const StepResult: React.FC<StepResultProps> = ({ match, userDate, onReset }) => {
  // Fix: Parse manually to ensure we display the exact date the user entered, ignoring timezone
  const [yearStr, monthStr, dayStr] = userDate.split('-');
  const dateObj = new Date(parseInt(yearStr), parseInt(monthStr) - 1, parseInt(dayStr));
  const birthDayDisplay = dateObj.toLocaleDateString('default', { month: 'long', day: 'numeric' });

  return (
    <div className="glass-panel p-8 rounded-2xl shadow-2xl max-h-[85vh] overflow-y-auto custom-scrollbar w-full max-w-4xl">
      <div className="text-center mb-8">
        <span className="inline-block px-3 py-1 bg-purple-500/20 rounded-full text-purple-300 text-xs tracking-widest uppercase mb-4 border border-purple-500/30">
          Cosmic Connection Found
        </span>
        <h1 className="text-4xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-indigo-200 mb-2 drop-shadow-sm">
          {match.name}
        </h1>
        <p className="text-indigo-300 italic text-lg">{match.occupation}</p>
        <p className="text-sm text-gray-400 mt-1">Born: {match.birthDate}</p>
      </div>

      {/* Hero Section: The Connection */}
      <div className="bg-purple-900/20 p-6 md:p-8 rounded-xl border border-purple-500/20 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Star className="w-24 h-24 text-white" />
        </div>
        <h3 className="text-xl font-serif text-purple-200 mb-4 flex items-center gap-2 relative z-10">
          <Star className="w-5 h-5 text-purple-400" /> The Cosmic Link
        </h3>
        
        {/* Poetic Summary */}
        <p className="text-gray-200 text-lg italic mb-6 relative z-10 border-l-2 border-purple-400 pl-4 bg-purple-500/5 py-2">
          "{match.matchReason}"
        </p>

        {/* Specific Parallels Grid */}
        <div className="grid md:grid-cols-3 gap-4 relative z-10">
          {match.alignmentTraits && match.alignmentTraits.map((item, idx) => (
            <div key={idx} className="bg-black/40 p-4 rounded-lg border border-purple-500/10 hover:border-purple-500/30 transition-colors">
              <div className="flex items-center gap-2 mb-2 text-purple-300 font-semibold uppercase text-xs tracking-wider">
                <LinkIcon className="w-3 h-3" />
                {item.trait}
              </div>
              <p className="text-gray-300 text-sm leading-snug">
                {item.connection}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Left Column: Bio & Destiny */}
        <div className="space-y-6 flex flex-col">
          <div className="bg-black/20 p-6 rounded-xl border border-white/5 flex-grow">
            <h3 className="text-lg font-serif text-indigo-300 mb-3 flex items-center gap-2">
              <RefreshCw className="w-4 h-4" /> Who They Are
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm">
              {match.bio}
            </p>
          </div>

          <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 p-6 rounded-xl border border-purple-500/20 relative overflow-hidden group">
            <div className="absolute inset-0 bg-purple-500/5 group-hover:bg-purple-500/10 transition-colors"></div>
            <div className="relative z-10 text-center">
              <h3 className="text-xl font-serif text-white mb-2 flex items-center justify-center gap-2">
                <Clock className="w-5 h-5 text-pink-400" /> 
                Destiny Timeline
              </h3>
              <p className="text-gray-300 mb-4 text-sm max-w-md mx-auto">
                {match.destinyPrediction}
              </p>
              <div className="inline-flex items-center gap-3 bg-black/40 px-6 py-3 rounded-full border border-purple-500/30">
                <span className="text-gray-400 text-xs uppercase tracking-wider">Projected Transformation</span>
                <span className="text-2xl font-bold text-pink-400 font-serif">{match.predictedLegacyYear}</span>
              </div>
              <p className="text-[10px] text-gray-500 mt-4 flex items-center justify-center gap-1 opacity-70">
                 <AlertTriangle className="w-3 h-3" />
                 For Entertainment Purposes Only
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Interesting Facts */}
        {match.funFacts && match.funFacts.length > 0 && (
          <div className="bg-black/20 p-6 rounded-xl border border-white/5 h-full flex flex-col">
            <h3 className="text-lg font-serif text-yellow-200 mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Stellar Secrets
            </h3>
            <div className="overflow-y-auto max-h-[500px] custom-scrollbar pr-2">
              <ul className="space-y-4">
                {match.funFacts.map((fact, index) => (
                  <li key={index} className="flex gap-3 text-sm text-gray-300 leading-relaxed border-b border-white/5 pb-3 last:border-0 last:pb-0">
                    <span className="text-purple-400 mt-0.5 min-w-[12px]">•</span>
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={onReset}
        className="w-full bg-white/5 hover:bg-white/10 text-white font-medium py-4 rounded-lg transition-colors border border-white/10 tracking-wide uppercase text-sm"
      >
        Seek Another Connection
      </button>
    </div>
  );
};

export default StepResult;