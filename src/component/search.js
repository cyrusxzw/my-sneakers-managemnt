import React from 'react';
import { Card, Form, Input, DatePicker, Select, Button, Modal } from 'antd';
import moment from 'moment';


export default class Search extends React.Component {

    formRef = React.createRef();

    onReset = () => {
        const values = this.formRef.current.getFieldsValue();
        console.log(values);
        this.props.request();
        this.formRef.current.resetFields();
    }

    handleMatch = () => {
        const data = this.props.dataSource;
        const keywords = this.formRef.current.getFieldValue("keywords");
        const stock = this.formRef.current.getFieldValue("stock");
        const start = this.formRef.current.getFieldValue("start");
        const end = this.formRef.current.getFieldValue("end");
        let matchedData = [];

        if (!keywords && !start && !end && stock === "all") {
            this.props.handleSearch(data);
            return;
        }

        if (stock !== "all") {
            if ((keywords && start) || (keywords && end)) {
                matchedData = data.filter(item => item.title.rendered.includes(keywords) && stock === item.acf.status && start.isSameOrBefore(moment(item.acf.buy_date, 'DD-MM-YYYY'), 'day') && moment(item.acf.buy_date, 'DD-MM-YYYY').isBefore(end));
            } else if (keywords) {
                matchedData = data.filter(item => item.title.rendered.includes(keywords) && stock === item.acf.status);
                console.log(matchedData)
            } else if (start || end) {
                matchedData = data.filter(item => stock === item.acf.status && start.isSameOrBefore(moment(item.acf.buy_date, 'DD-MM-YYYY'), 'day') && moment(item.acf.buy_date, 'DD-MM-YYYY').isBefore(end));
            } else {
                matchedData = data.filter(item => stock === item.acf.status);
            }
        } else {
            if ((keywords && start) || (keywords && end)) {
                matchedData = data.filter(item => item.title.rendered.includes(keywords) && start.isSameOrBefore(moment(item.acf.buy_date, 'DD-MM-YYYY'), 'day') && moment(item.acf.buy_date, 'DD-MM-YYYY').isBefore(end));
            } else if (keywords) {
                matchedData = data.filter(item => item.title.rendered.includes(keywords));
                console.log(matchedData)
            } else if (start || end) {
                matchedData = data.filter(item => start.isSameOrBefore(moment(item.acf.buy_date, 'DD-MM-YYYY'), 'day') && moment(item.acf.buy_date, 'DD-MM-YYYY').isBefore(end));
            }
        }

        if (matchedData.length === 0) {
            Modal.error({
                title: "对不起，查无此鞋！",
                okText: "返回",
                onOk: () => { this.onReset() }
            });
        } else {
            const total = matchedData.length;
            this.props.handleSearch(matchedData, total);
        }
    }

    render() {
        return (
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
                    <Form.Item
                        label="关键字" name="keywords">
                        <Input placeholder="请输入鞋款名称" />
                    </Form.Item>
                    <Form.Item label="买入时间">
                        <Form.Item
                            style={{
                                display: 'inline-block',
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
                                marginRight: 0
                            }}
                            name="end"
                        >
                            <DatePicker placeholder="终止时间" style={{ width: 130 }} />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item label="库存" name="stock">
                        <Select style={{ width: 100 }}>
                            <Select.Option value="all">全部</Select.Option>
                            <Select.Option value="已卖">已卖</Select.Option>
                            <Select.Option value="已收定金">已收定金</Select.Option>
                            <Select.Option value="未卖">未卖</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" onClick={this.handleMatch}>查询</Button>
                    </Form.Item>
                    <Form.Item>
                        <Button onClick={this.onReset}>重置</Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}