import type { CryptoOffer } from "../model/cryptoOffer"

export const cryptoOfferBuy: CryptoOffer[] = [
    {
        id: '1',
        crypto: 'BTC',
        fiat: 'USD',
        limit: 100,
        limitFiat: 10000,
        available: 100,
        tradeCounts: 300,
        likePercentage: 100,
        isFavorite: false,
        verified: true,
        type: 'buy',
        paymentMethods: [
            {
                title: 'Venmo',
                value: 'venmo'
            },
            {
                title: 'PayPal',
                value: 'paypal'
            },
            
            {
                title: 'Bank Transfer',
                value: 'bank_transfer'
            },
        ],
        user: {
            id: 1,
            avatar: '/png/zaglushka.png',
            name: 'John Doe',
            username: 'john_doe'
        }
    },
    {
        id: '2',
        crypto: 'ETH',
        fiat: 'USD',
        limit: 100,
        limitFiat: 10000,
        available: 100,
        tradeCounts: 300,
        likePercentage: 100,
        isFavorite: true,
        verified: true,
        type: 'buy',
        paymentMethods: [
            {
                title: 'Venmo',
                value: 'venmo'
            },
            {
                title: 'PayPal',
                value: 'paypal'
            },
            
        ],
        user: {
            id: 2,
            avatar: '/png/zaglushka.png',
            name: 'Jane Doe',
            username: 'jane_doe'
        }
    }
]

export const cryptoOfferSell: CryptoOffer[] = [
    {
        id: '1',
        crypto: 'BTC',
        fiat: 'USD',
        limit: 100,
        limitFiat: 10000,
        available: 100,
        tradeCounts: 300,
        likePercentage: 100,
        isFavorite: false,
        verified: true,
        type: 'sell',
        paymentMethods: [
            {
                title: 'Venmo',
                value: 'venmo'
            },
            {
                title: 'PayPal',
                value: 'paypal'
            },
            
            {
                title: 'Bank Transfer',
                value: 'bank_transfer'
            },
        ],
        user: {
            id: 1,
            avatar: '/png/zaglushka.png',
            name: 'John Doe',
            username: 'john_doe'
        }
    },
    {
        id: '2',
        crypto: 'ETH',
        fiat: 'USD',
        limit: 100,
        limitFiat: 10000,
        available: 100,
        tradeCounts: 300,
        likePercentage: 100,
        isFavorite: true,
        verified: true,
        type: 'sell',
        paymentMethods: [
            {
                title: 'Venmo',
                value: 'venmo'
            },
            {
                title: 'PayPal',
                value: 'paypal'
            },
            
        ],
        user: {
            id: 2,
            avatar: '/png/zaglushka.png',
            name: 'Jane Doe',
            username: 'jane_doe'
        }
    }
]