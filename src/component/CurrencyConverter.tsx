import React, {FC, useState} from 'react';
import {InputNumber, Select} from 'antd';
import {useAppSelector} from "../hooks/redux";
// @ts-ignore
import s from "./styles/currencyConverter.module.css"

const {Option} = Select;

const CurrencyConverter: FC = () => {
    const {exchangeRates, currencyTitles} = useAppSelector(state => state.exchangeRates)
    const [inputValue, setInputValue] = useState(1)
    const [baseCurrency, setBaseCurrency] = useState(exchangeRates.base)
    const [currencyToConvert, setCurrencyToConvert] = useState("")

    let convertedCurrency: number = convertCurrency(baseCurrency, currencyToConvert, exchangeRates.rates, inputValue);

    const handleChange = (value: string) => {
        setCurrencyToConvert(value);
    }

    return (
        <div className={s.wrapper}>
            <div className={s.block}>
                <h4>Введите число и выберите валюту</h4>
                <div className={s.item}>
                    <InputNumber min={0.01} value={inputValue} onChange={(value) => setInputValue(value)}/>
                    <Select defaultValue={baseCurrency} style={{width: 120}}
                            onChange={(value) => setBaseCurrency(value)}>
                        {currencyTitles.map(title => <Option key={title} value={title}>{title}</Option>)}
                    </Select>
                </div>
            </div>
            <div className={s.block}>
                <h4>Выберите валюту в которую хотите перевести</h4>
                <div className={s.item}>
                    <h2>{convertedCurrency ? convertedCurrency : ""}</h2>
                    <Select defaultValue={currencyToConvert} style={{width: 120}}
                            onChange={handleChange}>
                        {currencyTitles.map(title => <Option key={title} value={title}>{title}</Option>)}
                    </Select>
                </div>
            </div>
        </div>
    );
};

const convertCurrency = (baseCurrency: string, currencyToConvert: string,
                         rates: {}, amount: number): number => {
    const ratesMap = new Map(Object.entries(rates));
    return +(amount * (ratesMap.get(currencyToConvert) as number / (ratesMap.get(baseCurrency) as number))).toFixed(4)
}

export default CurrencyConverter;