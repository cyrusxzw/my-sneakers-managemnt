import React from 'react';
import { CSVLink } from "react-csv";
import { Button } from 'antd';

const Excel = (props) => {
    const rawData = props.data;
    const csvData = rawData.map(item => {
        return {
            鞋款: item.title.rendered,
            尺码: item.acf.size,
            买入时间: item.acf.buy_date,
            买入价格: item.acf.buy_price,
            买家: item.acf.buyer,
            卖出时间: item.acf.sold_date,
            卖出价格: item.acf.sold_price,
            利润: item.acf.sold_price ? (item.acf.sold_price - item.acf.buy_price) : (0 - item.acf.buy_price),
            备注: item.acf.remarks
        }
    })
    return (
        <Button><CSVLink data={csvData}>导出记录</CSVLink></Button>
    )
}

export default Excel;

