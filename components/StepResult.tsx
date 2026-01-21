import React from 'react';
import { CelebrityMatch } from '../types';
import { RefreshCw, Star, Clock, AlertTriangle, Sparkles } from 'lucide-react';

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
    <div className="glass-panel p-8 rounded-2xl shadow-2xl max-h-[85vh] overflow-y-auto custom-scrollbar w-full max-w-3xl">
      <div className="text-center mb-8">
        <span className="inline-block px-3 py-1 bg-purple-500/20 rounded-full text-purple-300 text-xs tracking-widest uppercase mb-4 border border-purple-500/30">
          Cosmic Connection Found
        </span>
        <h1 className="text-4xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200 mb-2">
          {match.name}
        </h1>
        <p className="text-indigo-300 italic">{match.occupation}</p>
        <p className="text-sm text-gray-400 mt-1">Born: {match.birthDate}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-black/20 p-6 rounded-xl border border-white/5">
          <h3 className="text-lg font-serif text-purple-300 mb-3 flex items-center gap-2">
            <Star className="w-4 h-4" /> The Connection
          </h3>
          <p className="text-gray-300 leading-relaxed text-sm">
            {match.matchReason}
          </p>
        </div>

        <div className="bg-black/20 p-6 rounded-xl border border-white/5">
          <h3 className="text-lg font-serif text-purple-300 mb-3 flex items-center gap-2">
            <RefreshCw className="w-4 h-4" /> Who They Are
          </h3>
          <p className="text-gray-300 leading-relaxed text-sm">
            {match.bio}
          </p>
        </div>
      </div>

      {/* New Section: Interesting Facts */}
      {match.funFacts && match.funFacts.length > 0 && (
        <div className="bg-black/20 p-6 rounded-xl border border-white/5 mb-8">
          <h3 className="text-lg font-serif text-yellow-200 mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> Stellar Secrets
          </h3>
          <ul className="space-y-3">
            {match.funFacts.map((fact, index) => (
              <li key={index} className="flex gap-3 text-sm text-gray-300 leading-relaxed">
                <span className="text-purple-400 mt-1">•</span>
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 p-6 rounded-xl border border-purple-500/20 mb-8 relative overflow-hidden group">
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
            <span className="text-gray-400 text-xs uppercase tracking-wider">Projected Transformation Year</span>
            <span className="text-2xl font-bold text-pink-400 font-serif">{match.predictedLegacyYear}</span>
          </div>
          <p className="text-[10px] text-gray-500 mt-4 flex items-center justify-center gap-1">
             <AlertTriangle className="w-3 h-3" />
             AI Generated Prediction for Entertainment Purposes Only. Not actual life expectancy.
          </p>
        </div>
      </div>

      <button
        onClick={onReset}
        className="w-full bg-white/5 hover:bg-white/10 text-white font-medium py-3 rounded-lg transition-colors border border-white/10"
      >
        Seek Another Connection
      </button>
    </div>
  );
};

export default StepResult;