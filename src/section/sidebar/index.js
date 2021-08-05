import Logo from '../logo/index.js';
import './index.less';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'antd';
import { AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import changeTitle from '../../redux/action';



const Sidebar = () => {
    const [theme] = useState("dark");
    const [collapsed, setCollapsed] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        window.addEventListener('resize', debounce(onReSize, 500));
        onReSize();
    })

    const handleClick = (item) => {
        dispatch(changeTitle(item.key));
    }

    const onReSize = () => {
        const width = window.innerWidth;
        if (width < 1180) {
            setCollapsed(true);
        } else {
            setCollapsed(false);
        }
    }

    const debounce = (fn, delay) => {
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

    return (
        <div>
            <Logo />
            <Menu mode="inline" inlineCollapsed={collapsed} className="menu-container" theme={theme} style={{ height: "100vh" }} onClick={handleClick}>
                {/* <Menu.Item className="menu-title" key="1" icon={<HomeOutlined />}><NavLink to="/">首页</NavLink></Menu.Item> */}
                <Menu.Item className="menu-title" key="数据统计" icon={<AppstoreOutlined />}><NavLink to="/managment">数据统计</NavLink></Menu.Item>
                <Menu.Item className="menu-title" key="数据分析" icon={<SettingOutlined />}><NavLink to="/report">数据分析</NavLink></Menu.Item>
            </Menu>
        </div>
    )
}

export default Sidebar;

