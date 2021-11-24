import React, { useState } from 'react';
import { Modal, Radio, Input, Space, Row, Col, Select } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { API_URL } from '../../apis/fetchData';

const { Option } = Select;

const ModalReactFlow = ({
    loadding,
    setLoading,
    callback,
    setCallback,
    isModalVisible,
    setIsModalVisible,
    dataQuestion,
}) => {
    const [isUser, setIsUser] = useState(false);
    const [isTarget, setIsTarget] = useState(true);
    const { handleSubmit, control, setValue } = useForm();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = async (data) => {
        setLoading(true);
        const newData = {
            id: data.id,
            data: { label: data.label },
            position: { x: 250, y: 250 },
            id_source: data.id_source,
            id_target: isTarget ? data.id : data.id_target,
            input_user: data.input_user,
            type: data.type,
        };

        const res = await axios.post(`${API_URL}/api/chatbot`, newData);

        setCallback(!callback);
        setIsModalVisible(false);
        setLoading(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div>
            <Modal title="Thêm câu hỏi" visible={isModalVisible} onOk={handleSubmit(handleOk)} onCancel={handleCancel}>
                <Row>
                    <Col span={24}>
                        <Row gutter={[12, 12]}>
                            <Col span={8}>Kiểu node</Col>
                            <Col span={16}>
                                <Controller
                                    name="type"
                                    defaultValue="input"
                                    control={control}
                                    render={({ field }) => (
                                        <Radio.Group
                                            {...field}
                                            value={field.value}
                                            onChange={(e) => field.onChange(e.target.value)}
                                        >
                                            <Space>
                                                <Radio value="input">Input</Radio>
                                                <Radio value="default">Default</Radio>
                                                <Radio value="output">Output</Radio>
                                            </Space>
                                        </Radio.Group>
                                    )}
                                />
                            </Col>
                            <Col span={8}>Lựa chọn / Trả lời</Col>
                            <Col span={16}>
                                <Controller
                                    name="input_user"
                                    defaultValue={false}
                                    control={control}
                                    render={({ field }) => (
                                        <Radio.Group
                                            {...field}
                                            value={field.value}
                                            onChange={(e) => {
                                                setIsUser(e.target.value);
                                                field.onChange(e.target.value);
                                            }}
                                        >
                                            <Space>
                                                <Radio value={false}>Lựa chọn</Radio>
                                                <Radio value={true}>Trả lời</Radio>
                                            </Space>
                                        </Radio.Group>
                                    )}
                                />
                            </Col>
                            {!isUser && (
                                <>
                                    <Col span={8}>Mã câu hỏi</Col>
                                    <Col span={16}>
                                        <Controller
                                            name="id"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => <Input {...field} />}
                                        />
                                    </Col>
                                    <Col span={8}>Câu hỏi</Col>
                                    <Col span={16}>
                                        <Controller
                                            name="label"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => <Input {...field} />}
                                        />
                                    </Col>
                                    <Col span={8}>Câu hỏi nguồn</Col>
                                    <Col span={16}>
                                        <Controller
                                            name="id_source"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => (
                                                <Select
                                                    value={field.value}
                                                    style={{ width: '100%' }}
                                                    onChange={(val) => field.onChange(val)}
                                                >
                                                    <Option value="">Không chọn</Option>
                                                    {dataQuestion &&
                                                        dataQuestion.length > 0 &&
                                                        dataQuestion.map((ques) => (
                                                            <Option value={ques.id}>{ques.text}</Option>
                                                        ))}
                                                </Select>
                                            )}
                                        />
                                    </Col>
                                    <Col span={8}>Câu hỏi mục tiêu</Col>
                                    <Col span={16}>
                                        <Radio.Group
                                            value={isTarget}
                                            onChange={(e) => {
                                                setIsTarget(e.target.value);
                                            }}
                                            defaultValue={true}
                                        >
                                            <Space>
                                                <Radio value={true}>Câu hỏi hiện tại</Radio>
                                                <Radio value={false}>Lựa chọn</Radio>
                                            </Space>
                                        </Radio.Group>
                                        {!isTarget && (
                                            <Controller
                                                name="id_target"
                                                control={control}
                                                defaultValue=""
                                                render={({ field }) => (
                                                    <Select
                                                        value={field.value}
                                                        style={{ width: '100%' }}
                                                        onChange={(val) => field.onChange(val)}
                                                    >
                                                        <Option value="">Không chọn</Option>
                                                        {dataQuestion &&
                                                            dataQuestion.length > 0 &&
                                                            dataQuestion.map((item) => (
                                                                <Option value={item.id}>{item.text}</Option>
                                                            ))}
                                                    </Select>
                                                )}
                                            />
                                        )}
                                    </Col>
                                </>
                            )}
                        </Row>
                    </Col>
                </Row>
            </Modal>
        </div>
    );
};

export default ModalReactFlow;
