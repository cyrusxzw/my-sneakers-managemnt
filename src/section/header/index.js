import React from 'react';
import { Row, Col, PageHeader } from 'antd';
import Axios from '../../axios';
import './index.less'

export default class Header extends React.Component {

    state = {
        picUrl: '',
        weather: '',
        temperature: ''
    }

    componentDidMount() {
        this.getWeatherAPIData();
    }

    getWeatherAPIData() {
        const location = '101020100';
        const key = '150a91117a2b479b81b25fc8d218e142';
        Axios.ajax({
            url: `https://devapi.qweather.com/v7/weather/now?location=${location}&key=${key}`
        }).then((res) => {
            const now = res.data.now;
            this.setState({
                weather: now.text,
                temperature: now.temp
            })
        })
    }

    render() {

        return (
            <div className="header">
                <hr style={{ border: "1px solid #1890ff", marginTop: 50 }} />
                <Row>
                    <Col span="4">
                        <PageHeader
                            className="site-page-header"
                            title="球鞋管理"
                            subTitle="v2.1.1"
                        />
                    </Col>
                    <Col span="20" className="weather">
                        <span className="weather-img">
                            {/* <img src={this.state.picUrl} alt="" /> */}
                        </span>
                        <span className="weather-detail">
                            上海：{this.state.weather}
                        </span>
                        <span className="weather-temperature">
                            {this.state.temperature}℃
                        </span>
                    </Col>
                </Row>
            </div>
        )
    }
}