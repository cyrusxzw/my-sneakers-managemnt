import Logo from '../logo/index.js';
import './index.less';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'antd';
import { AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;


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
                <NavLink to="/"><Logo /></NavLink>
                <Menu mode="inline" inlineCollapsed={this.state.collapsed} className="menu-container" theme={this.state.theme} style={{ height: "100vh" }}>
                    <SubMenu key="sub2" icon={<AppstoreOutlined />} title="管理">
                        <Menu.Item key="1"><NavLink to="/managment">数据统计</NavLink></Menu.Item>
                        <Menu.Item key="2">正在开发中</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub1" icon={<SettingOutlined />} title="数据分析">
                        <Menu.Item key="3">报告</Menu.Item>
                        <Menu.Item key="4">图表</Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        )
    }
}