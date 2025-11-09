import React, { useState } from 'react';
import { Tab } from './types';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import EmergencyHub from './components/EmergencyHub';
import MapOfHope from './components/MapOfHope';
import RestartHub from './components/RestartHub';
import VoiceAndMentorship from './components/VoiceAndMentorship';
import PanicButton from './components/PanicButton';
import Calculator from './components/Calculator';
import ContributeHub from './components/ContributeHub';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Emergency);
  const [isCoverModeActive, setIsCoverModeActive] = useState(false);

  const toggleCoverMode = () => {
    setIsCoverModeActive(prev => !prev);
  };
  
  const renderContent = () => {
    switch (activeTab) {
      case Tab.Emergency:
        return <EmergencyHub />;
      case Tab.Map:
        return <MapOfHope />;
      case Tab.Restart:
        return <RestartHub />;
      case Tab.Voice:
        return <VoiceAndMentorship />;
      case Tab.Contribute:
        return <ContributeHub />;
      default:
        return <EmergencyHub />;
    }
  };

  if (isCoverModeActive) {
    return <Calculator />;
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Header toggleCoverMode={toggleCoverMode} />
      <main className="max-w-4xl mx-auto pb-24">
        {renderContent()}
      </main>
      <PanicButton />
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default App;