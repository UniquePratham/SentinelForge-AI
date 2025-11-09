// Added 'coming-soon' to represent agents that are not implemented yet
export type AgentStatus = 'idle' | 'processing' | 'completed' | 'error' | 'coming-soon';

export type SeverityLevel = 'low' | 'medium' | 'high' | 'critical';

export interface AgentMetadata {
  filename?: string;
  filetype?: string;
  size_kb?: number;
  timestamp?: string;
  [key: string]: any;
}

export interface AISummary {
  summary: string;
  file_type_guess?: string;
  probable_domain?: string;
  key_fields?: string[];
  insights?: string[];
  anomalies?: Anomaly[];
}

export interface Anomaly {
  line?: number;
  snippet: string;
  explanation: string;
  severity?: SeverityLevel;
}

export interface DataAgentUploadResponse {
  id: string;
  status: AgentStatus;
  metadata?: AgentMetadata;
  file_type_description?: string;
}

export interface DataAgentStatusResponse {
  id: string;
  status: AgentStatus;
  raw_parsed_data?: any[];
  ai_summary?: AISummary;
  error?: string;
}

export interface IntentAnalysis {
  primary: string;
  confidence: number;
  secondary?: string[];
}

export interface IntentAgentResponse {
  success: boolean;
  prompt: string;
  analysis: {
    intent: IntentAnalysis;
    ambiguityScore: number;
    suggestedClarifications: string[];
    contextualFactors?: string[];
  };
  timestamp: string;
}

export interface AnalysisResult {
  vulnerabilities: Vulnerability[];
  overallConfidence: number;
  summary: string;
  recommendations: string[];
}

export interface Vulnerability {
  type: string;
  severity: SeverityLevel;
  line?: number;
  snippet: string;
  description: string;
  cwe?: string;
  remediation?: string;
}

export interface ReportData {
  scan_id: string;
  timestamp: string;
  sources: {
    dataAgent?: DataAgentStatusResponse;
    intentAgent?: IntentAgentResponse;
    analysisAgent?: AnalysisResult;
  };
  summary: {
    total_issues: number;
    critical_count: number;
    high_count: number;
    medium_count: number;
    low_count: number;
    threat_score: number;
  };
  recommendations: string[];
}

export interface AgentWindowData {
  id: string;
  title: string;
  status: AgentStatus;
  metadata?: AgentMetadata;
  aiSummary?: AISummary;
  rawParsedData?: any;
  analysis?: AnalysisResult;
  intentAnalysis?: IntentAgentResponse;
  error?: string;
  lastUpdated?: string;
  provenance?: string;
}
