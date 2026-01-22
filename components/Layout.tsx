import React from 'react';
import { Lock } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  onAdminClick?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onAdminClick }) => {
  return (
    <div className="min-h-screen w-full relative overflow-hidden flex flex-col items-center justify-center p-4">
      {/* Background Stars - simplified via CSS for performance */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-1 h-1 bg-white rounded-full opacity-70 animate-pulse"></div>
        <div className="absolute top-20 right-40 w-2 h-2 bg-purple-400 rounded-full opacity-50 animate-pulse-slow"></div>
        <div className="absolute bottom-40 left-20 w-1 h-1 bg-blue-300 rounded-full opacity-60 animate-bounce"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-900 rounded-full blur-[128px] opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center">
        {children}
      </div>
      
      <footer className="fixed bottom-4 text-xs text-gray-500 z-10 text-center w-full flex items-center justify-center gap-2">
        <span>Powered by Google Gemini • For Entertainment Purposes Only</span>
        {onAdminClick && (
          <button 
            onClick={onAdminClick}
            className="opacity-20 hover:opacity-100 transition-opacity p-1"
            title="Admin Access"
          >
            <Lock className="w-3 h-3" />
          </button>
        )}
      </footer>
    </div>
  );
};

export default Layout;