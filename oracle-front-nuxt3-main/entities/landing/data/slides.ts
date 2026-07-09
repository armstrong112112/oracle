export interface SlideType {
  title: string
  image: string
  description: string
}

export const LandingSlides: SlideType[] = [
  {
    title: 'Escrow',
    image: '/images/slides/1.png',
    description:
      'Oracle Escrow hooks you up with bank-level security and a slick fintech interface—keeping every deal in one smooth, foolproof flow, packed with clever tweaks and pro dispute handling, and leaving every Telegram escrow bot out there light-years behind.',
  },
  {
    title: 'P2P',
    image: '/images/slides/2.png',
    description: `
    Tired of niggas exit-scamming for your CashApp2BTC swaps? Meet Oracle P2P Market—your scam-proof way to flip crypto and fiat, in the US or overseas.

Trade exclusively with verified vendors, get crystal-clear instructions, and count on rapid dispute resolution. Protect your money and your privacy with every exchange.
    `,
  },
  {
    title: 'TRANSFERS',
    image: '/images/slides/3.png',
    description: `
 Are high crypto fees killing you? Sick of Coinbase putting your withdrawals on hold?
Try Oracle Transfers—the blockchain fee-free, off-chain highway for crypto. Buy coins from verified vendors on Oracle P2P, then move them instantly with Oracle Transfers. No fees, no lags, no surprise freezes—just total control and zero blockchain trace.
    `,
  },
  {
    title: 'BILLS',
    image: '/images/slides/4.png',
    description:
      'Spin up crypto invoices in seconds—create, share, and get paid via link or QR code, with real-time tracking on every transaction. Stop losing customers to payment issues.',
  },
  {
    title: 'PAYMENTS',
    image: '/images/slides/5.png',
    description:
      'Track balances, manage assets, and watch your portfolio in real time. Instantly swap, send, or deposit funds—all from one intuitive dashboard. Full control and crystal-clear transparency for every transaction, across all your wallets.',
  },
]
