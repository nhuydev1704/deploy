import React from 'react';
import { Button, Card, Col, DatePicker, Input, PageHeader, Row } from 'antd';
import { useHistory } from 'react-router';

const CreateEmployee = () => {
    const history = useHistory();

    function onChange(date, dateString) {
        console.log(date, dateString);
    }

    return (
        <>
            <PageHeader
                style={{ marginBottom: '20px' }}
                ghost={false}
                onBack={() => history.goBack()}
                title="Quản lý nhân viên"
                extra={[
                    <Button key="1" type="primary">
                        Lưu
                    </Button>,
                ]}
            ></PageHeader>
            <Card>
                <Row gutter={[40, 0]}>
                    <Col md={24} lg={12}>
                        <Row gutter={[0, 20]}>
                            <Col span={24}>
                                <Row>
                                    <Col span={6}>Họ tên</Col>
                                    <Col span={18}>
                                        <Input placeholder="Nhập họ tên nhân viên" />
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={24}>
                                <Row>
                                    <Col span={6}>Ngày sinh</Col>
                                    <Col span={18}>
                                        <DatePicker
                                            style={{ width: '100%' }}
                                            placeholder="Chọn ngày sinh"
                                            onChange={onChange}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={24}>
                                <Row>
                                    <Col span={6}>Địa chỉ</Col>
                                    <Col span={18}>
                                        <Input placeholder="Nhập địa chỉ" />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={24} lg={12}>
                        <Row gutter={[0, 20]}>
                            <Col span={24}>
                                <Row>
                                    <Col span={6}>Ca làm việc</Col>
                                    <Col span={18}>
                                        <Input placeholder="Chọn ca làm việc" />
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={24}>
                                <Row>
                                    <Col span={6}>Lương</Col>
                                    <Col span={18}>
                                        <Input placeholder="Nhập lương" />
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={24}>
                                <Row>
                                    <Col span={6}>Chức vụ</Col>
                                    <Col span={18}>
                                        <Input placeholder="Nhập chức vụ" />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>
        </>
    );
};

export default CreateEmployee;
