import type {
  CheckBoxType,
  CompilationDataType,
  FilesDataType,
  MockDefaultUserType,
  NavigationType,
  ProductDataCategoryType,
  ProductDataType,
  ProductSlidesType,
  PromoCodesType,
  ResultsCategoryType,
  SearchDataType,
  SideBarNavigationType,
  StaffType,
  YourOrdersType,
} from "@/shared/types/shops";

export const ProductSlidesData: ProductSlidesType[] = [
  {
    id: 1,
    image: "/svg/shop/images/Container.png",
  },
  {
    id: 2,
    image: "/svg/shop/images/Container.png",
  },
  {
    id: 3,
    image: "/svg/shop/images/Container.png",
  },
  {
    id: 4,
    image: "/svg/shop/images/Container.png",
  },
];

export const ProductPageSlidesData: ProductSlidesType[] = [
  {
    id: 1,
    image: "/svg/shop/images/ProductDetail.png",
  },
  {
    id: 2,
    image: "/svg/shop/images/ProductDetail.png",
  },
  {
    id: 3,
    image: "/svg/shop/images/ProductDetail.png",
  },
  {
    id: 4,
    image: "/svg/shop/images/ProductDetail.png",
  },
];

export const ProductsData: ProductDataType[] = [
  {
    id: 1,
    isOutStock: false,
    hasContact: false,
    contact: [
      {
        id: 1,
        name: "Telegram",
        icon: "/svg/shop/icons/telegram.svg",
        link: "https://example.com/",
      },
      {
        id: 2,
        name: "Phone 1",
        icon: "/svg/shop/icons/phone.svg",
        link: "https://example.com/",
      },
      {
        id: 3,
        name: "Phone 2",
        icon: "/svg/shop/icons/phone.svg",
        link: "https://example.com/",
      },
    ],
    listings: 1,
    discount: 1990,
    rating: 4.5,
    reviews: 100,
    views: 120,
    date: "Yesterday,6:16 PM",
    shopName: "@UserUser",
    isVerified: false,
    image: ProductSlidesData,
    name: "Name of the service or product",
    category: "category 0",
    itemLeft: 1,
    price: 2_990,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type tandard dummy text ever since the 1500s, when an unknown printer took a galley of type",
  },
  {
    id: 2,
    listings: 1,
    isOutStock: true,
    hasContact: false,
    contact: [
      {
        id: 1,
        name: "Telegram",
        icon: "/svg/shop/icons/telegram.svg",
        link: "https://example.com/",
      },
      {
        id: 2,
        name: "Phone 1",
        icon: "/svg/shop/icons/phone.svg",
        link: "https://example.com/",
      },
      {
        id: 3,
        name: "Phone 2",
        icon: "/svg/shop/icons/phone.svg",
        link: "https://example.com/",
      },
    ],
    discount: 1050,
    rating: 4.5,
    reviews: 100,
    views: 120,
    date: "Yesterday,6:16 PM",
    isVerified: true,
    shopName: "@UserUser",
    image: ProductSlidesData,
    name: "Hat",
    category: "category 1",
    itemLeft: 2,
    price: 1_450,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type tandard dummy text ever since the 1500s, when an unknown printer took a galley of type",
  },
  {
    id: 3,
    listings: 1,
    isOutStock: false,
    hasContact: true,
    contact: [
      {
        id: 1,
        name: "Telegram",
        icon: "/svg/shop/icons/telegram.svg",
        link: "https://example.com/",
      },
      {
        id: 2,
        name: "Phone 1",
        icon: "/svg/shop/icons/phone.svg",
        link: "https://example.com/",
      },
      {
        id: 3,
        name: "Phone 2",
        icon: "/svg/shop/icons/phone.svg",
        link: "https://example.com/",
      },
    ],
    discount: 1050,
    rating: 4.5,
    reviews: 100,
    views: 120,
    date: "Yesterday,6:16 PM",
    isVerified: true,
    shopName: "@UserUser",
    image: ProductSlidesData,
    name: "Shoe",
    category: "category 2",
    itemLeft: 3,
    price: 3_100,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type tandard dummy text ever since the 1500s, when an unknown printer took a galley of type",
  },
  {
    id: 4,
    listings: 1,
    isOutStock: false,
    hasContact: false,
    contact: [
      {
        id: 1,
        name: "Telegram",
        icon: "/svg/shop/icons/telegram.svg",
        link: "https://example.com/",
      },
      {
        id: 2,
        name: "Phone 1",
        icon: "/svg/shop/icons/phone.svg",
        link: "https://example.com/",
      },
      {
        id: 3,
        name: "Phone 2",
        icon: "/svg/shop/icons/phone.svg",
        link: "https://example.com/",
      },
    ],
    discount: 1050,
    rating: 4.5,
    reviews: 100,
    views: 120,
    date: "Yesterday,6:16 PM",
    isVerified: true,
    shopName: "@UserUser",
    image: ProductSlidesData,
    name: "Pen",
    category: "category 3",
    itemLeft: 4,
    price: 850,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type tandard dummy text ever since the 1500s, when an unknown printer took a galley of type",
  },
  {
    id: 5,
    listings: 1,
    isOutStock: false,
    hasContact: false,
    contact: [
      {
        id: 1,
        name: "Telegram",
        icon: "/svg/shop/icons/telegram.svg",
        link: "https://example.com/",
      },
      {
        id: 2,
        name: "Phone 1",
        icon: "/svg/shop/icons/phone.svg",
        link: "https://example.com/",
      },
      {
        id: 3,
        name: "Phone 2",
        icon: "/svg/shop/icons/phone.svg",
        link: "https://example.com/",
      },
    ],
    discount: 1050,
    rating: 4.5,
    reviews: 100,
    views: 120,
    date: "Yesterday,6:16 PM",
    isVerified: true,
    shopName: "@UserUser",
    image: ProductSlidesData,
    name: "Lamp",
    category: "category 4",
    itemLeft: 5,
    price: 4_200,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type tandard dummy text ever since the 1500s, when an unknown printer took a galley of type",
  },
  {
    id: 6,
    listings: 1,
    isOutStock: false,
    hasContact: false,
    contact: [
      {
        id: 1,
        name: "Telegram",
        icon: "/svg/shop/icons/telegram.svg",
        link: "https://example.com/",
      },
      {
        id: 2,
        name: "Phone 1",
        icon: "/svg/shop/icons/phone.svg",
        link: "https://example.com/",
      },
      {
        id: 3,
        name: "Phone 2",
        icon: "/svg/shop/icons/phone.svg",
        link: "https://example.com/",
      },
    ],
    discount: 1050,
    rating: 4.5,
    reviews: 100,
    views: 120,
    date: "Yesterday,6:16 PM",
    isVerified: true,
    shopName: "@UserUser",
    image: ProductSlidesData,
    name: "Cup",
    category: "category 5",
    itemLeft: 6,
    price: 1_990,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type tandard dummy text ever since the 1500s, when an unknown printer took a galley of type",
  },
  {
    id: 7,
    shopName: "@UserUser",
    listings: 1,
    isOutStock: false,
    hasContact: false,
    contact: [
      {
        id: 1,
        name: "Telegram",
        icon: "/svg/shop/icons/telegram.svg",
        link: "https://example.com/",
      },
      {
        id: 2,
        name: "Phone 1",
        icon: "/svg/shop/icons/phone.svg",
        link: "https://example.com/",
      },
      {
        id: 3,
        name: "Phone 2",
        icon: "/svg/shop/icons/phone.svg",
        link: "https://example.com/",
      },
    ],
    discount: 1050,
    rating: 4.5,
    reviews: 100,
    views: 120,
    date: "Yesterday,6:16 PM",
    isVerified: true,
    image: ProductSlidesData,
    name: "Book",
    category: "category 6",
    itemLeft: 7,
    price: 2_100,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type tandard dummy text ever since the 1500s, when an unknown printer took a galley of type",
  },
  {
    id: 8,
    shopName: "@UserUser",
    listings: 1,
    isOutStock: false,
    hasContact: false,
    contact: [
      {
        id: 1,
        name: "Telegram",
        icon: "/svg/shop/icons/telegram.svg",
        link: "https://example.com/",
      },
      {
        id: 2,
        name: "Phone 1",
        icon: "/svg/shop/icons/phone.svg",
        link: "https://example.com/",
      },
      {
        id: 3,
        name: "Phone 2",
        icon: "/svg/shop/icons/phone.svg",
        link: "https://example.com/",
      },
    ],
    discount: 1050,
    rating: 4.5,
    reviews: 100,
    views: 120,
    date: "Yesterday,6:16 PM",
    isVerified: true,
    image: ProductSlidesData,
    name: "Ball",
    category: "category 7",
    itemLeft: 8,
    price: 1_600,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type tandard dummy text ever since the 1500s, when an unknown printer took a galley of type",
  },
  {
    id: 9,
    shopName: "@UserUser",
    listings: 1,
    isOutStock: false,
    hasContact: false,
    contact: [
      {
        id: 1,
        name: "Telegram",
        icon: "/svg/shop/icons/telegram.svg",
        link: "https://example.com/",
      },
      {
        id: 2,
        name: "Phone 1",
        icon: "/svg/shop/icons/phone.svg",
        link: "https://example.com/",
      },
      {
        id: 3,
        name: "Phone 2",
        icon: "/svg/shop/icons/phone.svg",
        link: "https://example.com/",
      },
    ],
    discount: 1050,
    rating: 4.5,
    reviews: 100,
    views: 120,
    date: "Yesterday,6:16 PM",
    isVerified: true,
    image: ProductSlidesData,
    name: "Watch",
    category: "category 8",
    itemLeft: 9,
    price: 5_750,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type tandard dummy text ever since the 1500s, when an unknown printer took a galley of type",
  },
  {
    id: 10,
    shopName: "@UserUser",
    listings: 1,
    isOutStock: false,
    hasContact: false,
    contact: [
      {
        id: 1,
        name: "Telegram",
        icon: "/svg/shop/icons/telegram.svg",
        link: "https://example.com/",
      },
      {
        id: 2,
        name: "Phone 1",
        icon: "/svg/shop/icons/phone.svg",
        link: "https://example.com/",
      },
      {
        id: 3,
        name: "Phone 2",
        icon: "/svg/shop/icons/phone.svg",
        link: "https://example.com/",
      },
    ],
    discount: 1050,
    rating: 4.5,
    reviews: 100,
    views: 120,
    date: "Yesterday,6:16 PM",
    isVerified: true,
    image: ProductSlidesData,
    name: "Fan",
    category: "category 9",
    itemLeft: 10,
    price: 3_500,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type tandard dummy text ever since the 1500s, when an unknown printer took a galley of type",
  },
  {
    id: 11,
    shopName: "@UserUser",
    listings: 1,
    isOutStock: false,
    hasContact: false,
    contact: [
      {
        id: 1,
        name: "Telegram",
        icon: "/svg/shop/icons/telegram.svg",
        link: "https://example.com/",
      },
      {
        id: 2,
        name: "Phone 1",
        icon: "/svg/shop/icons/phone.svg",
        link: "https://example.com/",
      },
      {
        id: 3,
        name: "Phone 2",
        icon: "/svg/shop/icons/phone.svg",
        link: "https://example.com/",
      },
    ],
    discount: 1050,
    rating: 4.5,
    reviews: 100,
    views: 120,
    date: "Yesterday,6:16 PM",
    isVerified: true,
    image: ProductSlidesData,
    name: "Ring",
    category: "category 10",
    itemLeft: 11,
    price: 2_800,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type tandard dummy text ever since the 1500s, when an unknown printer took a galley of type",
  },
  {
    id: 12,
    shopName: "@UserUser",
    listings: 1,
    isOutStock: false,
    hasContact: false,
    contact: [
      {
        id: 1,
        name: "Telegram",
        icon: "/svg/shop/icons/telegram.svg",
        link: "https://example.com/",
      },
      {
        id: 2,
        name: "Phone 1",
        icon: "/svg/shop/icons/phone.svg",
        link: "https://example.com/",
      },
      {
        id: 3,
        name: "Phone 2",
        icon: "/svg/shop/icons/phone.svg",
        link: "https://example.com/",
      },
    ],
    discount: 1050,
    rating: 4.5,
    reviews: 100,
    views: 120,
    date: "Yesterday,6:16 PM",
    isVerified: true,
    image: ProductSlidesData,
    name: "Chair",
    category: "category 11",
    itemLeft: 12,
    price: 3_999,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type tandard dummy text ever since the 1500s, when an unknown printer took a galley of type",
  },
];

