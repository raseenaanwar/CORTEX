
export enum RiskLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export interface TemporalMarker {
  timestamp: string;
  event: string;
  type: 'HISTORICAL' | 'ANOMALY' | 'CURRENT';
  description: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface CausalNode {
  step: string;
  evidenceSource: string;
  logicType: 'CAUSAL' | 'CORRELATION';
  confidenceImpact: number;
  description: string;
}

export interface AgentFindings {
  agentName: string;
  confidence: number;
  reasoning: string;
  status: 'SAFE' | 'SUSPICIOUS' | 'FRAUD';
  score: number;
  evidenceTags: string[];
}

export interface ComplianceMetadata {
  gdprStatus: 'COMPLIANT_MASKED' | 'EXEMPT_ANONYMIZED';
  regulatoryJustification: string;
  dataRetentionPeriod: string;
  jurisdiction: string;
}

export interface ForensicsExport {
  checksum: string;
  generatedAt: string;
  causalLogicHash: string;
  auditTrail: string[];
}

export interface AnalysisReport {
  transactionId: string;
  overallScore: number;
  riskLevel: RiskLevel;
  verdict: 'APPROVE' | 'REJECT' | 'MANUAL_REVIEW';
  summary: string;
  agentReports: AgentFindings[];
  causalPath: string[]; 
  causalChain?: CausalNode[]; 
  temporalTimeline?: TemporalMarker[];
  uncertaintyFactor: number;
  compliance?: ComplianceMetadata;
  forensics?: ForensicsExport;
}

export interface Transaction {
  id: string;
  timestamp: string;
  amount: number;
  currency: string;
  merchant: string;
  location: string;
  userId: string;
  ipAddress: string;
  deviceFingerprint: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'FLAGGED';
  riskScore: number;
  domain?: 'FINANCE' | 'TRADING' | 'MARKETPLACE' | 'COMPLIANCE';
  scenarioType?: string;
}

export interface DemoScenario {
  id: string;
  name: string;
  description: string;
  triggerEvent: Partial<Transaction>;
  expectedOutcome: string;
  intelligenceFocus: string;
  icon: string;
}

export interface SystemStats {
  totalAnalyzed: number;
  threatsPrevented: number;
  avgConfidence: number;
  activeAgents: number;
}
