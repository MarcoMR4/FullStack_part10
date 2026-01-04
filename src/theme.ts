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
    textSecondary: '#586069',
    primary: '#0366d6',
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: 'System',
  },
  fontWeights: {
    normal: 'normal',
    bold: 'bold',
  },
};

export default theme;
