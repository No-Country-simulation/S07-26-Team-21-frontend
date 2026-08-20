import { api } from './api';
import {
  BenchmarkSubmissionPayload,
  BenchmarkResponse,
  BenchmarkStatsResponse,
} from '../types/benchmark';

export const submitBenchmark = async (
  payload: BenchmarkSubmissionPayload
): Promise<BenchmarkResponse> => {
  const response = await api.post<BenchmarkResponse>('/benchmark/submit', payload);
  return response.data;
};

export const getBenchmarkStats = async (): Promise<BenchmarkStatsResponse> => {
  const response = await api.get<BenchmarkStatsResponse>('/benchmark/stats');
  return response.data;
};
