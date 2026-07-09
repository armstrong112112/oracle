import type { User } from "~/entities/dashboard-payment/model/users.types"
import type { PaymentType } from "~/entities/p2p/model/paymentType"
import { cryptoOfferBuy, cryptoOfferSell } from "../data/cryptoOffer"

export interface CryptoOffer {
    id: string
    crypto: string
    fiat: string
    limit: number
    limitFiat: number
    available: number
    type: 'buy' | 'sell'
    tradeCounts: number
    likePercentage: number
    isFavorite: boolean 
    verified: boolean
    user: User
    paymentMethods: PaymentType[]
}

// TODO: remove this after api is ready
export function getCryptoOffers(type: 'buy' | 'sell' = 'buy'): Promise<CryptoOffer[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(Array(5).fill(null).flatMap(() => type === 'buy' ? cryptoOfferBuy : cryptoOfferSell))
        }, 1000)
    })
}