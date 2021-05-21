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
        // this.getWeatherAPIData();
    }

    getWeatherAPIData() {
        let city = 'melbourne';
        Axios.ajax({
            url: `http://api.weatherstack.com/current?access_key=a8503431d7eeae0100eb9f9439f07018&query=${city}`
        }).then((res) => {
            window.data = res;
            if (res.status === 200) {
                const data = res.data.current;
                this.setState({
                    picUrl: data.weather_icons[0],
                    weather: data.weather_descriptions[0],
                    temperature: data.temperature
                })
            }
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
                            <img src={this.state.picUrl} alt="" />
                        </span>
                        <span className="weather-detail">
                            {this.state.weather}
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