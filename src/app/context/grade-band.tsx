import { createContext, useContext, type ReactNode } from 'react';

export type GradeBand = 'sprouts' | 'explorers' | 'champions';

export interface GradeBandTheme {
  band: GradeBand;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    accent: string;
    success: string;
    warning: string;
    error: string;
    border: string;
  };
  font: string;
  fontSize: {
    body: string;
    header: string;
    small: string;
  };
  buttonSize: 'large' | 'medium' | 'compact';
  navItems: string[];
  showLeaderboard: boolean;
  showCompetition: boolean;
  showGames: boolean;
  currencyIcon: string;
  currencyLabel: string;
}

const sproutsTheme: GradeBandTheme = {
  band: 'sprouts',
  name: '🌱 Sprouts',
  colors: {
    primary: '#FF6B6B',
    secondary: '#4ECDC4',
    background: '#FFF9E6',
    surface: '#FFFFFF',
    text: '#2D3748',
    textSecondary: '#718096',
    accent: '#FFE66D',
    success: '#68D391',
    warning: '#F6AD55',
    error: '#FC8181',
    border: '#E2E8F0',
  },
  font: "'Nunito', sans-serif",
  fontSize: { body: '16px', header: '22px', small: '14px' },
  buttonSize: 'large',
  navItems: ['home', 'learn', 'play', 'rewards'],
  showLeaderboard: false,
  showCompetition: false,
  showGames: true,
  currencyIcon: '⭐',
  currencyLabel: 'Stars',
};

const explorersTheme: GradeBandTheme = {
  band: 'explorers',
  name: '🚀 Explorers',
  colors: {
    primary: '#667EEA',
    secondary: '#764BA2',
    background: '#F7FAFC',
    surface: '#FFFFFF',
    text: '#2D3748',
    textSecondary: '#718096',
    accent: '#48DBFB',
    success: '#68D391',
    warning: '#F6AD55',
    error: '#FC8181',
    border: '#E2E8F0',
  },
  font: "'Inter', sans-serif",
  fontSize: { body: '14px', header: '18px', small: '12px' },
  buttonSize: 'medium',
  navItems: ['home', 'subjects', 'map', 'leaderboard', 'profile'],
  showLeaderboard: true,
  showCompetition: true,
  showGames: true,
  currencyIcon: '💎',
  currencyLabel: 'Gems',
};

const championsTheme: GradeBandTheme = {
  band: 'champions',
  name: '🎯 Champions',
  colors: {
    primary: '#38BDF8',
    secondary: '#A78BFA',
    background: '#0F172A',
    surface: '#1E293B',
    text: '#F1F5F9',
    textSecondary: '#94A3B8',
    accent: '#A78BFA',
    success: '#34D399',
    warning: '#FBBF24',
    error: '#F87171',
    border: '#334155',
  },
  font: "'Inter', sans-serif",
  fontSize: { body: '13px', header: '16px', small: '11px' },
  buttonSize: 'compact',
  navItems: ['home', 'dashboard', 'subjects', 'compete', 'shop', 'profile'],
  showLeaderboard: true,
  showCompetition: true,
  showGames: true,
  currencyIcon: '🪙',
  currencyLabel: 'Coins',
};

export const gradeBandThemes: Record<GradeBand, GradeBandTheme> = {
  sprouts: sproutsTheme,
  explorers: explorersTheme,
  champions: championsTheme,
};

export function getGradeBand(grade: number): GradeBand {
  if (grade >= 0 && grade <= 4) return 'sprouts';
  if (grade >= 5 && grade <= 9) return 'explorers';
  return 'champions';
}

interface GradeBandContextType {
  theme: GradeBandTheme;
  grade: number;
  setGrade: (grade: number) => void;
  band: GradeBand;
}

const GradeBandContext = createContext<GradeBandContextType>({
  theme: explorersTheme,
  grade: 5,
  setGrade: () => {},
  band: 'explorers',
});

export function GradeBandProvider({ children, grade, setGrade }: { children: ReactNode; grade: number; setGrade: (g: number) => void }) {
  const band = getGradeBand(grade);
  const theme = gradeBandThemes[band];

  return (
    <GradeBandContext.Provider value={{ theme, grade, setGrade, band }}>
      {children}
    </GradeBandContext.Provider>
  );
}

export function useGradeBand() {
  return useContext(GradeBandContext);
}
