import React from 'react';
import { Header } from './sections/header';
import { Leagues } from './sections/leagues';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Leagues />
    </div>
  );
};

export default App;
