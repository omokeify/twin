import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import StepDate from './components/StepDate';
import StepPersonality from './components/StepPersonality';
import StepResult from './components/StepResult';
import { AppStep, CelebrityMatch, UserData } from './types';
import { findCelebrityMatch } from './services/geminiService';
import { Loader2, AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.WELCOME);
  const [userData, setUserData] = useState<UserData>({
    birthDate: '',
    name: '',
    personalityTraits: []
  });
  const [match, setMatch] = useState<CelebrityMatch | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Initial animation delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setStep(AppStep.DATE_INPUT);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleDateSubmit = (date: string, name: string) => {
    setUserData(prev => ({ ...prev, birthDate: date, name }));
    setStep(AppStep.PERSONALITY);
  };

  const handlePersonalitySubmit = async (traits: string[]) => {
    setUserData(prev => ({ ...prev, personalityTraits: traits }));
    setStep(AppStep.LOADING);
    
    try {
      const result = await findCelebrityMatch(userData.birthDate, traits);
      setMatch(result);
      setStep(AppStep.RESULT);
    } catch (err: any) {
      console.error(err);
      if (err.message && err.message.includes("API Key")) {
        setError("Missing API Configuration. Please check your Vercel project settings.");
      } else {
        setError("The stars are clouded right now. Please try again.");
      }
      setStep(AppStep.ERROR);
    }
  };

  const handleReset = () => {
    setUserData({ birthDate: '', name: '', personalityTraits: [] });
    setMatch(null);
    setError(null);
    setStep(AppStep.DATE_INPUT);
  };

  return (
    <Layout>
      {step === AppStep.WELCOME && (
        <div className="text-center animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-300 mb-4 animate-pulse-slow">
            Cosmic Mate
          </h1>
          <p className="text-gray-400 tracking-widest uppercase text-sm">Aligning your stars...</p>
        </div>
      )}

      {step === AppStep.DATE_INPUT && (
        <StepDate onNext={handleDateSubmit} />
      )}

      {step === AppStep.PERSONALITY && (
        <StepPersonality 
          onNext={handlePersonalitySubmit} 
          onBack={() => setStep(AppStep.DATE_INPUT)}
        />
      )}

      {step === AppStep.LOADING && (
        <div className="text-center glass-panel p-12 rounded-2xl flex flex-col items-center justify-center min-h-[400px]">
          <Loader2 className="w-16 h-16 text-purple-400 animate-spin mb-6" />
          <h3 className="text-2xl font-serif text-white mb-2">Consulting the Archives</h3>
          <p className="text-gray-400 animate-pulse">Scanning birthdays across history...</p>
        </div>
      )}

      {step === AppStep.RESULT && match && (
        <StepResult 
          match={match} 
          userDate={userData.birthDate} 
          onReset={handleReset} 
        />
      )}

      {step === AppStep.ERROR && (
        <div className="glass-panel p-8 rounded-2xl text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-red-400 border border-red-500/30">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h3 className="text-xl text-white mb-2">Cosmic Interference</h3>
          <p className="text-gray-400 mb-6">{error}</p>
          <button 
            onClick={handleReset}
            className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors border border-white/10"
          >
            Try Again
          </button>
        </div>
      )}
    </Layout>
  );
};

export default App;