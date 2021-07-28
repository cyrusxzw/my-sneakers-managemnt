import React from 'react';
import { Row, Col, Card, Modal } from 'antd';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import { Liquid, Column, Line } from '@ant-design/charts';
import axios from 'axios';
import moment from 'moment';
import Util from '../../utils';
import Axios from '../../axios';
import './index.less';

export default class Report extends React.Component {

    state = {
        data: [],
        isLoggedin: false
    }

    componentDidMount() {
        this.checkLogin();
    }

    checkLogin = () => {
        const userName = localStorage.userName;

        if (userName) {
            this.setState({
                isLoggedin: true
            })
            this.asyncGet();
        } else {
            Modal.error({
                title: "无访问权限",
                content: "请先登录！",
                onOk: () => {
                    window.location.replace('https://cyrusxzw.github.io/my-sneakers-managemnt/#')
                }
            })
        }
    }

    asyncGet = () => {
        Axios.ajax({
            url: "https://solegood.com.au/wp-json/wp/v2/posts",
            method: "get",
            isShowLoading: true
        }).then((res) => {
            const totalPages = Util.getTotalPages(res.headers['x-wp-totalpages']);
            const allData = totalPages.map((page) => {
                return (
                    Axios.ajax({
                        url: `https://solegood.com.au/wp-json/wp/v2/posts?page=${page}`,
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
            if (item.acf.sold_date && moment(item.acf.buy_date, 'DD-MM-YYYY').month() === moment().month()) {
                return item.acf.sold_price
            } else {
                return "0"
            }
        })
        let totalThisMonth = 0;
        for (let item of totalThisMonthArr) {
            totalThisMonth = +totalThisMonth + +item;
        }
        return totalThisMonth;
    }

    monthCompare = (data) => {
        const totalLastMonthArr = data.map((item) => {
            if (item.acf.sold_date && moment(item.acf.buy_date, 'DD-MM-YYYY').isSame(moment().subtract(1, 'months').endOf('month'), 'month')) {
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

    totalBuy = (data) => {
        const total = data.length;
        if (data.length > 0) {
            return total;
        }
        else {
            return "";
        }
    }

    totalSold = (data) => {
        const solds = data.filter(item => item.acf.status === "已卖");
        if (solds.length !== 0) {
            return solds.length;
        } else {
            return "";
        }
    }

    dataForTotalBuyChart = (data) => {
        if (data.length > 0) {
            const buydates = data.map(item => moment(item.acf.buy_date, 'DD-MM-YYYY').format('M'));
            buydates.sort();
            let tempArr = [];
            for (let i = 0; i < buydates.length; i++) {
                let count = 0;
                for (let j = 0; j < buydates.length; j++) {
                    if (buydates[i] === buydates[j]) {
                        count++;
                    }
                }
                tempArr.push([buydates[i], count]);
            }
            const chartData = tempArr.map((item) => {
                const obj = {
                    月份: item[0],
                    购买数量: item[1]
                }
                return obj;
            })
            return chartData;
        } else {
            console.log("暂时无数据！");
            return ""
        }
    }

    dataForTotalSoldChart = (data) => {
        if (data.length > 0) {
            const monthAndSold = data.map((item) => {
                const newItem = {
                    month: moment(item.acf.buy_date, 'DD-MM-YYYY').format('M'),
                    status: item.acf.status
                }
                return newItem;
            })
            const tempArr = monthAndSold.filter(e => e.status === "已卖");
            const monthAmount = tempArr.map(item => item.month);
            monthAmount.sort();
            let tempCount = [];
            for (let i = 0; i < monthAmount.length;) {
                let count = 0;
                for (let j = 0; j < monthAmount.length; j++) {
                    if (monthAmount[i] === monthAmount[j]) {
                        count++;
                    }
                }
                tempCount.push([monthAmount[i], count]);
                i += count;
            }
            const prepData = tempCount.map(item => {
                return {
                    月份: item[0],
                    卖出数量: item[1]
                }
            })
            return prepData;
        } else {
            return ""
        }
    }

    dataForProfitChart = (data) => {
        if (data.length > 0) {
            const tempArr = data.map(item => {
                if (item.acf.buy_price) {
                    item = {
                        month: moment(item.acf.buy_date, 'DD-MM-YYYY').format('M'),
                        profit: item.acf.sold_price ? (item.acf.sold_price - item.acf.buy_price) : (0 - item.acf.buy_price)
                    }
                    return item;
                } else {
                    console.log("检查买入价是否为空！")
                    return "";
                }
            })
            tempArr.sort((a, b) => {
                return a.month - b.month;
            });
            let holder = {};
            tempArr.forEach(e => {
                if (holder.hasOwnProperty(e.month)) {
                    holder[e.month] = holder[e.month] + e.profit;
                } else {
                    holder[e.month] = e.profit;
                }
            });
            //console.log(holder)
            let prepData = [];
            for (let prop in holder) {
                prepData.push({ 月份: prop, 利润: holder[prop] });
            }
            return prepData;
        } else {
            console.log("暂时无数据！");
            return ""
        }
    }

    render() {
        const { data } = this.state;
        const liquidConfig = {
            percent: ((this.currentMonthProfit(data) >= 0 ? this.currentMonthProfit(data) : 0) / this.totalProfit(data)) || 0,
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
        const columnConfig1 = {
            height: 150,
            tooltip: {
                customContent: (title, data) => {
                    return `<div>${title}月, 购买了${data[0] ? data[0].value : ""}双</div>`;
                }
            },
            data: this.dataForTotalBuyChart(data) || [],
            xField: '月份',
            yField: '购买数量',
            label: {
                position: 'middle',
                style: {
                    fill: '#FFFFFF',
                    opacity: 0.6,
                },
            }
        };
        const columnConfig2 = {
            height: 150,
            tooltip: {
                customContent: (title, data) => {
                    return `<div>${title}月, 卖出了${data[0] ? data[0].value : ""}双</div>`;
                }
            },
            data: this.dataForTotalSoldChart(data) || [],
            xField: '月份',
            yField: '卖出数量',
            label: {
                position: 'middle',
                style: {
                    fill: '#FFFFFF',
                    opacity: 0.6,
                },
            }
        };
        const config = {
            data: this.dataForProfitChart(data) || [],
            xField: '月份',
            yField: '利润',
            tooltip: {
                customContent: (title, data) => {
                    return `<div>利润：$${data[0] ? data[0].value : ""}</div>`;
                }
            },
            point: {
                visible: true,
                size: 5,
                shape: 'diamond',
                style: {
                    fill: 'white',
                    stroke: '#2593fc',
                    lineWidth: 2,
                },
            },
            label: {
                position: 'left',
                style: {
                    fill: '#000000',
                },
                offsetY: -5,
            }
        };

        return (
            <div className="report-container">
                <Row className="top">
                    <Col span={6}>
                        <Card title="总销售额">
                            <div className="total">{`$ ${this.totalSale(data)}`}</div>
                            <div className="monthSale">{`本月销售额 $${this.currentMonthSale(data)}`}</div>
                            <div className="monthCompare">{`比上月 \u00A0\u00A0 ${this.monthCompare(data)}%`}<CaretUpOutlined className="statusIcon" style={{ display: this.monthCompare(data) < 0 ? "none" : "inline-block", color: 'red' }} /><CaretDownOutlined className="statusIcon" style={{ display: this.monthCompare(data) >= 0 ? "none" : "inline-block", color: 'green' }} /></div>
                            <div className="average">{`月均销售额 $${this.averageSale(data)}`}</div>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card title="总利润">
                            <div className="total">{`$ ${this.totalProfit(data)}`}</div>
                            <div className="profit-month">
                                <p>{`本月利润 $${this.currentMonthProfit(data)}`}</p>
                                <Liquid {...liquidConfig} />
                            </div>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card title="购买总量">
                            <div className="total">{`${this.totalBuy(data)}`}</div>
                            <Column {...columnConfig1} />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card title="卖出总量">
                            <div className="total">{`${this.totalSold(data)}`}</div>
                            <Line {...columnConfig2} />
                        </Card>
                    </Col>
                </Row>
                <Row className="middle">
                    <Col span={24}>
                        <Card title="利润趋势统计">
                            <Line {...config} />
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }

}
