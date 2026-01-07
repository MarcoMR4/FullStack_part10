import { Platform } from 'react-native';

export interface Theme {
  colors: {
    textPrimary: string;
    textSecondary: string;
    primary: string;
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

const theme: Theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#a1c6f1ff',
    primary: Platform.select({
      android: '#0366d6',
      ios: '#14a40aff',
      web: '#d64903ff',
      default: '#480d80ff',
    }) as string,
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
};

export default theme;

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

