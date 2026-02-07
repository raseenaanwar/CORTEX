
import { Transaction, DemoScenario } from './types';

export const DEMO_SCENARIOS: DemoScenario[] = [
  {
    id: 'SOLO_FRAUD',
    name: 'Solo Opportunist',
    description: 'A single actor using a leaked card with impossible travel markers.',
    icon: '👤',
    intelligenceFocus: 'Temporal Anomaly & Behavioral Drift',
    expectedOutcome: 'REJECT',
    triggerEvent: {
      amount: 4200,
      merchant: 'HIGH_END_JEWELRY_LON',
      location: 'London, UK',
      domain: 'MARKETPLACE',
      ipAddress: '194.22.11.5',
      deviceFingerprint: 'dfp_mac_new_session'
    }
  },
  {
    id: 'FRAUD_RING',
    name: 'Syndicate Swarm',
    description: 'Coordinated micro-transfers across 5 linked accounts.',
    icon: '🤝',
    intelligenceFocus: 'Entity Linking & Velocity Analysis',
    expectedOutcome: 'REJECT',
    triggerEvent: {
      amount: 15.50,
      merchant: 'DUSTING_SERVICE_LP',
      location: 'Unknown',
      domain: 'FINANCE',
      ipAddress: '103.44.21.90',
      deviceFingerprint: 'dfp_emulated_android'
    }
  },
  {
    id: 'AFFILIATE_NET',
    name: 'Affiliate Network',
    description: 'Complex multi-layered mule network with proxy obfuscation.',
    icon: '🌐',
    intelligenceFocus: 'Cross-Domain Graph Topology',
    expectedOutcome: 'REJECT',
    triggerEvent: {
      amount: 25000,
      merchant: 'OFFSHORE_CRYPTO_V3',
      location: 'Cayman Islands',
      domain: 'TRADING',
      ipAddress: 'proxy_exit_node_77',
      deviceFingerprint: 'dfp_linux_server_node'
    }
  },
  {
    id: 'FALSE_POSITIVE',
    name: 'The Whale (Legit)',
    description: 'High-value legitimate user on vacation with bio-sync verification.',
    icon: '🐋',
    intelligenceFocus: 'Positive Identity Reinforcement',
    expectedOutcome: 'APPROVE',
    triggerEvent: {
      amount: 12000,
      merchant: 'RITZ_CARLTON_PARIS',
      location: 'Paris, France',
      domain: 'FINANCE',
      ipAddress: 'hotel_guest_wifi_01',
      deviceFingerprint: 'dfp_usual_iphone_15'
    }
  }
];

// Current date set to 2026 for simulation
const now2026 = new Date('2026-05-15T14:30:00Z');

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 'TXN-9821-XP',
    timestamp: now2026.toISOString(),
    amount: 14200.50,
    currency: 'USD',
    merchant: 'LUXE_ELECTRONICS_HK',
    location: 'Hong Kong, HK',
    userId: 'USR-8822',
    ipAddress: '182.23.11.94',
    deviceFingerprint: 'dfp_90123_macos',
    status: 'PENDING',
    riskScore: 0.82,
    domain: 'MARKETPLACE'
  },
  {
    id: 'TXN-7741-BA',
    timestamp: new Date(now2026.getTime() - 500000).toISOString(),
    amount: 45.20,
    currency: 'USD',
    merchant: 'STARBUCKS_SEA',
    location: 'Seattle, WA',
    userId: 'USR-1102',
    ipAddress: '72.14.23.1',
    deviceFingerprint: 'dfp_44211_iphone',
    status: 'APPROVED',
    riskScore: 0.04,
    domain: 'FINANCE'
  },
  {
    id: 'TXN-3102-SIM',
    timestamp: new Date(now2026.getTime() - 1200000).toISOString(),
    amount: 1501.00,
    currency: 'USD',
    merchant: 'GLOBAL_TRANSFER_X',
    location: 'Unknown, Cloud',
    userId: 'USR-9012',
    ipAddress: '45.112.92.11',
    deviceFingerprint: 'dfp_simulated_981',
    status: 'FLAGGED',
    riskScore: 0.50,
    domain: 'TRADING'
  }
];
