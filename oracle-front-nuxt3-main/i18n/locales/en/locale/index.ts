import auth from './auth'
import bills from './bills'
import cards from './cards'
import chat from './chat'
import checks from './checks'
import creation from './creation'
import dashboard from './dashboard'
import escrow from './escrow'
import history from './history'
import mixing from './mixing'
import modals from './modals'
import moreSettings from './moreSettings'
import notifications from './notifications'
import p2p from './p2p'
import pay from './pay'
import story from './story'
import swap from './swap'
import transfers from './transfers'
import verdict from './verdict'
import verification from './verification'
import whitelist from './whitelist'
export default {
  notifications: {
    ...notifications,
  },
  verification: {
    ...verification,
  },
  creation: {
    ...creation,
  },
  auth: {
    ...auth,
  },
  modals: {
    ...modals,
  },
  pay: {
    ...pay,
  },
  whitelist: {
    ...whitelist,
  },
  mixing: {
    ...mixing,
  },
  cards: {
    ...cards,
  },
  bills: {
    ...bills,
  },
  escrow: {
    ...escrow,
  },
  verdict: {
    ...verdict,
  },
  chat: {
    ...chat,
  },
  dashboard: {
    ...dashboard,
  },
  transfers: {
    ...transfers,
  },
  swap: {
    ...swap,
  },
  moreSettings: {
    ...moreSettings,
  },
  checks: {
    ...checks,
  },
  history: {
    ...history,
  },
  story: {
    ...story,
  },
  p2p: {
    ...p2p,
  },
}