export const ProductResultData: ProductSlidesType[] = [
  {
    id: 1,
    image: "/svg/shop/images/container-large.png",
  },
  {
    id: 2,
    image: "/svg/shop/images/container-large.png",
  },
  {
    id: 3,
    image: "/svg/shop/images/container-large.png",
  },
  {
    id: 4,
    image: "/svg/shop/images/container-large.png",
  },
];

export const categoryButtons: string[] = [
  "Marketing",
  "Digital Accounts",
  "Business",
  "Services",
  "Electronics",
  "Services",
  "Subscription",
  "Course",
  "Software",
  "App",
  "E-book",
  "Template",
];

export const Sorting: CheckBoxType[] = [
  { id: 1, headingA: "", headingB: "Default" },
  { id: 2, headingA: "", headingB: "By price(more expensive)" },
  { id: 3, headingA: "", headingB: "By price(cheaper)" },
  { id: 4, headingA: "", headingB: "By seller's rating" },
  { id: 5, headingA: "", headingB: "By seller’s deals" },
  { id: 6, headingA: "", headingB: "By quantity" },
  { id: 7, headingA: "", headingB: "By date" },
  { id: 8, headingA: "", headingB: "Alphabetically" },
];

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
      { id: 9, name: "All", link: "/whitelist/all" },
      { id: 9, name: "Create", link: "/whitelist/create" },
    ],
  },
  {
    id: 10,
    name: "P2P",
    link: "#",
    dropdown: true,
    icons: "/svg/shop/icons/p2p.svg",
    children: [
      { id: 10, name: "All", link: "/whitelist/all" },
      { id: 10, name: "Create", link: "/whitelist/create" },
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
];

export const SettingsNavigation: SideBarNavigationType[] = [
  {
    id: 1,
    name: "Shop Orders",
    link: "your-orders",
    icons: "/svg/shop/icons/Orders.svg",
  },
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

export const SearchData: SearchDataType[] = [
  {
    id: 1,
    searches: "smth 1",
    category: "web",
  },
  {
    id: 2,
    searches: "smth 2",
    category: "web",
  },
  {
    id: 3,
    searches: "smth 3",
    category: "web",
  },
];

export const CompilationData: CompilationDataType[] = [
  {
    id: 1,
    compilation: "Name of the Compilation",
    listing: 1,
  },
  {
    id: 2,
    compilation: "smth 1",
    listing: 2,
  },
  {
    id: 3,
    compilation: "smth 2",
    listing: 3,
  },
];

export const ResultsCategory: ResultsCategoryType[] = [
  {
    id: 1,
    name: "Compilation",
  },
  {
    id: 2,
    name: "Performance",
  },
  {
    id: 3,
    name: "Security",
  },
  {
    id: 4,
    name: "Code Quality",
  },
  {
    id: 5,
    name: "Testing",
  },
];

export const YourOrders: YourOrdersType[] = [
  {
    id: 1,
    date: "July 21, 2025",
    products: [
      {
        id: 1,
        image: "/svg/shop/images/cart-product.png",
        price: 1400,
        name: "Apple card 1000 руб, РУ регион, x2",
        shopName: "Store Name 1",
      },
      {
        id: 2,
        price: 2400,
        image: "/svg/shop/images/cart-product.png",
        name: "Apple card 1000 руб, РУ регион, x2",
        shopName: "Store Name 2",
      },
      {
        id: 3,
        price: 3400,
        image: "/svg/shop/images/cart-product.png",
        name: "Apple card 1000 руб, РУ регион, x2",
        shopName: "Store Name 3",
      },
    ],
  },
  {
    id: 2,
    date: "July 22, 2025",
    products: [
      {
        id: 1,
        price: 1400,
        image: "/svg/shop/images/cart-product.png",
        name: "Apple card 1000 руб, РУ регион, x2",
        shopName: "Store Name 1",
      },
    ],
  },
];

export const Staff: StaffType[] = [
  {
    id: 1,
    name: "Patricia Martin",
    nickname: "Nickname",
    image: "/svg/shop/images/settings-profile.png",
    permission: {
      shopName: false,
      shopBio: false,
      shopAvatar: false,
      staffSetting: false,
      addNewEmployee: false,
      sendMessage: false,
      deleteEmployee: false,
    },
  },
  {
    id: 2,
    name: "Michael Johnson",
    nickname: "Nickname",
    image: "/svg/shop/images/settings-profile.png",
    permission: {
      shopName: true,
      shopBio: false,
      shopAvatar: false,
      staffSetting: false,
      addNewEmployee: false,
      sendMessage: true,
      deleteEmployee: false,
    },
  },
  {
    id: 3,
    name: "Sophia Lee",
    nickname: "Nickname",
    image: "/svg/shop/images/settings-profile.png",
    permission: {
      shopName: true,
      shopBio: true,
      shopAvatar: false,
      staffSetting: true,
      addNewEmployee: false,
      sendMessage: true,
      deleteEmployee: false,
    },
  },
  {
    id: 4,
    name: "James Williams",
    nickname: "Nickname",
    image: "/svg/shop/images/settings-profile.png",
    permission: {
      shopName: false,
      shopBio: true,
      shopAvatar: true,
      staffSetting: false,
      addNewEmployee: true,
      sendMessage: true,
      deleteEmployee: false,
    },
  },
  {
    id: 5,
    name: "Emily Davis",
    nickname: "Nickname",
    image: "/svg/shop/images/settings-profile.png",
    permission: {
      shopName: true,
      shopBio: true,
      shopAvatar: true,
      staffSetting: true,
      addNewEmployee: true,
      sendMessage: true,
      deleteEmployee: true,
    },
  },
];

export const PromoCodesData: PromoCodesType[] = [
  {
    id: 1,
    promo: "WELCOME10",
    date: "2025-08-01",
    activationLeft: 1,
  },
  {
    id: 2,
    promo: "SUMMER25",
    date: "2025-08-05",
    activationLeft: null,
  },
  {
    id: 3,
    promo: "FALL30",
    date: "2025-08-10",
    activationLeft: 3,
  },
  {
    id: 4,
    promo: "WINTER15",
    date: "2025-08-15",
    activationLeft: 2,
  },
  {
    id: 5,
    promo: "SPRING5",
    date: "2025-08-20",
    activationLeft: null,
  },
];

export const MockDefaultUser: MockDefaultUserType = {
  id: 1,
  image: "/svg/shop/images/settings-profile.png",
  name: "@WestDev",
  bio: "this is west-dev",
  role: "seller",
};

export const ProductDataCategory: ProductDataCategoryType[] = [
  {
    id: 1,
    name: "All",
  },
  {
    id: 2,
    name: "Programming",
  },
  {
    id: 3,
    name: "Configure CRM",
  },
  {
    id: 4,
    name: "CRM",
  },
  {
    id: 5,
    name: "Gaming",
  },
];

export const productTypeOptions: string[] = [
  "Digital Product",
  "Physical Product",
  "Service",
  "Subscription",
  "Course",
  "Software",
  "App",
  "E-book",
  "Template",
  "Other",
];

export const categoryOptions: string[] = [
  "Technology",
  "Education",
  "Business",
  "Design",
  "Marketing",
  "Health & Fitness",
  "Entertainment",
  "Finance",
  "Productivity",
  "Lifestyle",
];

export const subcategoryOptions: string[] = [
  "Web Development",
  "Mobile Development",
  "Data Science",
  "Machine Learning",
  "UI/UX Design",
  "Digital Marketing",
  "Content Creation",
  "Project Management",
  "Analytics",
  "Automation",
];

export const platformOptions: string[] = [
  "Web",
  "iOS",
  "Android",
  "Desktop",
  "SaaS",
  "Marketplace",
  "Social Media",
  "E-commerce",
  "Mobile App",
  "API",
];

export const durationOptions: string[] = [
  "1 week",
  "2 week",
  "3 week",
  "4 week",
];

export const SelfRegisterCheckbox: CheckBoxType[] = [
  { id: 1, headingA: "", headingB: "Yes" },
  { id: 2, headingA: "", headingB: "No" },
];

export const Controlled: CheckBoxType[] = [
  { id: 1, headingA: "", headingB: "Yes" },
  { id: 2, headingA: "", headingB: "No" },
];

export const PlanCheckbox: CheckBoxType[] = [
  { id: 1, headingA: "Plan X", headingB: "$500" },
  { id: 2, headingA: "Plan N", headingB: "$500" },
  { id: 3, headingA: "Plan Y", headingB: "$500" },
  { id: 4, headingA: "Plan A", headingB: "$500" },
];

export const Terms: CheckBoxType[] = [
  {
    id: 1,
    headingA: "",
    headingB: "1 month",
  },
  {
    id: 2,
    headingA: "",
    headingB: "2 month",
  },
  {
    id: 3,
    headingA: "",
    headingB: "3 month",
  },
  {
    id: 4,
    headingA: "",
    headingB: "4 month",
  },
];

export const Regions: CheckBoxType[] = [
  {
    id: 1,
    headingA: "",
    headingB: "All Regions",
  },
  {
    id: 2,
    headingA: "",
    headingB: "US",
  },
  {
    id: 3,
    headingA: "",
    headingB: "EU",
  },
  {
    id: 4,
    headingA: "",
    headingB: "Asia",
  },
  {
    id: 5,
    headingA: "",
    headingB: "Japan",
  },
  {
    id: 6,
    headingA: "",
    headingB: "China",
  },
];

export const Filter: CheckBoxType[] = [
  { id: 1, headingA: "", headingB: "Default" },
  { id: 2, headingA: "", headingB: "By price (more expensive)" },
  { id: 3, headingA: "", headingB: "By price (cheaper)" },
  { id: 4, headingA: "", headingB: "By seller’s raiting " },
  { id: 5, headingA: "", headingB: "By seller’s deals " },
  { id: 6, headingA: "", headingB: "By quantity" },
  { id: 7, headingA: "", headingB: "Alphabetically" },
];

export const FilesData: FilesDataType[] = [
  {
    id: 1,
    filename: "Crypto",
    date: "July 20, 2025  at 12:32",
  },
  {
    id: 2,
    filename: "Crypto 2",
    date: "July 21, 2025  at 12:32",
  },
  {
    id: 3,
    filename: "Crypto 3",
    date: "July 22, 2025  at 12:32",
  },
];
