export interface IExchangeRates {
    base: string
    localISODate: string
    putISODate: string
    rates: {}
    source: string
}

export interface IRates {
    title: string
    currencyName: string | undefined
    value: number
}