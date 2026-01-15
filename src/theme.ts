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
    error: string;
  };
  forms: {
    placeholder: string;
    errorColor: string;
    errorFontSize: number;
    errorMarginTop: number;
    textInputBorderWidth: number;
    textInputBorderRadius: number;
    textInputPadding: number;
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
  Item:{
    backgroundColor:string;
  }
}

function getPlatformPrimaryColor() {
  return Platform.select({
    android: '#0366d6',
    ios: '#14a40aff',
    web: '#d64903ff',
    default: '#480d80ff',
  }) as string;
}

export const getTheme = (scheme: 'light' | 'dark' = 'dark'): Theme => ({
  colors: {
    textPrimary: scheme === 'dark' ? '#ECEDEE' : '#24292e',
    textSecondary: scheme === 'dark' ? '#a1c6f1ff' : '#091877ff',
    primary: getPlatformPrimaryColor(),
    background: scheme === 'dark' ? '#000000ff' : '#ffffffaa',
    tint: scheme === 'dark' ? '#fff' : '#0a7ea4',
    icon: scheme === 'dark' ? '#9BA1A6' : '#687076',
    tabIconDefault: scheme === 'dark' ? '#9BA1A6' : '#687076',
    tabIconSelected: scheme === 'dark' ? '#fff' : getPlatformPrimaryColor(),
    error: '#d73a4a',
  },
  forms: {
    placeholder: scheme === 'dark' ? '#a1c6f1ff' : '#687076',
    errorColor: '#d73a4a',
    errorFontSize: 12,
    errorMarginTop: 5,
    textInputBorderWidth: 1,
    textInputBorderRadius: 4,
    textInputPadding: 10,
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
  Item:{
    backgroundColor: scheme === 'dark' ? '#2a2c2eff' : '#b6b6b0ff',
  }
});

const theme = getTheme();

export default theme;
