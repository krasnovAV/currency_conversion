import {IExchangeRates} from "../../types/exchangeRates";
import {AppDispatch} from "../store";
import {exchangeRatesSlice} from "./ExchangeRatesSlice";
import axios from "axios";

export const getExchangeRates = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(exchangeRatesSlice.actions.fetchExchangeRate);
        const response = await axios.get<IExchangeRates>("https://cdn.cur.su/api/cbr.json")
        dispatch(exchangeRatesSlice.actions.fetchExchangeRateSuccess(response.data))
    } catch (e: any) {
        dispatch(exchangeRatesSlice.actions.fetchExchangeRateError(e.message))
    }
}