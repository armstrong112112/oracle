// @ts-ignore
import ArrowUpIcon from "@/assets/svg/arrow-up.svg?component";
// @ts-ignore
import SwapIcon from "@/assets/svg/exchange.svg?component";
// @ts-ignore
import WithdrawIcon from "@/assets/svg/withdraw.svg?component";
// @ts-ignore
import MixingIcon from "@/assets/svg/mixing-icon.svg?component";

export const recentTransactions = [
  {
    icon: ArrowUpIcon,
    text: "dashboard.recent.transferToUser",
  },
  {
    icon: SwapIcon,
    text: "dashboard.recent.swapBtcToLtc",
  },
  {
    icon: WithdrawIcon,
    text: "dashboard.recent.withdrawFromMask",
  },
  {
    icon: MixingIcon,
    text: "dashboard.recent.mixingWithdrawn",
  },
];

export const depositOptions = [
  {
    id: 1,
    img: "/svg/arrow-down.svg",
    title: "dashboard.depositOptions.externalTitle",
    description: "dashboard.depositOptions.externalDescription",
  },
  {
    id: 2,
    img: "/svg/p2p-icon.svg",
    title: "dashboard.depositOptions.p2pTitle",
    description: "dashboard.depositOptions.p2pDescription",
  },
  {
    id: 3,
    img: "/svg/oracle-icon.svg",
    title: "dashboard.depositOptions.internalInTitle",
    description: "dashboard.depositOptions.internalInDescription",
  },
  {
    id: 4,
    img: "/svg/bill-icon.svg",
    title: "dashboard.depositOptions.createBillTitle",
    description: "dashboard.depositOptions.createBillDescription",
  },
];

export const withdrawOptions = [
  {
    id: 1,
    img: "/svg/arrow-down.svg",
    title: "dashboard.withdrawOptions.externalTitle",
    description: "dashboard.withdrawOptions.externalDescription",
  },
  {
    id: 2,
    img: "/svg/p2p-icon.svg",
    title: "dashboard.withdrawOptions.p2pTitle",
    description: "dashboard.withdrawOptions.p2pDescription",
  },
  {
    id: 3,
    img: "/svg/oracle-icon.svg",
    title: "dashboard.withdrawOptions.internalOutTitle",
    description: "dashboard.withdrawOptions.internalOutDescription",
  },
  {
    id: 4,
    img: "/svg/bill-icon.svg",
    title: "dashboard.withdrawOptions.billPaymentTitle",
    description: "dashboard.withdrawOptions.billPaymentDescription",
  },
];

export const services = [
  {
    id: 1,
    img: "/svg/mixing-icon.svg",
    title: "Oracle Crypto Mixing",
    link: "/",
  },
  {
    id: 2,
    img: "/svg/p2p-icon.svg",
    title: "P2P",
    link: "/",
  },
  {
    id: 3,
    // img: "/svg/oracle-icon.svg",
    img: "/svg/oracle-bg.svg",
    title: "Oracle Pay",
    link: "/",
  },
  {
    id: 4,
    img: "/svg/Mixing.svg",
    title: "Mixing",
    link: "/",
  },
  {
    id: 5,
    img: "/svg/Checks.svg",
    title: "Check",
    link: "/",
  },
];
