
export interface MixingItem {
  id: string;
  createdAt: string;
  finishedAt?: string;
  amountLTC: number;
  amountUSD: number;
  status: 'active' | 'completed';
}

export const mixingData: MixingItem[] = [
  {
    id: '3213218398213',
    createdAt: '2025-01-01T23:12:00Z',
    amountLTC: 0.0244,
    amountUSD: 100.234,
    status: 'active',
  },
  {
    id: '3213218398213',
    createdAt: '2025-01-01T23:12:00Z',
    finishedAt: '2025-01-01T23:12:00Z',
    amountLTC: 0.0244,
    amountUSD: 100.234,
    status: 'completed',
  },
  {
    id: '3213218398213',
    createdAt: '2025-01-01T23:12:00Z',
    amountLTC: 0.0244,
    amountUSD: 100.234,
    status: 'active',
  },
  {
    id: '3213218398213',
    createdAt: '2025-01-01T23:12:00Z',
    finishedAt: '2025-01-01T23:12:00Z',
    amountLTC: 0.0244,
    amountUSD: 100.234,
    status: 'completed',
  },
  {
    id: '3213218398213',
    createdAt: '2025-01-01T23:12:00Z',
    amountLTC: 0.0244,
    amountUSD: 100.234,
    status: 'active',
  },
  {
    id: '3213218398213',
    createdAt: '2025-01-01T23:12:00Z',
    finishedAt: '2025-01-01T23:12:00Z',
    amountLTC: 0.0244,
    amountUSD: 100.234,
    status: 'completed',
  },

];
