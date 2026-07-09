// eslint-disable-next-line import/named
import { NotificationType } from '~/entities/notification/model/types'
export const notifications: NotificationType[] = [
  {
    id: 1,
    type: 'positive',
    title: 'positive',
    message: 'escrowDealFinished',
    time: '00:09',
    icon: '✅',
    unreadCount: 2,
  },
  {
    id: 2,
    type: 'negative',
    title: 'negative',
    message: 'negativeReviewReceived',
    time: '00:09',
    icon: '❗',
    unreadCount: 0,
  },
  {
    id: 3,
    type: 'time',
    title: 'time',
    message: 'escrowDealFinished',
    time: '00:09',
    icon: '⏳',
    unreadCount: 0,
  },
  {
    id: 4,
    type: 'neutral',
    title: 'neutral',
    message: 'escrowDealFinished',
    time: '00:09',
    icon: '➖',
    unreadCount: 0,
  },
]
