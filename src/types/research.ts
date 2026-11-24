export enum ResearchView {
  Journal = 'journal',
  Programs = 'programs',
  LabsAndIP = 'labs-and-ip',
}

export enum ResearchDivision {
  All = 'All',
  Nanophotonics = 'Nanophotonics',
  CryoMechatronics = 'Cryo-Mechatronics',
  Metamaterials = 'Metamaterials',
}

export enum ProgramStatus {
  Nominal = 'Nominal',
  Calibration = 'Calibration',
  Validation = 'Validation',
}

export interface ResearchProgram {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  publishedDate: string;
  readTime: string;
  division: Exclude<ResearchDivision, ResearchDivision.All>;
  facility: 'Eindhoven Brainport' | 'Delft Optics Annex';
  leadInvestigator: string;
  trl: number;
  budgetEurM: number;
  targetQuarter: string;
  status: ProgramStatus;
  precisionMetric: string;
  precisionUnit: string;
  summary: string;
  essayParagraphs: string[];
  methodology: string;
  imageUrl: string;
  imageAlt: string;
  figureCaption: string;
  hasInteractiveWaveFigure?: boolean;
  milestones: {
    phase: string;
    deliverable: string;
    completion: number;
  }[];
}

export interface PatentRecord {
  id: string;
  filingNumber: string;
  title: string;
  authors: string;
  division: Exclude<ResearchDivision, ResearchDivision.All>;
  jurisdiction: 'EPO (European)' | 'NL Octrooicentrum' | 'WIPO PCT';
  status: 'Granted' | 'PCT Published' | 'Peer Review';
  filingDate: string;
  abstract: string;
  claimsCount: number;
  citationKey: string;
}

export interface FacilitySpec {
  id: string;
  city: string;
  campusName: string;
  cleanroomClass: string;
  floorAreaSqm: number;
  vibrationFloor: string;
  thermalStability: string;
  activeBenches: number;
  imageUrl: string;
  imageAlt: string;
  description: string;
  capabilities: string[];
}

export interface SubstratePreset {
  id: string;
  name: string;
  refractiveIndex: number;
  thermalCoefficient: number;
  attenuationBase: number;
  description: string;
}
