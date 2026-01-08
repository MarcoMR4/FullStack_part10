import { Platform } from 'react-native';

export interface Theme {
  colors: {
    textPrimary: string;
    textSecondary: string;
    primary: string;
    background: string;
    tint: string;
    icon: string;
    tabIconDefault: string;
    tabIconSelected: string;
  };
  fontSizes: {
    body: number;
    subheading: number;
  };
  fonts: {
    main: string;
  };
  fontWeights: {
    normal: 'normal';
    bold: 'bold';
  };
}

export const getTheme = (scheme: 'light' | 'dark' = 'dark'): Theme => ({
  colors: {
    textPrimary: scheme === 'dark' ? '#ECEDEE' : '#24292e',
    textSecondary: scheme === 'dark' ? '#a1c6f1ff' : '#687076',
    primary: Platform.select({
      android: '#0366d6',
      ios: '#14a40aff',
      web: '#d64903ff',
      default:'#480d80ff',
    }) as string,
    // Colores extendidos de Colors
    background: scheme === 'dark' ? '#1c1e21ff' : '#ffffffaa',
    tint: scheme === 'dark' ? '#fff' : '#0a7ea4',
    icon: scheme === 'dark' ? '#9BA1A6' : '#687076',
    tabIconDefault: scheme === 'dark' ? '#9BA1A6' : '#687076',
    tabIconSelected: scheme === 'dark' ? '#fff' : '#0a7ea4',
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      ios: 'Arial',
      android: 'Roboto',
      web: "sans-serif",
      default: 'System',
    }) as string,
  },
  fontWeights: {
    normal: 'normal',
    bold: 'bold',
  },
});

const theme = getTheme();

export default theme;
