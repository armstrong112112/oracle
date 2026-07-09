interface ChildrenType {
  id: number;
  name: string;
  link: string;
}

export interface NavigationType {
  id: number;
  name: string;
  icons: string;
  link: string;
  dropdown: boolean;
  children: ChildrenType[];
}

export interface SideBarNavigationType {
  id: number;
  name: string;
  icons: string;
  link: string;
}

export const NavigationDto: NavigationType[] = [
  {
    id: 1,
    name: "Home",
    icons: "/svg/shop/icons/home.svg",
    link: "/",
    dropdown: false,
    children: [],
  },
  {
    id: 2,
    name: "Payments",
    link: "/oracle-pay",
    icons: "/svg/shop/icons/payments.svg",
    dropdown: false,
    children: [],
  },
  {
    id: 3,
    name: "Bills",
    link: "/bills",
    icons: "/svg/shop/icons/bill.svg",
    dropdown: false,
    children: [],
  },
  {
    id: 4,
    name: "Swap",
    link: "/swap",
    icons: "/svg/shop/icons/swap.svg",
    dropdown: false,
    children: [],
  },
  {
    id: 5,
    name: "Escrow",
    link: "/escrow/overview",
    icons: "/svg/shop/icons/deal.svg",
    dropdown: false,
    children: [],
  },
  {
    id: 6,
    name: "Mixing",
    link: "/mixing",
    icons: "/svg/shop/icons/mixing.svg",
    dropdown: false,
    children: [],
  },
  {
    id: 7,
    name: "Checks",
    link: "/checks",
    icons: "/svg/shop/icons/check.svg",
    dropdown: false,
    children: [],
  },
  {
    id: 8,
    name: "Prepaid Cards",
    link: "/prepaid-cards",
    icons: "/svg/shop/icons/card.svg",
    dropdown: false,
    children: [],
  },
  {
    id: 9,
    name: "WhiteList",
    link: "#",
    dropdown: true,
    icons: "/svg/shop/icons/whitelist.svg",
    children: [
      { id: 9, name: "All", link: "/whitelist" },
      { id: 9, name: "Create", link: "/whitelist/creation" },
    ],
  },
  {
    id: 10,
    name: "P2P",
    link: "#",
    dropdown: true,
    icons: "/svg/shop/icons/p2p.svg",
    children: [
      { id: 10, name: "All", link: "/p2p" },
      { id: 10, name: "Create", link: "/p2p/dispute/creation" },
      { id: 10, name: "Orders", link: "/p2p/orders" },
    ],
  },
  {
    id: 11,
    name: "Shops",
    link: "/shops",
    icons: "/svg/shop/icons/shop.svg",
    dropdown: false,
    children: [],
  },
  {
    id: 11,
    name: "Oracle Site",
    link: "/landing",
    icons: "/svg/shop/icons/home.svg",
    dropdown: false,
    children: [],
  },
  {
    id: 12,
    name: "Casino",
    link: "/casino",
    icons: "/svg/shop/icons/home.svg",
    dropdown: false,
    children: [],
  },
];

export const SettingsNavigation: SideBarNavigationType[] = [
  // {
  //   id: 1,
  //   name: 'Shop Orders',
  //   link: 'shop-orders',
  //   icons: '/svg/shop/icons/Orders.svg',
  // },
  {
    id: 2,
    name: "Staff",
    link: "staff",
    icons: "/svg/shop/icons/Staff.svg",
  },
  {
    id: 3,
    name: "Products",
    link: "products",
    icons: "/svg/shop/icons/Inventory.svg",
  },
  {
    id: 4,
    name: "Favorites",
    link: "favorites",
    icons: "/svg/shop/icons/Favorites.svg",
  },
  {
    id: 5,
    name: "Promo Codes and Bonuses",
    link: "promo-codes",
    icons: "/svg/shop/icons/Administrators.svg",
  },
];

export const ContactNavigation: SideBarNavigationType[] = [
  {
    id: 1,
    name: "Telegram",
    link: "https://web.telegram.org",
    icons: "/svg/shop/icons/telegram.svg",
  },
  {
    id: 2,
    name: "Signal",
    link: "https://signal.org",
    icons: "/svg/shop/icons/Signal.svg",
  },
  {
    id: 3,
    name: "WhatsApp",
    link: "https://www.whatsapp.com",
    icons: "/svg/shop/icons/WhatsApp.svg",
  },
  {
    id: 4,
    name: "SimpleX",
    link: "https://www.simplex.com",
    icons: "/svg/shop/icons/SimpleX.svg",
  },
];
