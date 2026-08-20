import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { BenchmarkProvider, useBenchmark } from './context/BenchmarkContext';
import { QUESTIONS_DATA } from './constants/questions';
import { Header } from './components/layout/Header';
import { ProgressBar } from './components/layout/ProgressBar';
import { Footer } from './components/layout/Footer';
import { IntroCard } from './components/intro/IntroCard';
import { QuestionCard } from './components/survey/QuestionCard';
import { ResultsDashboard } from './components/results/ResultsDashboard';
import { LoadingOverlay } from './components/common/LoadingOverlay';

const BenchmarkAppContent: React.FC = () => {
  const { currentStepIndex, isSubmitting } = useBenchmark();

  const totalQuestions = QUESTIONS_DATA.length;

  return (
    <div className="app-container">
      <Header />
      <ProgressBar />

      <main className="card-container">
        {isSubmitting ? (
          <LoadingOverlay />
        ) : currentStepIndex === -1 ? (
          <IntroCard />
        ) : currentStepIndex >= 0 && currentStepIndex < totalQuestions ? (
          <QuestionCard />
        ) : (
          <ResultsDashboard />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <BenchmarkProvider>
        <BenchmarkAppContent />
      </BenchmarkProvider>
    </ThemeProvider>
  );
}
