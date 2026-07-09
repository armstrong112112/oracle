import p2pIcon from '~/assets/svg/p2p-icon.svg?component'
import ordersIcon from '~/assets/svg/clock-circle-dash.svg?component'
import listingIcon from '~/assets/svg/listing.svg?component'
import chatIcon from '~/assets/svg/chat-p2p.svg?component'
import profileIcon from '~/assets/svg/profile-p2p.svg?component'

import type { FooterItem } from '~/shared/types/footer'

export const p2pFooterItems: FooterItem[] = [
  {
    path: '/p2p',
    text: 'P2P',
    icon: p2pIcon,
    exact: true
  },
  {
    path: '/p2p/orders',
    text: 'Orders',
    icon: ordersIcon
  },
  {
    path: '/p2p/listing',
    text: 'Listing',
    icon: listingIcon
  },
  {
    path: '/p2p/chat',
    text: 'Chat',
    icon: chatIcon
  },
  {
    path: '/p2p/profile',
    text: 'Profile',
    icon: profileIcon
  }
] 