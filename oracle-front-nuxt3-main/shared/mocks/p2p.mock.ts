import type { Coin } from "~/entities/p2p/model/coins";
import type { Fiat } from "~/entities/p2p/model/fiat";
import type { PaymentType } from "~/entities/p2p/model/paymentType";
import type { Deadline } from "~/entities/p2p/model/deadline";

export const MOCK_COINS: Coin[] = [
  { id: 1, icon: "/svg/litecoin-ltc.svg", title: "Litecoin", value: "LTC", price: 1000.4, cardNumber: "4342", amount: "0,0244 TON" },
  { id: 2, icon: "/svg/bitcoin.svg", title: "XRP", value: "XRP", price: 1000.4, cardNumber: "4342", amount: "0,0244 TON" },
  { id: 3, icon: "/svg/bitcoin.svg", title: "Bitcoin", value: "BTC", price: 1000.4, cardNumber: "4342", amount: "0,0244 TON" },
  { id: 4, icon: "/svg/bitcoin.svg", title: "Etherium", value: "ETH", price: 1000.4, cardNumber: "4342", amount: "0,0244 TON" },
  { id: 5, icon: "/svg/tether-usdt.svg", title: "USDT", value: "USDT", price: 1000.4, cardNumber: "4342", amount: "0,0244 TON" },
  { id: 6, icon: "/svg/tether-usdt.svg", title: "BNB", value: "BNB", price: 1000.4, cardNumber: "4342", amount: "0,0244 TON" },
];

export const MOCK_FIAT: Fiat[] = [
  { id: 1, title: "USD", value: "USD" },
  { id: 2, title: "EUR", value: "EUR" },
  { id: 3, title: "RUB", value: "RUB" },
  { id: 4, title: "UAH", value: "UAH" },
  { id: 5, title: "KZT", value: "KZT" },
];

export const MOCK_PAYMENT_TYPES: PaymentType[] = [
  { value: "card", title: "Card", name: "Nikita", surname: "Chizhik", currency: "USD", cardNumber: "1234567890" },
  { value: "bank", title: "Bank", name: "Alex", surname: "Kuznetsov", currency: "RUB", cardNumber: "1234567890" },
  { value: "crypto", title: "Crypto", name: "Dmitriy", surname: "Komarov", currency: "RUB", cardNumber: "1234567890" },
  { value: "visa", title: "Visa", name: "Zhanna", surname: "Kovalenko", currency: "KZT", cardNumber: "1234567890" },
  { value: "mastercard", title: "Mastercard", name: "Oleg", surname: "Olegov", currency: "TMT", cardNumber: "1234567890" },
];

export const MOCK_DEADLINES: Deadline[] = [
  { title: "15 minutes", value: "15" },
  { title: "30 minutes", value: "30" },
  { title: "45 minutes", value: "45" },
  { title: "60 minutes", value: "60" },
  { title: "90 minutes", value: "90" },
  { title: "120 minutes", value: "120" },
  { title: "180 minutes", value: "180" },
  { title: "240 minutes", value: "240" },
];

