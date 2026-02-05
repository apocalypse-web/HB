
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Landing from './components/Landing';
import ApologySection from './components/ApologySection';
import MemoryJourney from './components/MemoryJourney';
import SpecialReasons from './components/SpecialReasons';
import FinalScreen from './components/FinalScreen';
import Footer from './components/Footer';
import BackgroundMusic from './components/BackgroundMusic';
import { AppStep } from './types';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.LANDING);
  const [musicStarted, setMusicStarted] = useState(false);

  const startJourney = () => {
    setMusicStarted(true);
    setStep(AppStep.SORRY);
  };

  const renderStep = () => {
    switch (step) {
      case AppStep.LANDING:
        return <Landing key="landing" onNext={startJourney} />;
      case AppStep.SORRY:
        return <ApologySection key="sorry" onNext={() => setStep(AppStep.MEMORIES)} />;
      case AppStep.MEMORIES:
        return <MemoryJourney key="memories" onNext={() => setStep(AppStep.REASONS)} />;
      case AppStep.REASONS:
        return <SpecialReasons key="reasons" onNext={() => setStep(AppStep.FINAL)} />;
      case AppStep.FINAL:
        return <FinalScreen key="final" />;
      default:
        return <Landing key="landing" onNext={startJourney} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <BackgroundMusic isStarted={musicStarted} />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </main>
      {step === AppStep.FINAL && <Footer />}
    </div>
  );
};

export default App;
