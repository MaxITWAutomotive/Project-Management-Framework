import React, { useState } from 'react';
import HomeScreen from './screens/HomeScreen.jsx';
import MoldLibraryScreen from './screens/MoldLibraryScreen.jsx';
import DrawingsScreen from './screens/DrawingsScreen.jsx';
import AssembliesScreen from './screens/AssembliesScreen.jsx';

/** App shell — mimics Navigate() between the four screens of the Power App. */
export default function App() {
  const [screen, setScreen] = useState('home');

  switch (screen) {
    case 'mold':
      return <MoldLibraryScreen onHome={() => setScreen('home')} />;
    case 'drawings':
      return <DrawingsScreen onHome={() => setScreen('home')} />;
    case 'assemblies':
      return <AssembliesScreen onHome={() => setScreen('home')} />;
    default:
      return <HomeScreen onNavigate={setScreen} />;
  }
}
