import React, { useState } from 'react';
import { Calendar, ChevronRight } from 'lucide-react';

interface StepDateProps {
  onNext: (date: string, name: string) => void;
}

const StepDate: React.FC<StepDateProps> = ({ onNext }) => {
  const [date, setDate] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (date && name) {
      onNext(date, name);
    }
  };

  return (
    <div className="glass-panel p-8 rounded-2xl shadow-2xl animate-float">
      <div className="text-center mb-8">
        <div className="mx-auto w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mb-4 border border-purple-400/30">
          <Calendar className="w-8 h-8 text-purple-300" />
        </div>
        <h2 className="text-3xl font-serif text-white mb-2">When did your journey begin?</h2>
        <p className="text-gray-400 font-light">Enter your birth details to align the stars.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm text-purple-200 mb-2 uppercase tracking-widest font-semibold">Your Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-black/30 border border-purple-500/30 rounded-lg p-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-colors"
            placeholder="e.g. Alex Stardust"
          />
        </div>

        <div>
          <label className="block text-sm text-purple-200 mb-2 uppercase tracking-widest font-semibold">Birth Date</label>
          <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-black/30 border border-purple-500/30 rounded-lg p-4 text-white focus:outline-none focus:border-purple-400 transition-colors [color-scheme:dark]"
          />
        </div>

        <button
          type="submit"
          disabled={!date || !name}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-4 rounded-lg transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Reveal the Cosmos</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default StepDate;