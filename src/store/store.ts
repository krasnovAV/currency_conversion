import {configureStore, combineReducers} from "@reduxjs/toolkit";
import exchangeRates from "./reducers/ExchangeRatesSlice";

const rootReducer = combineReducers({
    exchangeRates: exchangeRates,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>  // получение типа состояния
export type AppStore = ReturnType<typeof setupStore>    // получение типа store
export type AppDispatch = AppStore["dispatch"]          // получение типа dispatch. определив его тип
//мы не сможем задиспатчить экшены, которые мы не определили
