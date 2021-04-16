import './index.less';
import React from 'react';
import { Table as SneakerTable, Card, Modal, Form, Input, Button, Select, DatePicker } from 'antd';
import Axios from '../../axios';


export default class Table extends React.Component {

    state = {
        selectedRowKeys: [],
        selectedRows: [],
        visible: false,
        deleteConfirmVisible: false,
        buttonDisabled: true
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
        this.request();
    }

    request = () => {
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

    onAdd = () => {

    }

    onOpenDelete = () => {
        this.setState({
            deleteConfirmVisible: true
        })
    }

    onDelete = () => {


    }

    onSelectChange = (selectedRowKeys, selectedRows) => {
        this.setState({
            selectedRowKeys,
            selectedRows,
            buttonDisabled: false
        });
    };

    onRowClick = (record) => {
        const selectedRowKeys = [...this.state.selectedRowKeys];
        const selectedRows = [...this.state.selectedRows];
        if (selectedRowKeys.indexOf(record.key) >= 0) {
            selectedRowKeys.splice(selectedRowKeys.indexOf(record.key), 1);
            selectedRows.splice(selectedRowKeys.indexOf(record), 1);
        } else {
            selectedRowKeys.push(record.key);
            selectedRows.push(record);
        }
        const buttonDisabled = selectedRowKeys.length > 0 ? false : true;
        this.setState({
            selectedRowKeys,
            selectedRows,
            buttonDisabled
        });
    }

    render() {
        const { selectedRowKeys, selectedRows } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const selectedContent = selectedRows.map((item, index) => {
            const title = {
                title: `所选鞋款 id: ${item.id}`
            }
            return (
                <div className="confrim-delete" key={index}>
                    <Card {...title}>
                        <Form>
                            <Form.Item label="鞋款">
                                {item.sneaker}
                            </Form.Item>
                            <Form.Item label="尺码">
                                {item.size}
                            </Form.Item>
                        </Form>
                    </Card>

                </div>
            )
        })

        const disabled = {
            disabled: this.state.buttonDisabled ? "disabled" : ""
        };

        return (
            <div className="table-container">
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
                <Card className="inner-table">
                    <div className="btn-container">
                        <Button type="primary" onClick={this.onAdd}>添加记录</Button>
                        <Button danger onClick={this.onOpenDelete} {...disabled}>删除记录</Button>
                        <Button onClick={this.onEdit}>编辑记录</Button>
                    </div>
                    <SneakerTable
                        columns={this.columns}
                        dataSource={this.state.dataSource}
                        rowSelection={rowSelection}
                        onRow={record => {
                            return {
                                onClick: () => {
                                    this.onRowClick(record);
                                }
                            }
                        }}
                    />
                </Card>
                <Modal
                    title="删除记录"
                    visible={this.state.deleteConfirmVisible}
                    onCancel={() => {
                        this.setState({
                            deleteConfirmVisible: false
                        })
                    }}
                    onOk={this.onDelete}
                >
                    <div className="delect-content-container">
                        {selectedContent}
                    </div>
                </Modal>
            </div>
        )
    }
}