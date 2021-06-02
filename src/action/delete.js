import React from 'react';
import { Card, Modal, Row, Col, Form } from 'antd';

export default class DeleteModal extends React.Component {

    render() {
        const selectedLayout = {
            span: 12
        }
        const selectedContent = this.props.selectedRows.map((item, index) => {
            const title = {
                title: `所选鞋款 id: ${item.newId}`
            }
            return (
                <div className="confrim-delete" key={index}>
                    <Card {...title}>
                        <Form>
                            <Row>
                                <Col {...selectedLayout}>
                                    <Form.Item label="鞋款">
                                        {item.title.rendered}
                                    </Form.Item>
                                </Col>
                                <Col {...selectedLayout}>
                                    <Form.Item label="尺码">
                                        {item.acf.size}
                                    </Form.Item>
                                </Col>
                                <Col {...selectedLayout}>
                                    <Form.Item label="买入价格">
                                        {item.acf.buy_price}
                                    </Form.Item>
                                </Col>
                                <Col {...selectedLayout}>
                                    <Form.Item label="是否卖出">
                                        {item.acf.status}
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Card>

                </div>
            )
        })
        return (
            <Modal
                title="删除记录"
                visible={this.props.visible}
                onCancel={this.props.onCloseDelete}
                okText="确定"
                cancelText="取消"
                onOk={this.props.onDelete}
            >
                <div className="delect-content-container">
                    {selectedContent}
                </div>
            </Modal>
        )
    }
}






