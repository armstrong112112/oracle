// marketData.ts

export interface MarketNotificationItem {
  id: string
  title: string
  timestamp: string
  read: boolean
  date: string
  subtitle?: string
  alert?: string
  action?: string
  for?: {
    name: string
    avatar: string
  }
  user?: {
    name: string
    avatar: string
  }
  category?: string
}

export const marketData: MarketNotificationItem[] = [
  {
    id: '1',
    title: 'verificationPaymentConfirmed',
    timestamp: '12:03',
    read: false,
    date: 'March 20, 2025',
    subtitle: 'verificationFeeProcessed',
    alert: 'documentsUnderReview',
    action: 'viewVerdict',
  },
  {
    id: '2',
    title: 'verificationApplicationApproved',
    timestamp: '12:03',
    read: false,
    date: 'March 20, 2025',
    subtitle: 'congratulationsTrial',
  },
  {
    id: '3',
    title: 'verificationUpgraded',
    timestamp: '12:03',
    read: false,
    date: 'March 20, 2025',
    subtitle: 'accountUpgraded',
    alert: 'basedOnReviews',
  },
  {
    id: '4',
    title: 'verificationReminder',
    timestamp: '12:03',
    read: false,
    date: 'March 20, 2025',
    subtitle: 'moreReviewsNeeded',
  },
  {
    id: '5',
    title: 'new5StarReview',
    timestamp: '12:03',
    read: false,
    date: 'March 20, 2025',
    subtitle: 'serviceLogoDesign',
    for: {
      name: 'Barbara Martinez',
      avatar: '/avatars/barbara.png',
    },
  },
  {
    id: '6',
    title: 'newDesignOrder',
    timestamp: '12:03',
    read: false,
    date: 'March 20, 2025',
    subtitle: 'websiteRedesign',
    user: {
      name: 'Barbara Martinez',
      avatar: '/avatars/barbara.png',
    },
  },
  {
    id: '7',
    title: 'newServiceRequest',
    timestamp: '12:03',
    read: false,
    date: 'March 20, 2025',
    user: {
      name: 'Barbara Martinez',
      avatar: '/avatars/barbara.png',
    },
  },
]
