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
                title: "???????????????????????????",
                okText: "??????",
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
                        label="?????????" name="keywords">
                        <Input placeholder="?????????????????????" />
                    </Form.Item>
                    <Form.Item label="????????????">
                        <Form.Item
                            style={{
                                display: 'inline-block',
                                marginRight: 0
                            }}
                            name="start"
                        >
                            <DatePicker placeholder="????????????" style={{ width: 130 }} />
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
                            <DatePicker placeholder="????????????" style={{ width: 130 }} />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item label="??????" name="stock">
                        <Select style={{ width: 100 }}>
                            <Select.Option value="all">??????</Select.Option>
                            <Select.Option value="??????">??????</Select.Option>
                            <Select.Option value="????????????">????????????</Select.Option>
                            <Select.Option value="??????">??????</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" onClick={this.handleMatch}>??????</Button>
                    </Form.Item>
                    <Form.Item>
                        <Button onClick={this.onReset}>??????</Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}