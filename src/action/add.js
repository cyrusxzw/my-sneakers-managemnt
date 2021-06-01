import React from 'react';
import Draggable from 'react-draggable';
import { Modal, Form, Input, Button, Select, DatePicker, InputNumber } from 'antd';


export default class Add extends React.Component {
    state = {
        hiddenDeposit: true,
        disabled: true,
        bounds: { left: 0, top: 0, bottom: 0, right: 0 },
    }
    draggleRef = React.createRef();

    onStart = (event, uiData) => {
        const { clientWidth, clientHeight } = window?.document?.documentElement;
        const targetRect = this.draggleRef?.current?.getBoundingClientRect();
        this.setState({
            bounds: {
                left: -targetRect?.left + uiData?.x,
                right: clientWidth - (targetRect?.right - uiData?.x),
                top: -targetRect?.top + uiData?.y,
                bottom: clientHeight - (targetRect?.bottom - uiData?.y),
            }
        });
    };

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

    addRecord = (data) => {
        this.props.addNewSneaker(data);
    }

    closeAdd = () => {
        this.props.onCloseAdd();
    }

    render() {
        return (
            <Modal
                visible={this.props.visible}
                title={
                    <div
                        style={{
                            width: '100%',
                            cursor: 'move',
                        }}
                        onMouseOver={() => {
                            if (this.state.disabled) {
                                this.setState({
                                    disabled: false
                                })
                            }
                        }}
                        onMouseOut={() => {
                            this.setState({
                                disabled: true
                            })
                        }}
                        onFocus={() => { }}
                        onBlur={() => { }}
                    >
                        添加记录
                        </div>
                }
                onCancel={() => {
                    this.closeAdd();
                }}
                footer={
                    [
                        <Button key="cancel" onClick={() => {
                            this.closeAdd();
                        }}>
                            取消
                            </Button>,
                        <Button form="addSneakerForm" key="submit" htmlType="submit">
                            确定
                            </Button>
                    ]
                }
                modalRender={modal => (
                    <Draggable
                        disabled={this.state.disabled}
                        bounds={this.state.bounds}
                        onStart={(event, uiData) => this.onStart(event, uiData)}
                    >
                        <div ref={this.draggleRef}>{modal}</div>
                    </Draggable>
                )}
            >
                <div className="add-content-container">
                    <Form
                        id="addSneakerForm"
                        onFinish={this.addRecord}
                    >
                        <Form.Item
                            label="鞋款"
                            name="sneaker"
                            rules={[{ required: true, message: '产品名必须填写!' }]}>
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
                            <DatePicker style={{ width: "100%" }} placeholder="请选择时间" />
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
        )
    }
}
