import {formatNotificationDate} from "~/features/notifications/lib/formatDate";

const formattedDate = formatNotificationDate(new Date())
export const notificationGroups = [
  {
    id: 1,
    date: formattedDate,
    notifications: [
      {
        title: 'Escrow Deal is Finished',
        message:
          'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien.',
        time: '09:36'
      },
      {
        title: 'P2P Deal is Finished',
        message:
          'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam',
        time: '09:36'
      },
      {
        title: 'Your received internal Transfer',
        message:
          'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam',
        time: '09:36'
      }
    ]
  },
  {
    id: 2,
    date: formattedDate,
    notifications: [
      {
        title: 'Your received internal Transfer',
        message:
          'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam',
        time: '09:36'
      },
      {
        title: 'You received OraclePay Payment',
        message:
          'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam',
        time: '09:36'
      },
      {
        title: 'You received external Transfer',
        message:
          'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam',
        time: '09:36'
      }
    ]
  },
  {
    id: 3,
    date: formattedDate,
    notifications: [
      {
        title: 'Your received internal Transfer',
        message:
          'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam',
        time: '09:36'
      }
    ]
  },
  {
    id: 4,
    notifications: [
      {
        title: 'Your received internal Transfer',
        message:
          'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam',
        time: '09:36'
      },
      {
        title: 'You received OraclePay Payment',
        message:
          'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam',
        time: '09:36'
      },
      {
        title: 'You received external Transfer',
        message:
          'Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam',
        time: '09:36'
      }
    ]
  },
]
