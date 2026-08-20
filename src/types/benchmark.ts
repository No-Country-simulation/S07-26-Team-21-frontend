export type FacilitySize = 'small' | 'medium' | 'large' | 'mega';
export type Region = 'latam' | 'usa' | 'europe' | 'apac' | 'north_america' | 'asia_pacific' | 'other';

export interface BenchmarkSubmissionPayload {
  facility_size: FacilitySize;
  region: Region;
  facility_type?: string;
  p1: number;
  p2: number;
  p3: number;
  p4: number;
  p5: number;
  p6: number;
  p7: number;
  p8: number;
  p9: number;
  p10: number;
  p11: number;
  p12: number;
  p13: number;
  p14: number;
  p15: number;
}

export interface LikertScores {
  visibilidad: number;
  friccion: number;
  latencia: number;
  auto_cuantificacion: number;
  bloqueantes: number;
  [key: string]: number;
}

export interface DimensionPercentiles extends LikertScores {
  general: number;
}

export interface MainWeakness {
  dimension: string;
  user_score: number;
  top_quartile_average?: number;
  gap?: number;
  recommendations: string[];
  llm_generated: boolean;
}

export interface PeerComparison {
  peers_count: number;
  peer_average_score: number | null;
  your_score: number;
  gap_vs_peers: number | null;
  percentile_vs_peers: number | null;
  disclaimer: string | null;
  message: string;
}

export interface Narratives {
  weakness_explanation: string;
  top_quartile_practices: string;
  llm_generated: boolean;
  generated_at?: string;
}

export interface RebalancingStatus {
  weight_public: number;
  weight_private: number;
}

export interface BenchmarkResponse {
  evaluation_id: string;
  user_context: {
    facility_size: FacilitySize;
    region: Region;
  };
  scores_likert: LikertScores;
  percentiles: DimensionPercentiles;
  main_weakness: MainWeakness;
  rebalancing_status?: RebalancingStatus;
  peer_comparison?: PeerComparison;
  narratives?: Narratives;
}

export interface BenchmarkStatsResponse {
  total_evaluations: number;
  by_region?: Record<string, number>;
  by_size?: Record<string, number>;
  average_general_percentile?: number;
  evaluations_by_dimension_strength?: Record<string, number>;
  average_scores?: Record<string, number>;
  general_average?: number;
  cached?: boolean;
  calculated_at?: string;
}

export interface QuestionData {
  key: string;
  field: keyof BenchmarkSubmissionPayload;
  category: string;
  question: string;
  descriptions: Record<number, string>;
}
