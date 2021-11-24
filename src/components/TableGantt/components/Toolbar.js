import { Button, Card, Col, Row, Space, Select } from 'antd';
import React, { useState } from 'react';
import './style.css';
import ModalNote from './ModalNote';
import { zoomToFit, zoom_in, zoom_out } from '../config/ZoomConfig';
import { FileSearchOutlined, ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons';
import { Slider } from 'antd';

const { Option } = Select;
const Toolbar = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleZoomChange = (e) => {
        if (props.onZoomChange) {
            props.onZoomChange(e.target.value);
        }
    };

    function handleChange(value) {
        props.setQuery(value);
    }

    function onAfterChange(value) {
        if (value < 220) return;
        props.setWidthGrid(value);
    }

    return (
        <Card className="card_toolbar-main" size="small">
            <Row justify="space-between" className="card_toolbar-gantt">
                {/* <Col xs={24} sm={24} lg={8} className="zoom-bar card_toolba-zoom">
                    <b style={{ marginRight: '4px' }}>Zooming: </b> */}
                {/* {zoomRadios}
                </Col> */}
                <Col span={9}>
                    <Slider
                        min={280}
                        max={500}
                        style={{ width: '480px' }}
                        defaultValue={500}
                        onAfterChange={onAfterChange}
                        defaultToolTip={false}
                    />
                </Col>
                <Col span={15} className="card_toolbar-note">
                    <Space style={{ float: 'right' }}>
                        <Select defaultValue="" onChange={handleChange}>
                            <Option value="">Tổng thể</Option>
                            <Option value="abc">Toàn bộ nhân viên</Option>
                            <Option value="nny">Nguyễn Như Ý</Option>
                            <Option value="bna">Bùi Ngọc Ánh</Option>
                            <Option value="vdhl">Vương Đình Hoàng Long</Option>
                            <Option value="nmd">Nguyễn Mạnh Đạt</Option>
                        </Select>
                        <Button onClick={zoomToFit}>
                            <FileSearchOutlined /> Zoom Fit
                        </Button>
                        <Button onClick={zoom_in}>
                            <ZoomInOutlined /> Phóng to
                        </Button>
                        <Button icon={<ZoomOutOutlined />} onClick={zoom_out}>
                            Thu nhỏ
                        </Button>
                        <Button onClick={() => setIsModalVisible(true)} type="primary">
                            Ghi chú
                        </Button>
                    </Space>
                </Col>
            </Row>
            <ModalNote isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
        </Card>
    );
};

export default React.memo(Toolbar);
