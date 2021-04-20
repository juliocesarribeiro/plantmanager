import React from 'react';
import Routes from './src/routes';

import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold,
} from '@expo-google-fonts/jost';

export default function App() {
  const [fonstLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  })

  if (!fonstLoaded) {
    return <AppLoading />
  }

  return (
    <Routes />
  );
}
