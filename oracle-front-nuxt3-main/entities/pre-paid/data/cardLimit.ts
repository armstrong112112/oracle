export interface CardLimit {
  value: number;
  label: string;
  selected: boolean;
}

export const cardLimits: CardLimit[] = [
  { value: 1000, label: '$1000', selected: true },
  { value: 1500, label: '$1500', selected: false },
  { value: 2000, label: '$2000', selected: false },
  { value: 3000, label: '$3000', selected: false },
  { value: 4000, label: '$4000', selected: false },
  { value: 5000, label: '$5000', selected: false },
  { value: 10000, label: '$10 000', selected: false },
  { value: 15000, label: '$15 000', selected: false },
  { value: 20000, label: '$20 000', selected: false },
  { value: 30000, label: '$30 000', selected: false },
  { value: 40000, label: '$40 000', selected: false },
  { value: 50000, label: '$50 000', selected: false },
];

export interface CardType {
  name: string;
  selected: boolean;
}

export const cardTypes: CardType[] = [
  { name: 'VISA', selected: false },
  { name: 'MasterCard', selected: false },
  { name: 'AMEX', selected: false },
];
