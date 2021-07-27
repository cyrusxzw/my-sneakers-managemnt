import './index.less';
import React from 'react';
import { Table as SneakerTable, Card, Modal, Form, Input, Button, Select, DatePicker, message, InputNumber } from 'antd';
import moment from 'moment';
import Axios from '../../axios';
import axios from 'axios';
import Util from '../../utils';
import Search from '../search.js';
import Add from '../../action/add.js';
import Delete from '../../action/delete.js';
import Excel from '../excel.js';

export default class Table extends React.Component {

    state = {
        dataSource: [],
        totalPage: null,
        currentPage: 1,
        totalRecords: null,
        authenticKey: null,
        selectedRowKeys: [],
        selectedRows: [],
        visible: false,
        editVisible: false,
        addVisible: false,
        deleteConfirmVisible: false,
        buttonDisabled: true,
        hiddenDeposit: true,
        disabled: true,
        isLoggedin: false
    }

    formItemLayout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };

    componentDidMount() {
        this.checkLogin();
    }

    checkLogin = () => {
        const userName = localStorage.userName;

        if (userName) {
            this.setState({
                isLoggedin: true
            })
            this.request();
            Util.auth().then(key => {
                this.setState({
                    authenticKey: key
                })
            })
        } else {
            Modal.error({
                title: "无访问权限",
                content: "请先登录！",
                onOk: () => {
                    window.location.href = `${window.location.protocol}//${window.location.host}`
                }
            })
        }
    }

    request = () => {
        Axios.ajax({
            url: "https://solegood.com.au/wp-json/wp/v2/posts",
            method: "get",
            isShowLoading: true
        }).then((res) => {
            const totalPages = Util.getTotalPages(res.headers['x-wp-totalpages']);
            const totalRecords = res.headers['x-wp-total'];
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
                    let totalLength = arr.length;
                    //console.log(totalLength)
                    const list = arr.map((item, index) => {
                        item.key = index;
                        item = {
                            ...item,
                            newId: totalLength - index
                        }
                        return item;
                    })
                    this.setState({
                        totalRecords,
                        selectedRowKeys: [],
                        selectedRows: [],
                        dataSource: list,
                        buttonDisabled: true,
                        deleteConfirmVisible: false,
                    })

                } else {
                    Modal.error({
                        visible: this.state.visible,
                        title: '错误',
                        content: "连接错误，无法访问数据！",
                        okText: "取消"
                    })
                }

            })).catch(errors => new Error(`数据无法加载！请联系管理员！---${errors}`))
        })
    }

    formUpdate = React.createRef();

    onOpenAdd = () => {
        this.setState({
            addVisible: true
        })
    }

    onCloseAdd = () => {
        this.setState({
            addVisible: false,
        })
    }

    addNewSneaker = (record) => {
        const { authenticKey } = this.state;
        Axios.ajax({
            url: 'https://solegood.com.au/wp-json/wp/v2/posts',
            method: 'post',
            isShowLoading: false,
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'Authorization': `Bearer ${authenticKey}`
            },
            data: {
                title: record.sneaker,
                content: '',
                status: 'publish',
                acf_fields: {
                    size: record.size,
                    buy_price: record.buyPrice,
                    buy_date: record.buyDate,
                    buyer: record.buyer,
                    status: record.status,
                    deposit_amount: record.depositAmount,
                    sold_date: record.soldDate,
                    sold_price: record.soldPrice,
                    remarks: record.remarks
                }
            }
        }).then((res) => {
            this.setState({
                addVisible: false,
            })
            if (res.status === 201) {
                const sneaker = res.data.title.rendered;
                this.request();
                message.success(`鞋款: ${sneaker}，已经成功添加!`);
            } else {
                message.error(`添加失败!`);
            }
        })
    }

    onOpenDelete = () => {
        this.setState({
            deleteConfirmVisible: true
        })
    }

    onCloseDelete = () => {
        this.setState({
            deleteConfirmVisible: false
        })
    }

    onDelete = () => {
        const { selectedRows, authenticKey } = this.state;
        const ids = selectedRows.map((item) => {
            return item.id;
        })
        const newIds = selectedRows.map((item) => {
            return item.newId;
        })
        //console.log(ids);
        const allRequests = ids.map((item) => {
            return (
                Axios.ajax({
                    url: `https://solegood.com.au/wp-json/wp/v2/posts/${item}?force=true`,
                    isShowLoading: true,
                    method: 'delete',
                    headers: {
                        'Content-Type': 'application/json',
                        'accept': 'application/json',
                        'Authorization': `Bearer ${authenticKey}`
                    }
                })
            )
        })
        axios.all(allRequests).then(axios.spread((...responses) => {
            const isOK = responses.every((element) => element.status === 200);
            if (isOK) {
                this.setState({
                    selectedRowKeys: [],
                    selectedRows: [],
                    deleteConfirmVisible: false,
                    buttonDisabled: true
                })
                this.request();
                message.success(`记录:${newIds}已经成功删除！`);
            } else {
                message.error("删除失败了！");
            }

        })).catch(errors => new Error(`失败了！请联系管理员！---${errors}`))
    }

    onOpenEdit = () => {
        const { selectedRowKeys, selectedRows } = this.state;
        if (selectedRowKeys.length > 1) {
            message.error("只能选择一行进行编辑！");
        } else {
            this.setState({
                editVisible: true
            })
            const isReady = this.formUpdate.current;
            const base = selectedRows[0].acf;
            const baseValues = {
                sneaker: selectedRows[0].title.rendered,
                size: base.size,
                status: base.status,
                buyPrice: base.buy_price,
                soldPrice: base.sold_price,
                buyDate: moment(base.buy_date, 'DD-MM-YYYY'),
                soldDate: base.sold_date ? moment(base.sold_date, 'DD-MM-YYYY') : "",
                buyer: base.buyer,
                remarks: base.remarks
            }
            let formValues = null;
            if (base.status === "已收定金") {
                formValues = { ...baseValues, depositAmount: base.deposit_amount }
                this.setState({
                    hiddenDeposit: false
                })
            } else {
                formValues = { ...baseValues, depositAmount: "" }
                this.setState({
                    hiddenDeposit: true
                })
            }

            this.setState({
                initialValues: formValues
            })

            if (isReady) {
                if (base.status === "已收定金") {
                    this.formUpdate.current.setFieldsValue({
                        ...baseValues,
                        depositAmount: base.deposit_amount
                    })
                    this.setState({
                        hiddenDeposit: false
                    })
                } else {
                    this.formUpdate.current.setFieldsValue({
                        ...baseValues,
                        depositAmount: ""
                    });
                    this.setState({
                        hiddenDeposit: true
                    })
                }

            }
        }
    }

    editSneakerForm = (record) => {
        const { authenticKey, selectedRows } = this.state;
        const postId = selectedRows[0].id;
        if (record.buyDate) {
            record.buyDate.add(1, "day");
        }
        if (!!record.soldDate) {
            record.soldDate.add(1, "day");
        }
        this.setState({
            editVisible: false
        })
        Axios.ajax({
            url: `https://solegood.com.au/wp-json/wp/v2/posts/${postId}`,
            method: 'put',
            isShowLoading: false,
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'Authorization': `Bearer ${authenticKey}`
            },
            data: {
                title: record.sneaker,
                content: '',
                acf_fields: {
                    size: record.size,
                    buy_price: record.buyPrice,
                    buy_date: record.buyDate,
                    buyer: record.buyer,
                    status: record.status,
                    deposit_amount: record.depositAmount,
                    sold_date: record.soldDate,
                    sold_price: record.soldPrice,
                    remarks: record.remarks
                }
            }
        }).then((res) => {
            if (res.status === 200) {
                this.request();
                message.success(`已经成功编辑!`);
            } else {
                message.error(`编辑失败!`);
            }
        })
    }

    onSelectChange = (selectedRowKeys, selectedRows) => {
        if (selectedRowKeys.length === 0) {
            this.setState({
                selectedRowKeys,
                selectedRows,
                buttonDisabled: true
            });
        } else {
            this.setState({
                selectedRowKeys,
                selectedRows,
                buttonDisabled: false
            });
        }
    };

    onRowClick = (record) => {
        const selectedRowKeys = [...this.state.selectedRowKeys];
        const selectedRows = [...this.state.selectedRows];
        if (selectedRowKeys.indexOf(record.key) >= 0) {
            selectedRowKeys.splice(selectedRowKeys.indexOf(record.key), 1);
            selectedRows.splice(selectedRows.indexOf(record), 1);
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

    onStatusChange = (value) => {
        if (value === "已收定金") {
            this.setState({
                hiddenDeposit: false
            })
        } else {
            this.setState({
                hiddenDeposit: true
            })
        }
    }

    handleSearch = (data, total) => {
        this.setState({
            dataSource: data,
            totalRecords: total
        })
    }

    render() {
        const { selectedRowKeys, dataSource, buttonDisabled } = this.state;
        const columns = [
            {
                title: 'id',
                dataIndex: 'newId',
                key: 'newId',
            },
            {
                title: '鞋款',
                dataIndex: 'title',
                key: 'sneaker',
                render: (title) => {
                    return title.rendered
                }
            },
            {
                title: '尺码',
                dataIndex: 'acf',
                key: 'size',
                render: (acf) => {
                    return acf.size
                }
            },
            {
                title: '状态',
                dataIndex: 'acf',
                key: 'status',
                render: (acf) => {
                    if (acf.status === "已收定金") {
                        return `${acf.status}: ${acf.deposit_amount}`
                    }
                    return acf.status
                }
            },
            {
                title: '买入价',
                dataIndex: 'acf',
                key: 'buyPrice',
                render: (acf) => {
                    return acf.buy_price
                }
            },
            {
                title: '卖出价',
                dataIndex: 'acf',
                key: 'soldPrice',
                render: (acf) => {
                    return acf.sold_price
                }
            },
            {
                title: '买入时间',
                dataIndex: 'acf',
                key: 'buyDate',
                render: (acf) => {
                    return acf.buy_date
                },
                sorter: (a, b) => {
                    return moment(a.acf.buy_date, 'DD-MM-YYYY').unix() - moment(b.acf.buy_date, 'DD-MM-YYYY').unix()
                }
            },
            {
                title: '卖出时间',
                dataIndex: 'acf',
                key: 'soldDate',
                render: (acf) => {
                    return acf.sold_date
                }
            },
            {
                title: '买家',
                dataIndex: 'acf',
                key: 'buyer',
                render: (acf) => {
                    return acf.buyer
                }
            },
            {
                title: '利润',
                dataIndex: 'acf',
                key: 'profit',
                sorter: (a, b) => {
                    const a_profit = typeof (a.acf.sold_price) == 'undefined' ? 0 - a.acf.buy_price : a.acf.sold_price - a.acf.buy_price;
                    const b_profit = typeof (b.acf.sold_price) == 'undefined' ? 0 - b.acf.buy_price : b.acf.sold_price - b.acf.buy_price;
                    return (
                        a_profit - b_profit
                    )
                },
                render: (acf) => {
                    if (acf.sold_price) {
                        return acf.sold_price - acf.buy_price
                    } else {
                        return 0 - acf.buy_price
                    }
                }
            },
            {
                title: '备注',
                dataIndex: 'acf',
                key: 'remarks',
                render: (acf) => {
                    return acf.remarks
                }
            }
        ]

        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };

        const disabled = {
            disabled: buttonDisabled ? "disabled" : ""
        };

        const updateDisabled = {
            disabled: buttonDisabled || selectedRowKeys.length > 1 ? "disabled" : ""
        }

        return (
            <div className="table-container">
                <Search dataSource={this.state.dataSource} handleSearch={this.handleSearch} request={this.request} />
                <Card className="inner-table">
                    <div className="btn-container">
                        <Button type="primary" onClick={this.onOpenAdd}>添加记录</Button>
                        <Button danger onClick={this.onOpenDelete} {...disabled}>删除记录</Button>
                        <Button type="primary" ghost onClick={this.onOpenEdit} {...updateDisabled}>编辑记录</Button>
                        <Excel data={this.state.dataSource} />
                    </div>
                    <SneakerTable
                        columns={columns}
                        dataSource={dataSource}
                        rowSelection={rowSelection}
                        pagination={Util.pagination(this.state.currentPage, this.state.totalPage, this.state.totalRecords, (current) => {
                            this.setState({
                                currentPage: current
                            })
                        })}
                        onRow={record => {
                            return {
                                onClick: () => {
                                    this.onRowClick(record);
                                }
                            }
                        }}
                    />
                </Card>
                <Add addNewSneaker={this.addNewSneaker} visible={this.state.addVisible} onCloseAdd={this.onCloseAdd} />
                <Delete onDelete={this.onDelete} onCloseDelete={this.onCloseDelete} selectedRows={this.state.selectedRows} visible={this.state.deleteConfirmVisible} />
                <Modal
                    title="编辑记录"
                    visible={this.state.editVisible}
                    onCancel={() => {
                        this.setState({
                            editVisible: false
                        })
                    }}
                    footer={
                        [
                            <Button key="cancel" onClick={() => {
                                this.setState({
                                    editVisible: false
                                })
                            }}>
                                取消
                            </Button>,
                            <Button form="editSneakerForm" key="submit" htmlType="submit">
                                确定
                            </Button>
                        ]
                    }
                >
                    <div className="edit-content-container">
                        <Form
                            id="editSneakerForm"
                            ref={this.formUpdate}
                            initialValues={this.state.initialValues}
                            onFinish={this.editSneakerForm}
                        >
                            <Form.Item
                                label="鞋款"
                                name="sneaker"
                                rules={[{ required: true, message: '产品名必须填写!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item label="尺码" name="size">
                                <Input />
                            </Form.Item>
                            <Form.Item label="状态" name="status">
                                <Select
                                    placeholder="请选择"
                                    onChange={this.onStatusChange}
                                >
                                    <Select.Option value="已卖">已卖</Select.Option>
                                    <Select.Option value="已收定金">已收定金</Select.Option>
                                    <Select.Option value="未卖">未卖</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                hidden={this.state.hiddenDeposit}
                                label="付了多少定金?"
                                name="depositAmount"
                            >
                                <InputNumber min={0} style={{ 'width': '100%' }} />
                            </Form.Item>
                            <Form.Item
                                label="买入价"
                                name="buyPrice"
                                rules={[{ required: true, message: '买入价必须填写!' }]}
                            >
                                <InputNumber min={0} style={{ 'width': '100%' }} />
                            </Form.Item>
                            <Form.Item label="卖出价" name="soldPrice">
                                <InputNumber min={0} style={{ 'width': '100%' }} />
                            </Form.Item>
                            <Form.Item
                                label="买入时间"
                                name="buyDate"
                                rules={[{ required: true, message: '买入价必须填写!' }]}
                            >
                                <DatePicker
                                    style={{ width: "100%" }}
                                    placeholder="请选择时间"
                                />
                            </Form.Item>
                            <Form.Item label="卖出时间" name="soldDate">
                                <DatePicker style={{ width: "100%" }} placeholder="请选择时间" />
                            </Form.Item>
                            <Form.Item label="买家" name="buyer">
                                <Input />
                            </Form.Item>
                            <Form.Item label="备注" name="remarks">
                                <Input />
                            </Form.Item>
                        </Form>
                    </div>
                </Modal>

            </div>
        )
    }
}