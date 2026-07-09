export interface CardData {
  cardNumber: string;
  cardHolderName: string;
  expiryDate: string;
  cvc: string;
  cardType: "default" | "premium" | "vip";
  balance?: CardBalance;
}

export interface CardBalance {
  amount: number;
  currency: string;
  changePercent: number;
  changeDirection: "up" | "down";
}

export interface CardStyle {
  transform?: string;
  zIndex?: number;
  marginLeft?: string;
  marginRight?: string;
  opacity?: number;
  display?: string;
}
