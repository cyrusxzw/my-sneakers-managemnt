import React from 'react';
import { Form, Button, message, Input, Modal } from 'antd';
import './index.less'

export default class Login extends React.Component {
    state = {
        isLoggedin: false
    }
    componentDidMount() {
        const userName = localStorage.userName;
        console.log(userName)
        if (userName) {
            window.location.href = 'https://cyrusxzw.github.io/my-sneakers-managemnt/#/managment';
        }
    }
    onFinish = (values) => {
        const userName = values.username;
        const password = values.password;
        if (userName === "xzw900625" && password === "12315") {
            localStorage.userName = userName;
            localStorage.password = password;
            message.success("登陆成功！")
            this.setState({
                isLoggedin: true
            })
            window.location.href = 'https://cyrusxzw.github.io/my-sneakers-managemnt/#/managment';
        } else {
            Modal.error({
                title: "登录失败",
                content: "用户名或者密码错误！"
            })
        }
    }
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    render() {
        return (
            <div id="login-container">
                <h2>欢迎来到许增威的球鞋管理系统</h2>
                <div id="form-container">
                    <Form
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                    >
                        <Form.Item
                            label="用户名"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入用户名!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="密码"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入密码!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                        >
                            <Button type="primary" htmlType="submit">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}