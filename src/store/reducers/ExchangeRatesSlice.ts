import {IExchangeRates} from "../../types/exchangeRates";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface IState {
    exchangeRates: IExchangeRates
    isLoading: boolean
    error: string | null
    currencyTitles: string[],
}

const initialState: IState = {
    exchangeRates: {
        base: "",
        localISODate: "",
        putISODate: "",
        rates: {},
        source: "",
    },
    isLoading: false,
    error: null,
    currencyTitles:[],
}

export const exchangeRatesSlice = createSlice({
    name: "exchangeRates",  //уникальное имя
    initialState,           //нач состояние
    reducers:{              //описание редьюсеров
        fetchExchangeRate(state){
            state.isLoading = true;
        },
        fetchExchangeRateSuccess(state, action: PayloadAction<IExchangeRates>){
            state.isLoading = false;
            state.error = "";
            state.exchangeRates = action.payload;
        },
        fetchExchangeRateError(state, action: PayloadAction<string>){
            state.isLoading = false;
            state.error = action.payload;
        },
        setCurrencyNames(state,  action: PayloadAction<string[]>){
            state.currencyTitles = action.payload;
        }
    }
})

export default exchangeRatesSlice.reducer




// было раньше в обычном redux

// export enum exchangeRateActionTypes {
//     FETCH_EXCHANGE_RATES = 'FETCH_EXCHANGE_RATES',
//     FETCH_EXCHANGE_RATES_SUCCESS = 'FETCH_EXCHANGE_RATES_SUCCESS',
//     FETCH_EXCHANGE_RATES_ERROR = 'FETCH_EXCHANGE_RATES_ERROR',
// }
//
// interface FetchExchangeRateAction {
//     type: exchangeRateActionTypes.FETCH_EXCHANGE_RATES;
// }
//
// interface FetchExchangeRateSuccessAction {
//     type: exchangeRateActionTypes.FETCH_EXCHANGE_RATES_SUCCESS;
//     payload: IExchangeRates
// }
//
// interface FetchExchangeRateActionError {
//     type: exchangeRateActionTypes.FETCH_EXCHANGE_RATES_ERROR;
//     payload: string;
// }
//
// export type exchangeRatesActions = FetchExchangeRateAction
//     | FetchExchangeRateSuccessAction | FetchExchangeRateActionError
//
// export const exchangeRatesReducer = (state = initialState, action: exchangeRatesActions): IState => {
//     switch (action.type) {
//         case exchangeRateActionTypes.FETCH_EXCHANGE_RATES:
//             return {loading: true, error: null, exchangeRates: null}
//         case exchangeRateActionTypes.FETCH_EXCHANGE_RATES_SUCCESS:
//             return {exchangeRates: action.payload, loading: false, error: null}
//         case exchangeRateActionTypes.FETCH_EXCHANGE_RATES_ERROR:
//             return {loading: false, exchangeRates: null, error: action.payload}
//         default:
//             return state;
//     }
// }
//
