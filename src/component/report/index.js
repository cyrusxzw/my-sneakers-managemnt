import React from 'react';
import { Row, Col, Card } from 'antd';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import { Liquid } from '@ant-design/charts';
import axios from 'axios';
import moment from 'moment';
import Util from '../../utils';
import Axios from '../../axios';
import './index.less';

export default class Report extends React.Component {

    state = {
        data: [],
    }

    componentDidMount() {
        this.asyncGet();
    }

    asyncGet = () => {
        Axios.ajax({
            url: "http://solegood.com.au/wp-json/wp/v2/posts",
            method: "get",
            isShowLoading: true
        }).then((res) => {
            const totalPages = Util.getTotalPages(res.headers['x-wp-totalpages']);
            const allData = totalPages.map((page) => {
                return (
                    Axios.ajax({
                        url: `http://solegood.com.au/wp-json/wp/v2/posts?page=${page}`,
                        method: "get",
                        isShowLoading: true
                    })
                )
            })
            axios.all(allData).then(axios.spread((...responses) => {
                const isOK = responses.every((element) => element.status === 200);
                if (isOK) {
                    const tempArr = [...responses.map(item => item.data)];
                    const arr = tempArr.flat();
                    const list = arr.map((item, index) => {
                        item.key = index;
                        item = {
                            ...item,
                            newId: index + 1
                        }
                        return item;
                    })
                    this.setState({
                        data: list
                    })
                }
            })).catch(error => console.log('fetch data failed', error))
        })
    }

    totalSale = (data) => {
        let total = "";
        for (let i = 0; i < data.length; i++) {
            if (data[i].acf.sold_price) {
                total = +total + +data[i].acf.sold_price;
            }
        }
        return total
    }

    averageSale = (data) => {
        let avg = "";
        const total = this.totalSale(data);
        const month = new Date().getMonth() + 1;
        avg = Math.round(total / month);
        if (avg) {
            return avg;
        } else {
            return ""
        }
    }

    currentMonthSale = (data) => {
        const totalThisMonthArr = data.map((item) => {
            if (item.acf.sold_date && moment(item.acf.sold_date, 'DD-MM-YYYY').isSame(moment(), 'month')) {
                return item.acf.sold_price
            } else {
                return "0"
            }
        })
        let totalThisMonth = 0;
        for (const item of totalThisMonthArr) {
            totalThisMonth = +totalThisMonth + +item;
        }
        return totalThisMonth;
    }

    monthCompare = (data) => {
        const totalLastMonthArr = data.map((item) => {
            if (item.acf.sold_date && moment(item.acf.sold_date, 'DD-MM-YYYY').isSame(moment().subtract(1, 'months').endOf('month'), 'month')) {
                return item.acf.sold_price
            } else {
                return "0"
            }
        })
        let totalLastMonth = 0;
        for (const item of totalLastMonthArr) {
            totalLastMonth = +totalLastMonth + +item;
        }
        const totalThisMonth = this.currentMonthSale(data);
        if (totalLastMonth !== 0 && totalThisMonth !== 0) {
            const diff = (totalThisMonth / totalLastMonth) - 1;
            return Math.round(diff * 100);
        } else {
            return ""
        }
    }

    totalProfit = (data) => {
        let totalProfit = "";
        for (let i = 0; i < data.length; i++) {
            const soldPrice = data[i].acf.sold_price ? data[i].acf.sold_price : 0;
            let profit = +soldPrice - +data[i].acf.buy_price;
            totalProfit = +totalProfit + +profit;
        }
        return totalProfit;
    }

    currentMonthProfit = (data) => {
        const currentMonthData = data.filter((item) => {
            if (moment(item.acf.buy_date, 'DD-MM-YYYY').isSame(moment(), 'month')) {
                return item;
            } else {
                return null;
            }
        })
        const eachProfit = currentMonthData.map(e => e.acf.sold_price ? (e.acf.sold_price - e.acf.buy_price) : (- e.acf.buy_price))
        let totalMonthProfit = "";
        for (let i = 0; i < eachProfit.length; i++) {
            totalMonthProfit = +totalMonthProfit + +eachProfit[i];
        }
        return totalMonthProfit;
    }

    render() {
        const { data } = this.state;
        const config = {
            percent: this.currentMonthProfit(data) / this.totalProfit(data) || 0,
            outline: {
                border: 4,
                distance: 8,
            },
            wave: { length: 128 },
            statistic: {
                title: {
                    formatter: function formatter() {
                        return '占总利润';
                    }
                }
            }
        }
        return (
            <div className="report-container">
                <Row className="top">
                    <Col span={6}>
                        <Card title="总销售额">
                            <div className="total">{`$ ${this.totalSale(data)}`}</div>
                            <div className="monthSale">{`本月销售额 $${this.currentMonthSale(data)}`}</div>
                            <div className="monthCompare">{`比上月 \u00A0\u00A0 ${this.monthCompare(data)}%`}<CaretUpOutlined className="statusIcon" style={{ display: this.monthCompare(data) < 0 ? "none" : "inline-block", color: 'green' }} /><CaretDownOutlined className="statusIcon" style={{ display: this.monthCompare(data) >= 0 ? "none" : "inline-block", color: 'green' }} /></div>
                            <div className="average">{`月均销售额 $${this.averageSale(data)}`}</div>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card title="总利润">
                            <div className="total">{`$ ${this.totalProfit(data)}`}</div>
                            <div className="profit-month">
                                <p>{`本月利润 $${this.currentMonthProfit(data)}`}</p>
                                <Liquid {...config} />
                            </div>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card title="购买数量">

                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card title="卖出数量">

                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }

}
