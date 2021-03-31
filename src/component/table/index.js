import React from 'react';
import { Table as SneakerTable, Card, Modal } from 'antd';
import Axios from '../../axios';


export default class Table extends React.Component {

    state = {
        visible: true
    }

    componentDidMount() {
        Axios.ajax({
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

    render() {
        const columns = [
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

        return (
            <div>
                <Card title="表单">
                    <SneakerTable
                        columns={columns}
                        dataSource={this.state.dataSource}
                    />
                </Card>
            </div>
        )
    }
}