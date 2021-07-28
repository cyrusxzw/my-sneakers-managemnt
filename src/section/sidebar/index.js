import Logo from '../logo/index.js';
import './index.less';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'antd';
import { AppstoreOutlined, SettingOutlined } from '@ant-design/icons';


export default class Sidebar extends React.Component {

    state = {
        theme: 'dark',
        collapsed: false
    }

    onReSize = () => {
        const width = window.innerWidth;
        if (width < 1180) {
            this.setState({
                collapsed: true
            })
        } else {
            this.setState({
                collapsed: false
            })
        }
    }

    debounce = (fn, delay) => {
        let timer = null;
        return function () {
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                fn(this, arguments);
                timer = null;
            }, delay);
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this.debounce(this.onReSize, 500));
        this.onReSize();
    }

    render() {
        return (
            <div>
                <Logo />
                <Menu mode="inline" inlineCollapsed={this.state.collapsed} className="menu-container" theme={this.state.theme} style={{ height: "100vh" }}>
                    {/* <Menu.Item className="menu-title" key="1" icon={<HomeOutlined />}><NavLink to="/">首页</NavLink></Menu.Item> */}
                    <Menu.Item className="menu-title" key="2" icon={<AppstoreOutlined />}><NavLink to="/managment">数据统计</NavLink></Menu.Item>
                    <Menu.Item className="menu-title" key="3" icon={<SettingOutlined />}><NavLink to="/report">数据分析</NavLink></Menu.Item>
                </Menu>
            </div>
        )
    }
}