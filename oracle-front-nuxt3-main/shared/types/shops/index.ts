export interface CheckBoxType {
  id: number
  headingA: string
  headingB: string
}

export interface ProductSlidesType {
  id: number
  image: string
}

interface contactType {
  id: number
  name: string
  icon: string
  link: string
}

export interface ProductDataType {
  id: number
  image: ProductSlidesType[]
  name: string
  category: string
  itemLeft: number
  isOutStock: boolean
  hasContact: boolean
  contact: contactType[]
  price: number
  description: string
  listings: number
  shopName: string
  isVerified: boolean
  discount: number
  rating: number
  reviews: number
  views: number
  date: string
}

export interface ChildrenType {
  id: number
  name: string
  link: string
}

export interface NavigationType {
  id: number
  name: string
  icons: string
  link: string
  dropdown: boolean
  children: ChildrenType[]
}

export interface SideBarNavigationType {
  id: number
  name: string
  icons: string
  link: string
}

export interface SearchDataType {
  id: number
  searches: string
  category: string
}

export interface CompilationDataType {
  id: number
  compilation: string
  listing: number
}

export interface ResultsCategoryType {
  id: number
  name: string
}

interface OrderType {
  id: number,
  image: string,
  price: number,
  name: string
  shopName: string
}

export interface YourOrdersType {
  id: number
  date: string
  products: OrderType[]
}

type permission = {
  shopName: boolean
  shopBio: boolean
  shopAvatar: boolean
  staffSetting: boolean
  addNewEmployee: boolean
  sendMessage: boolean
  deleteEmployee: boolean
}

export interface StaffType {
  id: number
  image: string,
  name: string,
  nickname: string,
  permission: permission
}

export interface PromoCodesType {
  id: number
  promo: string
  date: string
  activationLeft: number | null
}

export interface MockDefaultUserType {
  id: number
  name: string
  bio: string
  image: string
  role: string
}

export interface ProductDataCategoryType {
  id: number
  name: string
}

export interface BuyProductType {
  product: ProductDataType
  quantity: number
  method: 'crypto' | 'сash'
  crypto: string | undefined
  total_crypto_price: number
  total_price: number
}

export interface StepsObjectType {
  step_one: {
    step: string
    category: string
    platform: string
    product: string
    subcategory: string
  }

  step_two: {
    step: string
    delivery: boolean
    deal_duration: string
    header: string
    description: string
    selfRegistered: string
    controlled: string
    accountAge: {
      min: string
      max: string
    }
    uploadedImage: string
  }

  step_three: {
    step: string
    phoneNumber: string
    communication: string
    quantity: string
    cost: string
    plan: string
    terms: string
    regions: string
    duration: {
      start: string
      end: string
    }
  }
}

export interface FilesDataType {
  id: number
  filename: string
  date: string
}
