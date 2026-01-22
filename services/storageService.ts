import { UserData, UserRecord } from '../types';

const STORAGE_KEY = 'cosmic_mate_records';

export const saveVisit = (userData: UserData, matchName: string) => {
  try {
    const existing = getRecords();
    const newRecord: UserRecord = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      name: userData.name,
      birthDate: userData.birthDate,
      traits: userData.personalityTraits,
      matchName: matchName,
      region: userData.regionPreference,
      gender: userData.genderPreference,
      statusPreference: userData.preference
    };
    // Keep only last 100 records to avoid localStorage limits in this demo
    const updated = [newRecord, ...existing].slice(0, 100);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error("Storage failed", e);
  }
};

export const getRecords = (): UserRecord[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

export const getStats = () => {
  const records = getRecords();
  const totalUsers = records.length;
  
  // Count traits
  const traitCounts: Record<string, number> = {};
  records.forEach(r => {
    r.traits.forEach(t => {
      traitCounts[t] = (traitCounts[t] || 0) + 1;
    });
  });
  const sortedTraits = Object.entries(traitCounts).sort((a, b) => b[1] - a[1]);
  const topTrait = sortedTraits.length > 0 ? sortedTraits[0][0] : 'N/A';

  // Count regions
  const regionCounts: Record<string, number> = {};
  records.forEach(r => {
    regionCounts[r.region] = (regionCounts[r.region] || 0) + 1;
  });
  const sortedRegions = Object.entries(regionCounts).sort((a, b) => b[1] - a[1]);
  const topRegion = sortedRegions.length > 0 ? sortedRegions[0][0] : 'N/A';

  return {
    totalUsers,
    topTrait,
    topRegion,
    records
  };
};

export const clearRecords = () => {
  localStorage.removeItem(STORAGE_KEY);
};