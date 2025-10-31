/**
 * @file ThemeProvider.tsx
 * @description Provides dynamic color theme context using NativeWind + React Context.
 */

import React, { createContext, useContext, useMemo } from 'react';
import { View } from 'react-native';
import { useColorScheme } from 'nativewind';
import { themes } from '@/utils/color-theme';

export type AppTheme = 'light' | 'dark';

interface ThemeContextState {
  theme: AppTheme;
}

interface ThemeProviderProps {
  children: React.ReactNode;
}

/* ------------------------------------------------
 ✅ Context
--------------------------------------------------*/
const ThemeContext = createContext<ThemeContextState>({
  theme: 'light',
});

/* ------------------------------------------------
 ✅ Provider
--------------------------------------------------*/
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { colorScheme } = useColorScheme();
  const theme = (colorScheme ?? 'light') as AppTheme;

  // ✅ Memoize theme styles to avoid re-renders
  const themeStyles = useMemo(() => themes[theme], [theme]);

  return (
    <ThemeContext.Provider value={{ theme }}>
      <View style={themeStyles} className="flex-1">
        {children}
      </View>
    </ThemeContext.Provider>
  );
};

/* ------------------------------------------------
 ✅ Hook
--------------------------------------------------*/
export const useTheme = () => useContext(ThemeContext);
