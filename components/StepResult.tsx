import React, { useState } from 'react';
import { CelebrityMatch } from '../types';
import { Star, Clock, AlertTriangle, Sparkles, Link as LinkIcon, ArrowLeft, Hourglass, ShieldAlert, Sword, Flame, Share2, Copy, Check, Twitter, Facebook, Ghost } from 'lucide-react';

interface StepResultProps {
  match: CelebrityMatch;
  userDate: string;
  onReset: () => void;
  onBack: () => void;
}

const StepResult: React.FC<StepResultProps> = ({ match, userDate, onReset, onBack }) => {
  const [copied, setCopied] = useState(false);

  const getShareText = () => {
    const platformTagline = "Cosmic Birthday Mate — Where your birth date meets destiny. Discover your celebrity soul connection.";
    return `I discovered my cosmic birthday twin is ${match.name}! ✨\n\n"${match.matchReason}"\n\n${platformTagline}\n\nFind yours here:`;
  };

  const handleCopy = () => {
    const text = `${getShareText()} ${window.location.href}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform: 'twitter' | 'facebook' | 'whatsapp' | 'linkedin') => {
    const text = encodeURIComponent(getShareText());
    const url = encodeURIComponent(window.location.href);
    
    let link = '';
    switch (platform) {
      case 'twitter':
        link = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
        break;
      case 'facebook':
        // Facebook primarily uses OG tags for content, but we can try passing the quote
        link = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`;
        break;
      case 'whatsapp':
        link = `https://wa.me/?text=${text}%20${url}`;
        break;
      case 'linkedin':
        link = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
    }
    
    window.open(link, '_blank');
  };

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
      
      {/* The Final Veil - Cosmic Lifespan */}
      {match.cosmicLifespan && (
        <div className="bg-black/40 p-6 rounded-xl border border-white/5 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Ghost className="w-32 h-32 text-white" />
          </div>
          <h3 className="text-xl font-serif text-gray-200 mb-4 flex items-center gap-2 relative z-10">
            <Ghost className="w-5 h-5 text-gray-400" /> The Final Veil
          </h3>
          
          <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
             <div className="bg-white/5 px-6 py-4 rounded-lg text-center border border-white/10 min-w-[150px]">
                <span className="block text-xs text-gray-500 uppercase tracking-widest mb-1">Cosmic Lifespan</span>
                <span className="text-3xl font-serif text-white">{match.cosmicLifespan}</span>
             </div>
             <div className="flex-1">
               <span className="text-xs text-purple-400 uppercase tracking-widest font-bold mb-1 block">A Spicy Mystery Note</span>
               <p className="text-gray-300 italic font-medium leading-relaxed">
                 "{match.mysteryNote}"
               </p>
             </div>
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

      {/* Share Section */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <Share2 className="w-32 h-32 text-white" />
        </div>
        <h3 className="text-lg font-serif text-white mb-2 flex items-center justify-center gap-2 relative z-10">
          <Share2 className="w-5 h-5 text-purple-400" /> Share Your Cosmic Match
        </h3>
        <p className="text-sm text-gray-400 mb-6 max-w-lg mx-auto relative z-10">
          Spread the wisdom. Share your celebrity match and the lesson you've learned.
        </p>
        
        <div className="flex flex-wrap justify-center gap-3 relative z-10">
            <button 
              onClick={() => handleShare('twitter')}
              className="bg-[#1DA1F2]/20 hover:bg-[#1DA1F2]/30 text-[#1DA1F2] border border-[#1DA1F2]/30 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm font-medium"
            >
              <Twitter className="w-4 h-4" /> Twitter
            </button>
            <button 
              onClick={() => handleShare('facebook')}
              className="bg-[#1877F2]/20 hover:bg-[#1877F2]/30 text-[#1877F2] border border-[#1877F2]/30 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm font-medium"
            >
              <Facebook className="w-4 h-4" /> Facebook
            </button>
            <button 
              onClick={() => handleShare('whatsapp')}
              className="bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] border border-[#25D366]/30 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm font-medium"
            >
              <Share2 className="w-4 h-4" /> WhatsApp
            </button>
            <button 
              onClick={handleCopy}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all text-sm font-medium border ${
                copied 
                  ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                  : 'bg-white/10 hover:bg-white/20 text-gray-300 border-white/10'
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
        </div>
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