import React, {
  createContext,
  ReactNode,
  useContext,
  useState
} from 'react';
import { useColorScheme as useSystemColorScheme } from 'react-native';

export type ThemeScheme = 'light' | 'dark';

interface ThemeContextProps {
  themeScheme: ThemeScheme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProviderCustom = ({ children }: { children: ReactNode }) => {
  const systemScheme = useSystemColorScheme();
  const [themeScheme, setThemeScheme] = useState<ThemeScheme>(systemScheme ?? 'dark');

  const toggleTheme = () => {
    setThemeScheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ themeScheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeScheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeScheme must be used within a ThemeProviderCustom');
  }
  return context;
};
