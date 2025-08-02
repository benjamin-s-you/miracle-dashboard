import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

import ChartsPage from './pages/ChartsPage';
import DashboardPage from './pages/DashboardPage';
import SidebarLayout from './components/SidebarLayout';
import HomePage from './pages/HomePage';
import TopBar from './components/TopBar';
import { useFontSizeStore } from './stores/fontSizeStore';
import { useDataStore } from './stores/dataStore';

function App() {
  const { fontSize } = useFontSizeStore();
  const { loadData } = useDataStore();

  // Load data on app startup
  useEffect(() => {
    loadData();
  }, [loadData]);

  const theme = createTheme({
    palette: {
      primary: {
        main: '#8b6bc7',
        light: '#b08dd8',
        dark: '#6a4c9a',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#d4a5ff',
        light: '#e6c7ff',
        dark: '#b07ad8',
        contrastText: '#000000',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: fontSize === 'small' ? 12 : fontSize === 'large' ? 18 : 14,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CssBaseline />
        <SidebarLayout>
          <TopBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/charts" element={<ChartsPage />} />
            <Route path="/dashboard/:id" element={<DashboardPage />} />
          </Routes>
        </SidebarLayout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
