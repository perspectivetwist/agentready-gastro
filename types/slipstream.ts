// Slipstream API Response Types

export interface Finding {
  criterion: string
  passed: boolean
  businessImpact: string
  fix: string
}

export interface DimensionScore {
  id: string
  name: string
  score: number
  weight: number
  findings: Finding[]
}

export interface ScoreBandInfo {
  band: 'critical' | 'needs-work' | 'good' | 'agent-ready'
  label: string
  headline: string
  message: string
  color: string
}

export interface ActionItem {
  dimension: string
  priority: 'high' | 'medium' | 'low'
  action: string
  effort: string
  businessImpact: string
}

export interface ActionPlan {
  summary: string
  industry: string
  actions: ActionItem[]
}

export interface KiSummary {
  sichtbarkeit: string
  nutzbarkeit: string
  sicherheit: string
}

export interface SlipstreamResult {
  url: string
  totalScore: number
  scoreBand: string
  scoreBandInfo: ScoreBandInfo
  dimensions: DimensionScore[]
  industry: string
  actionPlan?: ActionPlan
  kiSummary?: KiSummary
  scannedAt: string
}
