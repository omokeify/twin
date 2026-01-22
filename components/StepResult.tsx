import React from 'react';
import { CelebrityMatch } from '../types';
import { Star, Clock, AlertTriangle, Sparkles, Link as LinkIcon, ArrowLeft, Hourglass, ShieldAlert, Sword, Flame } from 'lucide-react';

interface StepResultProps {
  match: CelebrityMatch;
  userDate: string;
  onReset: () => void;
  onBack: () => void;
}

const StepResult: React.FC<StepResultProps> = ({ match, userDate, onReset, onBack }) => {
  return (
    <div className="glass-panel p-8 rounded-2xl shadow-2xl max-h-[85vh] overflow-y-auto custom-scrollbar w-full max-w-4xl relative animate-fade-in">
      <button 
        onClick={onBack}
        className="absolute top-8 left-8 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
        aria-label="Back to selection"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      <div className="text-center mb-8 pt-4">
        <span className={`inline-block px-3 py-1 rounded-full text-xs tracking-widest uppercase mb-4 border ${
          match.status === 'deceased' 
            ? 'bg-purple-900/30 text-purple-300 border-purple-500/30' 
            : 'bg-blue-900/30 text-blue-300 border-blue-500/30'
        }`}>
          {match.status === 'deceased' ? 'Eternal Legacy' : 'Living Legend'}
        </span>
        <h1 className="text-4xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-indigo-200 mb-2 drop-shadow-sm">
          {match.name}
        </h1>
        <p className="text-indigo-300 italic text-lg">{match.occupation}</p>
        <p className="text-sm text-gray-400 mt-1">Born: {match.birthDate}</p>
        
        {match.eraContext && (
          <div className="flex items-center justify-center gap-2 mt-2 text-xs text-yellow-200/80 uppercase tracking-widest">
            <Hourglass className="w-3 h-3" />
            <span>{match.eraContext}</span>
          </div>
        )}
      </div>

      {/* Hero Section: The Connection */}
      <div className="bg-purple-900/20 p-6 md:p-8 rounded-xl border border-purple-500/20 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Star className="w-24 h-24 text-white" />
        </div>
        <h3 className="text-xl font-serif text-purple-200 mb-4 flex items-center gap-2 relative z-10">
          <Star className="w-5 h-5 text-purple-400" /> The Cosmic Link
        </h3>
        
        <p className="text-gray-200 text-lg italic mb-6 relative z-10 border-l-2 border-purple-400 pl-4 bg-purple-500/5 py-2">
          "{match.matchReason}"
        </p>

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

      {/* Spiritual Nemesis - New Fun Section */}
      {match.spiritualNemesis && (
        <div className="bg-gradient-to-r from-gray-900 to-black p-6 rounded-xl border border-gray-700 mb-8 relative overflow-hidden shadow-inner">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>
           <div className="absolute -bottom-10 -right-10 opacity-5 rotate-12">
             <Sword className="w-40 h-40 text-red-500" />
           </div>

           <h3 className="text-xl font-serif text-gray-200 mb-4 flex items-center gap-2 relative z-10">
            <Sword className="w-5 h-5 text-red-400" /> The Eternal Battle
          </h3>
          
          <div className="flex flex-col md:flex-row gap-6 relative z-10">
            <div className="md:w-1/3 flex flex-col items-center justify-center bg-white/5 rounded-lg p-4 border border-white/5">
              <Flame className="w-8 h-8 text-orange-500 mb-2 animate-pulse" />
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Your Name's Nemesis</p>
              <h4 className="text-lg font-bold text-red-300 text-center font-serif leading-tight">
                {match.spiritualNemesis}
              </h4>
            </div>
            <div className="md:w-2/3 flex items-center">
              <p className="text-gray-300 italic border-l-2 border-red-500/30 pl-4">
                "{match.nemesisManifestation}"
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Shadow Wisdom Section - Educational Mistakes */}
      {match.lifeLessons && match.lifeLessons.length > 0 && (
        <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 p-6 rounded-xl border border-red-500/20 mb-8">
          <h3 className="text-xl font-serif text-red-200 mb-4 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-400" /> Cautionary Chronicles
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            Even the brightest stars cast shadows. Learn from their journey.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {match.lifeLessons.map((lesson, idx) => (
              <div key={idx} className="bg-black/40 p-4 rounded-lg border border-red-500/10">
                <div className="mb-2">
                  <span className="text-xs uppercase tracking-widest text-red-400 font-bold block mb-1">The Misstep</span>
                  <p className="text-gray-200 text-sm">{lesson.mistake}</p>
                </div>
                <div className="border-t border-red-500/10 pt-2 mt-2">
                  <span className="text-xs uppercase tracking-widest text-green-400 font-bold block mb-1">The Lesson</span>
                  <p className="text-gray-300 text-sm italic">"{lesson.lesson}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Left Column: Destiny */}
        <div className="space-y-6 flex flex-col">
          <div className={`p-6 rounded-xl border relative overflow-hidden group h-full flex flex-col justify-center ${
             match.status === 'deceased' 
             ? 'bg-gradient-to-br from-purple-900/40 to-black border-purple-500/20' 
             : 'bg-gradient-to-br from-blue-900/40 to-black border-blue-500/20'
          }`}>
            <div className="relative z-10 text-center">
              <h3 className="text-xl font-serif text-white mb-4 flex items-center justify-center gap-2">
                <Clock className="w-5 h-5 text-pink-400" /> 
                {match.status === 'deceased' ? 'The Cycle of Ascendance' : 'The Path Forward'}
              </h3>
              <p className="text-gray-300 mb-6 text-sm max-w-md mx-auto italic leading-relaxed">
                {match.destinyPrediction}
              </p>
              <div className="inline-flex flex-col items-center gap-1 bg-black/40 px-6 py-4 rounded-xl border border-white/10 w-full mb-4">
                <span className="text-gray-400 text-[10px] uppercase tracking-widest">{match.legacyLabel || "Cosmic Year"}</span>
                <span className="text-3xl font-bold text-pink-400 font-serif">
                  {match.predictedLegacyYear}
                </span>
                <span className="text-[10px] text-gray-500">
                  {match.status === 'deceased' ? 'Age of Transformation' : 'Projected Peak'}
                </span>
              </div>
              <p className="text-[10px] text-gray-500 mt-2 flex items-center justify-center gap-1 opacity-70">
                 <AlertTriangle className="w-3 h-3" />
                 Philosophical Interpretation Only
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Interesting Facts (Stellar Secrets) */}
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
        Start New Journey
      </button>
    </div>
  );
};

export default StepResult;