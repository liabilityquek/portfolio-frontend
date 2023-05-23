import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';

export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function MyApp({ children }) {
    const theme = useTheme();
  
    return (
      <div
        style={{
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
        }}
      >
        {children}
      </div>
    );
  }

export default function LightingMode({ children }) {
  const [mode, setMode] = React.useState('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );


  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          background: {
            default: mode === 'light' ? '#ffffff' : '#000000',
          },
          text: {
            primary: mode === 'light' ? '#000000' : '#ffffff',
          }
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
      <MyApp>{children}</MyApp>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}