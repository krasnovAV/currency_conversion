import React, {FC, useState} from 'react';
import {useAppSelector} from "../hooks/redux";
import {Select} from 'antd';
import 'antd/dist/antd.css';
import {currencyNames} from "../store/currencyNames";
// @ts-ignore
import s from "./styles/exchangeRates.module.css"
import {IRates} from "../types/exchangeRates";

import {Row, Col} from 'antd';

const {Option} = Select;

const ExchangeRates: FC = () => {
    const {exchangeRates, isLoading, error, currencyTitles} = useAppSelector(state => state.exchangeRates)
    const [baseTitle, setBaseTitle] = useState(exchangeRates.base)

    let ratesArr = getRatesArr(exchangeRates.rates, currencyNames, baseTitle);

    function handleChange(value: string) {
        setBaseTitle(value);
    }

    return (
        <div>
            {isLoading && <h1>Загрузка...</h1>}
            {error && <h1>{error}</h1>}
            <div className={s.header}>
                <div>Базовая валюта</div>
                <div>
                    <Select defaultValue={baseTitle} data-testid="select-currency" style={{width: 120}} onChange={handleChange}>
                        {currencyTitles.map(title => <Option key={title} value={title}>{title}</Option>)}
                    </Select>
                </div>
            </div>
            <div>
                <RatesItem title={"Букв. код"} currencyName={"Валюта"}/>
                {ratesArr.map(item => <RatesItem title={item.title} currencyName={item.currencyName}
                                                 rate={item.value} key={item.title}/>)}
            </div>
        </div>
    );
};


type Props = {
    title: string,
    currencyName: string | undefined,
    rate?: number
}

const RatesItem: FC<Props> = ({rate, title, currencyName}) => {
    return (
        <>
            <Row className={s.RatesItem} gutter={[1, 24]}>
                <Col span={5}>{title}</Col>
                <Col span={12}>{currencyName}</Col>
                <Col span={5}>{rate ? rate : "Курс"}</Col>
            </Row>
        </>
    )
}

const getRatesArr = (rates: {}, currencyNames: {}, baseTitle: string): IRates[] => {
    let ratesMap = new Map(Object.entries(rates));
    let ratesArr = Object.entries(rates);
    let currencyNamesMap = new Map(Object.entries(currencyNames));
    let resultArr: IRates[] = [];
    const baseValue = Number(ratesMap.get(baseTitle));

    for (let i = 0; i < ratesMap.size; i++) {
        resultArr.push({
            title: ratesArr[i][0], value: +((ratesArr[i][1] as number) / baseValue).toFixed(4),
            currencyName: currencyNamesMap.get(ratesArr[i][0]) as string
        })
    }

    return resultArr.filter(item => item.title !== baseTitle);
}

export default ExchangeRates;