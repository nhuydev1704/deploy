import React, { useState } from 'react';
import { Button, Card, Spin } from 'antd';
import ReactFlowChatBot from '../components/ReactFlow';
import ModalReactFlow from '../components/ReactFlow/ModalReactFlow';

const ChatBotCase = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [dataQuestion, setDataQuestion] = useState([]);
    const [callback, setCallback] = useState(false);
    const [loadding, setLoading] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    return (
        <Spin spinning={loadding} tip="Đang tải dữ liệu...">
            <Card
                title="Training ChatBot (* Chat bot case * )"
                className="custom_card-chatbot"
                extra={<Button onClick={showModal}>Thêm câu hỏi</Button>}
            >
                <ReactFlowChatBot
                    setLoading={setLoading}
                    callback={callback}
                    setCallback={setCallback}
                    setDataQuestion={setDataQuestion}
                    loadding={loadding}
                />
                <ModalReactFlow
                    dataQuestion={dataQuestion}
                    setIsModalVisible={setIsModalVisible}
                    isModalVisible={isModalVisible}
                    setCallback={setCallback}
                    callback={callback}
                    setLoading={setLoading}
                    loadding={loadding}
                />
            </Card>
        </Spin>
    );
};

export default ChatBotCase;
