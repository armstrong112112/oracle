import type { Fiat } from '~/entities/p2p/model/fiat'

export const fiatData: Fiat[] = [
    {
        id: 1,
        title: 'USD',
        value: 'USD',
    },
    {
        id: 2,
        title: 'EUR',
        value: 'EUR',
    },
    {
        id: 3,
        title: 'RUB',
        value: 'RUB',
    },
    {
        id: 4,
        title: 'UAH',
        value: 'UAH',
    },
    {
        id: 5,
        title: 'KZT',
        value: 'KZT',
    },
]

export const defaultFiat: Fiat = fiatData[0]