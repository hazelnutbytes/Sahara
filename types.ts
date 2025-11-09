import type { ComponentType } from 'react';

export enum Tab {
  Emergency = 'Emergency',
  Map = 'Map',
  Restart = 'Restart',
  Voice = 'Voice',
  Contribute = 'Contribute',
}

export enum LocationType {
  Shelter = 'Shelter',
  Hospital = 'Hospital',
  Kitchen = 'Kitchen',
  NGO = 'NGO',
}

export interface SafetyLocation {
  id: number;
  name: string;
  type: LocationType;
  description: string;
  contact: string;
  verified: boolean;
  status: 'Open' | 'Full' | 'Emergency Only';
  position: { top: string; left: string };
}

export interface JobPosting {
  id: number;
  title: string;
  organization: string;
  description: string;
}

export interface TrainingModule {
  id: number;
  title: string;
  category: string;
  icon: ComponentType<{ className?: string }>;
}

export interface Story {
  id: number;
  author: string;
  content: string;
  replies: StoryReply[];
}

export interface StoryReply {
  id: number;
  author: string;
  isMentor: boolean;
  content: string;
}

export enum RiskLevel {
    High = 'High',
    Medium = 'Medium',
    Low = 'Low',
    None = 'None'
}

export interface RiskAnalysisResult {
    riskLevel: RiskLevel;
    summary: string;
}

export interface DonationOption {
    id: number;
    title: string;
    description: string;
    amount: number;
}

export interface VolunteerOpportunity {
    id: number;
    title: string;
    description: string;
    skills: string[];
}

export interface AnonymousReport {
    id: number;
    position: { top: string; left: string };
}
