import React from 'react';
import { Modal, Button, Row, Col } from 'antd';
import './style.css';

const ModalNote = ({ isModalVisible, setIsModalVisible }) => {
    return (
        <Modal
            title="Ghi chú"
            visible={isModalVisible}
            onOk={() => setIsModalVisible(false)}
            onCancel={() => setIsModalVisible(false)}
            cancelButtonProps={{
                style: {
                    display: 'none',
                },
            }}
        >
            <Row gutter={[24, 24]} className="card_toolbar-note">
                <Col span={12}>
                    <p className="note_priority">Độ ưu tiên</p>
                    <div>
                        <span className="note_priority-heigth">Cao</span>
                        <span className="note_priority-medium">Trung bình</span>
                        <span className="note_priority-low">Thấp</span>
                    </div>
                </Col>
                <Col span={12} className="note_priority-middle">
                    <p className="note_priority">Tình trạng công việc</p>
                    <div>
                        <span className="note_priority-success">Hoàn thành</span>
                        <span className="note_priority-overdure">Quá hạn</span>
                    </div>
                </Col>
                <Col span={12} style={{ height: '100%' }}>
                    <p className="note_priority">Trạng thái công việc</p>
                    <div className="note_priority-statustask">
                        <div className="note_priority-statustask-status"></div>
                        <div className="note_priority-arrow1"></div>
                        <div className="note_priority-arrow2"></div>
                        <div className="note_priority-arrow3"></div>
                    </div>
                </Col>
            </Row>
        </Modal>
    );
};

export default ModalNote;
