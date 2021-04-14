import React from 'react';
import { Table as SneakerTable, Card, Modal, Form, Input, Button, Select, DatePicker } from 'antd';
import Axios from '../../axios';

export default class Table extends React.Component {

    state = {
        visible: false
    }

    formItemLayout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };

    columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '鞋款',
            dataIndex: 'sneaker',
            key: 'sneaker',
            render: (sk) => {
                const conf = {
                    "1": "Aj1",
                    "2": "Dunk",
                    "3": "Yeezy",
                    "4": "AJ4"
                }
                return conf[sk];
            }
        },
        {
            title: '尺码',
            dataIndex: 'size',
            key: 'size',
        },
        {
            title: '状态',
            dataIndex: 'ifSold',
            key: 'status',
        },
        {
            title: '买入价',
            dataIndex: 'buyPrice',
            key: 'buyPrice',
        },
        {
            title: '卖出价',
            dataIndex: 'soldPrice',
            key: 'soldPrice',
        },
        {
            title: '买入时间',
            dataIndex: 'buyDate',
            key: 'buyDate',
        },
        {
            title: '卖出时间',
            dataIndex: 'soldDate',
            key: 'soldDate',
        },
        {
            title: '买家',
            dataIndex: 'buyer',
            key: 'buyer',
        },
        {
            title: '利润',
            dataIndex: 'profit',
            key: 'profit',
        },
        {
            title: '备注',
            dataIndex: 'remarks',
            key: 'remarks',
        }
    ]

    componentDidMount() {
        Axios.ajax({
            url: "/api/table/list",
            method: "get",
            isShowLoading: true
        }).then((res) => {
            if (res.data.code === 0) {
                const list = res.data.result.list.map((item, index) => {
                    item.key = index;
                    return item;
                })
                this.setState({
                    dataSource: list
                })
            } else {
                Modal.error({
                    visible: this.state.visible,
                    title: '错误',
                    content: "连接错误，无法访问数据！",
                    okText: "取消"
                })
            }
        })
    }

    formRef = React.createRef();

    onReset = () => {
        this.formRef.current.resetFields();
    }

    render() {

        return (
            <div>
                <Card>
                    <Form
                        {...this.formItemLayout}
                        layout="inline"
                        ref={this.formRef}
                        initialValues={
                            {
                                stock: 'all'
                            }
                        }
                    >
                        <Form.Item label="关键字" name="keywords">
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="买入时间"
                            style={{ width: 425 }}
                        >
                            <Form.Item
                                style={{
                                    display: 'inline-block',
                                    width: 'calc(50% - 12px)',
                                    marginRight: 0
                                }}
                                name="start"
                            >
                                <DatePicker placeholder="起始时间" style={{ width: 130 }} />
                            </Form.Item>
                            <span
                                style={{
                                    display: 'inline-block',
                                    width: '24px',
                                    lineHeight: '32px',
                                    textAlign: 'center',
                                }}
                            > - </span>
                            <Form.Item
                                style={{
                                    display: 'inline-block',
                                    width: 'calc(50% - 12px)',
                                    marginRight: 0
                                }}
                                name="end"
                            >
                                <DatePicker placeholder="终止时间" style={{ width: 130 }} />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item label="库存" name="stock">
                            <Select>
                                <Select.Option value="all">全部</Select.Option>
                                <Select.Option value="sold">已卖</Select.Option>
                                <Select.Option value="notsold">未卖</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary">查询</Button>
                        </Form.Item>
                        <Form.Item>
                            <Button onClick={this.onReset}>重置</Button>
                        </Form.Item>
                    </Form>
                </Card>
                <Card>
                    <SneakerTable
                        columns={this.columns}
                        dataSource={this.state.dataSource}
                    />
                </Card>
            </div>
        )
    }
}