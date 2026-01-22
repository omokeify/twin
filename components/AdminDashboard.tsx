import React, { useState, useEffect, useMemo } from 'react';
import { getStats, clearRecords } from '../services/storageService';
import { UserRecord } from '../types';
import { Lock, Users, TrendingUp, Map, Trash2, X, ShieldCheck, Download, Activity, PieChart, BarChart3, Globe } from 'lucide-react';

interface AdminDashboardProps {
  onExit: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onExit }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [records, setRecords] = useState<UserRecord[]>([]);
  const [view, setView] = useState<'overview' | 'table'>('overview');

  useEffect(() => {
    if (isAuthenticated) {
      const stats = getStats();
      setRecords(stats.records);
    }
  }, [isAuthenticated]);

  const analytics = useMemo(() => {
    const traitCounts: Record<string, number> = {};
    const regionCounts: Record<string, number> = {};
    const genderCounts: Record<string, number> = {};
    const statusCounts: Record<string, number> = {};

    records.forEach(r => {
      // Traits
      r.traits.forEach(t => traitCounts[t] = (traitCounts[t] || 0) + 1);
      // Region
      regionCounts[r.region] = (regionCounts[r.region] || 0) + 1;
      // Gender (defaulting to 'any' if undefined for old records)
      const g = r.gender || 'any';
      genderCounts[g] = (genderCounts[g] || 0) + 1;
      // Status
      const s = r.statusPreference || 'all';
      statusCounts[s] = (statusCounts[s] || 0) + 1;
    });

    const sortObj = (obj: Record<string, number>) => Object.entries(obj).sort((a, b) => b[1] - a[1]);

    return {
      total: records.length,
      traits: sortObj(traitCounts).slice(0, 5),
      regions: sortObj(regionCounts),
      genders: sortObj(genderCounts),
      statuses: sortObj(statusCounts),
      recentActivity: records.slice(0, 10)
    };
  }, [records]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'cosmos' || password === 'admin') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid Access Code');
    }
  };

  const handleClearData = () => {
    if (window.confirm('WARNING: This will permanently delete all user session data. Continue?')) {
      clearRecords();
      setRecords([]);
    }
  };

  const handleExportCSV = () => {
    if (records.length === 0) return;
    
    const headers = ['Timestamp', 'Name', 'Birth Date', 'Region', 'Gender', 'Preference', 'Match', 'Traits'];
    const rows = records.map(r => [
      new Date(r.timestamp).toISOString(),
      `"${r.name}"`,
      r.birthDate,
      r.region,
      r.gender || 'any',
      r.statusPreference || 'all',
      `"${r.matchName}"`,
      `"${r.traits.join(', ')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `cosmic_data_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isAuthenticated) {
    return (
      <div className="glass-panel p-10 rounded-2xl max-w-md w-full mx-auto animate-fade-in text-center border-t border-purple-500/20">
        <div className="bg-white/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/10 shadow-[0_0_30px_rgba(168,85,247,0.15)]">
          <Lock className="w-8 h-8 text-purple-300" />
        </div>
        <h2 className="text-3xl font-serif text-white mb-2">Admin Portal</h2>
        <p className="text-gray-400 mb-8 text-sm">Authorized Personnel Only</p>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
             <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Access Key"
              className="w-full bg-black/40 border border-white/10 rounded-lg p-4 text-center text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:bg-black/60 transition-all font-mono tracking-widest"
              autoFocus
            />
          </div>
          {error && <p className="text-red-400 text-xs tracking-wide uppercase">{error}</p>}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={onExit}
              className="py-3 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 transition-colors text-sm font-medium"
            >
              Exit
            </button>
            <button
              type="submit"
              className="py-3 bg-purple-600/80 hover:bg-purple-600 rounded-lg text-white font-medium transition-all shadow-lg shadow-purple-900/20 text-sm"
            >
              Authenticate
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl animate-fade-in p-2 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-serif text-white flex items-center gap-3 mb-1">
            <ShieldCheck className="w-8 h-8 text-purple-400" /> 
            Cosmic Analytics
          </h1>
          <p className="text-gray-400 text-sm flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
             System Active • {new Date().toLocaleDateString()}
          </p>
        </div>
        <div className="flex gap-2">
           <div className="bg-black/30 rounded-lg p-1 flex border border-white/10">
             <button 
               onClick={() => setView('overview')}
               className={`px-4 py-2 rounded-md text-sm transition-all ${view === 'overview' ? 'bg-purple-600/20 text-purple-200 shadow-sm' : 'text-gray-400 hover:text-white'}`}
             >
               Overview
             </button>
             <button 
               onClick={() => setView('table')}
               className={`px-4 py-2 rounded-md text-sm transition-all ${view === 'table' ? 'bg-purple-600/20 text-purple-200 shadow-sm' : 'text-gray-400 hover:text-white'}`}
             >
               Data Records
             </button>
           </div>
           <button 
             onClick={onExit}
             className="bg-white/5 hover:bg-white/10 p-3 rounded-lg text-gray-300 transition-colors border border-white/5"
           >
             <X className="w-5 h-5" />
           </button>
        </div>
      </div>

      {view === 'overview' ? (
        <div className="space-y-6">
          {/* Key Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="glass-panel p-6 rounded-xl border-t border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-transparent">
              <div className="flex justify-between items-start mb-2">
                <span className="text-gray-400 text-xs font-mono uppercase tracking-wider">Total Users</span>
                <Users className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-4xl font-bold text-white font-serif">{analytics.total}</div>
              <div className="text-xs text-green-400 mt-2 flex items-center gap-1">
                <Activity className="w-3 h-3" />
                All time visits
              </div>
            </div>

            <div className="glass-panel p-6 rounded-xl border-t border-blue-500/30 bg-gradient-to-br from-blue-900/20 to-transparent">
              <div className="flex justify-between items-start mb-2">
                <span className="text-gray-400 text-xs font-mono uppercase tracking-wider">Top Trait</span>
                <BarChart3 className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-white capitalize truncate">
                {analytics.traits[0]?.[0] || 'N/A'}
              </div>
              <div className="text-xs text-blue-300 mt-2">
                {analytics.traits[0]?.[1] || 0} occurrences
              </div>
            </div>

             <div className="glass-panel p-6 rounded-xl border-t border-pink-500/30 bg-gradient-to-br from-pink-900/20 to-transparent">
              <div className="flex justify-between items-start mb-2">
                <span className="text-gray-400 text-xs font-mono uppercase tracking-wider">Top Region</span>
                <Globe className="w-4 h-4 text-pink-400" />
              </div>
              <div className="text-2xl font-bold text-white capitalize truncate">
                {analytics.regions[0]?.[0]?.replace('_', ' ') || 'N/A'}
              </div>
               <div className="text-xs text-pink-300 mt-2">
                Most selected origin
              </div>
            </div>

            <div className="glass-panel p-6 rounded-xl border-t border-yellow-500/30 bg-gradient-to-br from-yellow-900/20 to-transparent">
              <div className="flex justify-between items-start mb-2">
                <span className="text-gray-400 text-xs font-mono uppercase tracking-wider">Status Preference</span>
                <PieChart className="w-4 h-4 text-yellow-400" />
              </div>
              <div className="text-2xl font-bold text-white capitalize truncate">
                {analytics.statuses[0]?.[0] || 'N/A'}
              </div>
              <div className="text-xs text-yellow-300 mt-2">
                 Dominant timeline
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Personality Spectrum */}
            <div className="glass-panel p-6 rounded-xl border-white/5">
              <h3 className="text-lg font-serif text-white mb-6 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-purple-400" /> Personality Spectrum
              </h3>
              <div className="space-y-4">
                {analytics.traits.map(([trait, count], idx) => {
                  const percentage = Math.round((count / (analytics.total * 3)) * 100 * 3); // Approx percentage relative to total users (since users pick 3)
                  const relativePct = Math.round((count / analytics.traits[0][1]) * 100);
                  
                  return (
                    <div key={trait} className="group">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-300 capitalize">{trait}</span>
                        <span className="text-gray-500 font-mono">{count}</span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-purple-600 to-blue-500 rounded-full transition-all duration-1000 ease-out group-hover:from-purple-500 group-hover:to-blue-400"
                          style={{ width: `${relativePct}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
                {analytics.traits.length === 0 && <p className="text-gray-500 text-sm text-center py-8">No data available</p>}
              </div>
            </div>

            {/* Demographics & Regions */}
            <div className="glass-panel p-6 rounded-xl border-white/5 flex flex-col">
              <h3 className="text-lg font-serif text-white mb-6 flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-400" /> Regional & Gender Distribution
              </h3>
              
              <div className="flex-1 grid grid-cols-2 gap-8">
                 <div className="space-y-3">
                   <h4 className="text-xs font-mono uppercase text-gray-500 tracking-widest mb-2">Regions</h4>
                   {analytics.regions.slice(0, 5).map(([region, count]) => (
                     <div key={region} className="flex items-center gap-2 text-sm">
                       <div className="w-1 h-6 bg-blue-500/20 rounded-sm">
                         <div className="w-full bg-blue-400 rounded-sm" style={{ height: `${Math.min((count / analytics.total) * 100, 100)}%` }}></div>
                       </div>
                       <div className="flex-1">
                         <div className="text-gray-300 capitalize truncate">{region.replace('_', ' ')}</div>
                         <div className="text-[10px] text-gray-600">{Math.round((count/analytics.total)*100)}%</div>
                       </div>
                     </div>
                   ))}
                 </div>

                 <div className="space-y-3">
                   <h4 className="text-xs font-mono uppercase text-gray-500 tracking-widest mb-2">Gender Pref</h4>
                   {analytics.genders.map(([gender, count]) => (
                     <div key={gender} className="bg-white/5 p-2 rounded-lg flex justify-between items-center">
                       <span className="text-xs text-gray-300 capitalize">{gender}</span>
                       <span className="text-xs font-bold text-white">{count}</span>
                     </div>
                   ))}
                 </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Detailed Table View */
        <div className="glass-panel rounded-xl overflow-hidden border border-white/10 flex flex-col h-[600px]">
          <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/20">
            <div className="flex items-center gap-4">
              <h3 className="text-sm font-medium text-white uppercase tracking-wider">User Records Database</h3>
              <span className="bg-purple-900/30 text-purple-300 text-xs px-2 py-0.5 rounded border border-purple-500/20">
                {analytics.total} Entries
              </span>
            </div>
            <div className="flex gap-2">
               <button 
                onClick={handleExportCSV}
                disabled={records.length === 0}
                className="text-gray-300 hover:text-white text-xs flex items-center gap-2 px-3 py-2 rounded bg-white/5 hover:bg-white/10 border border-white/10 transition-colors disabled:opacity-50"
              >
                <Download className="w-3 h-3" /> Export CSV
              </button>
              <button 
                onClick={handleClearData}
                className="text-red-400 hover:text-red-300 text-xs flex items-center gap-2 px-3 py-2 rounded bg-red-900/10 hover:bg-red-900/20 border border-red-900/30 transition-colors"
              >
                <Trash2 className="w-3 h-3" /> Purge Database
              </button>
            </div>
          </div>
          
          <div className="overflow-auto flex-1 custom-scrollbar">
            <table className="w-full text-left text-sm text-gray-400">
              <thead className="bg-black/40 uppercase text-[10px] font-semibold text-gray-500 sticky top-0 z-10 backdrop-blur-md">
                <tr>
                  <th className="px-6 py-3 border-b border-white/10">Timestamp</th>
                  <th className="px-6 py-3 border-b border-white/10">User</th>
                  <th className="px-6 py-3 border-b border-white/10">Input</th>
                  <th className="px-6 py-3 border-b border-white/10">Preferences</th>
                  <th className="px-6 py-3 border-b border-white/10">Result</th>
                  <th className="px-6 py-3 border-b border-white/10">Traits</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {analytics.total === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-600 font-mono text-xs">
                      [NO_DATA_AVAILABLE]
                    </td>
                  </tr>
                ) : (
                  records.map((record) => (
                    <tr key={record.id} className="hover:bg-white/5 transition-colors group">
                      <td className="px-6 py-3 font-mono text-[10px] text-gray-500 group-hover:text-gray-400">
                        {new Date(record.timestamp).toLocaleString()}
                      </td>
                      <td className="px-6 py-3">
                         <div className="text-white font-medium text-xs">{record.name}</div>
                      </td>
                      <td className="px-6 py-3 text-xs">
                         <div className="flex flex-col gap-0.5">
                           <span className="text-gray-300">{record.birthDate}</span>
                         </div>
                      </td>
                      <td className="px-6 py-3">
                         <div className="flex gap-1">
                           <span className="px-1.5 py-0.5 rounded bg-blue-900/20 text-blue-300 border border-blue-500/20 text-[10px] capitalize">
                             {record.region.replace('_', ' ')}
                           </span>
                           <span className="px-1.5 py-0.5 rounded bg-gray-800 text-gray-300 border border-white/10 text-[10px] capitalize">
                             {record.gender || '?'}
                           </span>
                         </div>
                      </td>
                      <td className="px-6 py-3 text-purple-300 font-medium text-xs">
                        {record.matchName}
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {record.traits.map(t => (
                            <span key={t} className="px-1.5 py-0.5 rounded-full bg-white/5 text-[10px] text-gray-400 border border-white/5">
                              {t}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;