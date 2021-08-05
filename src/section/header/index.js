import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, PageHeader } from 'antd';
import Axios from '../../axios';
import './index.less';

const Header = () => {
    const [weather, setWeather] = useState("");
    const [temperature, setTemperature] = useState("");
    const title = useSelector(state => state)
    useEffect(() => {
        getWeatherAPIData();
    })

    function getWeatherAPIData() {
        const location = '101020100';
        const key = '150a91117a2b479b81b25fc8d218e142';
        Axios.ajax({
            url: `https://devapi.qweather.com/v7/weather/now?location=${location}&key=${key}`
        }).then((res) => {
            const now = res.data.now;
            setWeather(now.text);
            setTemperature(now.temp);
        })
    }

    return (
        <div className="header">
            <h5>{title}</h5>
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
                        上海：{weather}
                    </span>
                    <span className="weather-temperature">
                        {temperature}℃
                    </span>
                </Col>
            </Row>
        </div>
    )
}

export default Header;


