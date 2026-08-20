import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import {
  BenchmarkSubmissionPayload,
  BenchmarkResponse,
  FacilitySize,
  Region,
} from '../types/benchmark';
import { QUESTIONS_DATA } from '../constants/questions';
import { submitBenchmark } from '../services/benchmarkService';

interface BenchmarkContextType {
  currentStepIndex: number;
  answers: Record<string, number>;
  facilitySize: FacilitySize;
  region: Region;
  facilityType: string;
  isSubmitting: boolean;
  apiError: string | null;
  apiResponse: BenchmarkResponse | null;
  setAnswer: (field: string, value: number) => void;
  setFacilitySize: (size: FacilitySize) => void;
  setRegion: (region: Region) => void;
  setFacilityType: (type: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (index: number) => void;
  startBenchmark: () => void;
  submitAnswers: () => Promise<void>;
  restartBenchmark: () => void;
  localScoreSummary: {
    finalScore: number;
    percentile: number;
    dimensionScores: Record<string, number>;
    weakestDimension: string;
  };
}

const BenchmarkContext = createContext<BenchmarkContextType | undefined>(undefined);

export const BenchmarkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [facilitySize, setFacilitySize] = useState<FacilitySize>('medium');
  const [region, setRegion] = useState<Region>('latam');
  const [facilityType, setFacilityType] = useState<string>('Enterprise Colocation');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [apiResponse, setApiResponse] = useState<BenchmarkResponse | null>(null);

  const setAnswer = useCallback((field: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [field]: value }));
  }, []);

  const startBenchmark = useCallback(() => {
    setCurrentStepIndex(0);
    setApiError(null);
  }, []);

  const goToStep = useCallback((index: number) => {
    setCurrentStepIndex(index);
  }, []);

  const submitAnswers = useCallback(async () => {
    setIsSubmitting(true);
    setApiError(null);

    const payload: BenchmarkSubmissionPayload = {
      facility_size: facilitySize,
      region: region,
      facility_type: facilityType,
      p1: answers['p1'] || 3,
      p2: answers['p2'] || 3,
      p3: answers['p3'] || 3,
      p4: answers['p4'] || 3,
      p5: answers['p5'] || 3,
      p6: answers['p6'] || 3,
      p7: answers['p7'] || 3,
      p8: answers['p8'] || 3,
      p9: answers['p9'] || 3,
      p10: answers['p10'] || 3,
      p11: answers['p11'] || 3,
      p12: answers['p12'] || 3,
      p13: answers['p13'] || 3,
      p14: answers['p14'] || 3,
      p15: answers['p15'] || 3,
    };

    try {
      const result = await submitBenchmark(payload);
      setApiResponse(result);
      setCurrentStepIndex(QUESTIONS_DATA.length); // Ir a pantalla de resultados
    } catch (err: unknown) {
      console.warn('Backend no disponible o error en endpoint, usando cálculo estimado local:', err);
      setApiError('El backend no respondió en este momento. Se muestran resultados estimados.');
      setCurrentStepIndex(QUESTIONS_DATA.length);
    } finally {
      setIsSubmitting(false);
    }
  }, [answers, facilitySize, region, facilityType]);

  const nextStep = useCallback(() => {
    if (currentStepIndex >= 0 && currentStepIndex < QUESTIONS_DATA.length - 1) {
      const currentQ = QUESTIONS_DATA[currentStepIndex];
      if (!answers[currentQ.field]) return;
      setCurrentStepIndex((prev) => prev + 1);
    } else if (currentStepIndex === QUESTIONS_DATA.length - 1) {
      // Última pregunta -> Enviar al backend
      submitAnswers();
    }
  }, [currentStepIndex, answers, submitAnswers]);

  const prevStep = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    } else if (currentStepIndex === 0) {
      setCurrentStepIndex(-1);
    }
  }, [currentStepIndex]);

  const restartBenchmark = useCallback(() => {
    setCurrentStepIndex(-1);
    setAnswers({});
    setApiResponse(null);
    setApiError(null);
  }, []);

  // Cálculo de fallback local
  const localScoreSummary = useMemo(() => {
    const dimKeys: Record<string, string[]> = {
      visibilidad: ['p1', 'p2', 'p3'],
      friccion: ['p4', 'p5'],
      latencia: ['p6', 'p7', 'p8'],
      auto_cuantificacion: ['p9', 'p10'],
      bloqueantes: ['p11', 'p12', 'p13', 'p14', 'p15'],
    };

    const dimensionScores: Record<string, number> = {};
    let totalScoreSum = 0;
    let totalDimensions = 0;

    for (const [dim, keys] of Object.entries(dimKeys)) {
      const sum = keys.reduce((acc, k) => acc + (answers[k] || 3), 0);
      const avgPercent = Math.round((sum / (keys.length * 5)) * 100);
      dimensionScores[dim] = avgPercent;
      totalScoreSum += avgPercent;
      totalDimensions++;
    }

    const finalScore = Math.round(totalScoreSum / totalDimensions);
    const sortedDims = Object.entries(dimensionScores).sort((a, b) => a[1] - b[1]);
    const weakestDimension = sortedDims[0]?.[0] || 'latencia';

    // Estimación percentil
    const percentile = Math.min(99, Math.max(1, Math.round((finalScore / 100) * 85 + 10)));

    return {
      finalScore,
      percentile,
      dimensionScores,
      weakestDimension,
    };
  }, [answers]);

  return (
    <BenchmarkContext.Provider
      value={{
        currentStepIndex,
        answers,
        facilitySize,
        region,
        facilityType,
        isSubmitting,
        apiError,
        apiResponse,
        setAnswer,
        setFacilitySize,
        setRegion,
        setFacilityType,
        nextStep,
        prevStep,
        goToStep,
        startBenchmark,
        submitAnswers,
        restartBenchmark,
        localScoreSummary,
      }}
    >
      {children}
    </BenchmarkContext.Provider>
  );
};

export const useBenchmark = (): BenchmarkContextType => {
  const context = useContext(BenchmarkContext);
  if (!context) {
    throw new Error('useBenchmark must be used within a BenchmarkProvider');
  }
  return context;
};
