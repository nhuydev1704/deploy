import { ArrowDownOutlined, ArrowUpOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Card, Col, Divider, Image, Row, Statistic, Tooltip, Typography } from 'antd';
import { get } from 'lodash';
import moment from 'moment';
import React from 'react';
import NumberFormat from 'react-number-format';
import styled from 'styled-components';
import card2 from '../../../images/card2.png';
import card4 from '../../../images/card4.png';
const { Title } = Typography;

const CardCustom = styled(Card)`
    background: ${props => props.theme2 === 'true' ? '#fff' : '#141414'} !important;
    color: ${props => props.theme2 === 'true' ? '#000' : 'rgba(255, 255, 255, .65)'} !important;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 3px, rgba(0, 0, 0, 0.2) 0px 2px 3px;
    border-radius: 6px ;
    border: none;
    ${'' /* z-index: 999999; */}
    h2 {
        color: ${props => props.theme2 === 'true' ? '#000' : 'rgba(255, 255, 255, .65)'} !important;
    }
    .ant-card-head {
        color: ${props => props.theme2 === 'true' ? '#000' : 'rgba(255, 255, 255, .65)'} !important;
    }
    
`
function CardStatistic(props) {
    let theme = get(props, 'theme', '');
    let dataPayment = get(props, 'dataPayment', []);

    let total = 0;
    let totalProducts = 0;
    let totalPriceToday = 0;
    let todayPrice = 0;
    let totalOrderDay = 0;
    if (dataPayment && dataPayment.length > 0) {
        dataPayment.forEach((data, index) => {
            if (moment().format('YYYY-MM-DD') === moment(data?.createdAt).format('YYYY-MM-DD')) {
                totalOrderDay += 1;
            }
            totalProducts += parseInt(data?.cart?.length);
            data?.cart.forEach(cart => {
                total += parseInt(cart?.price);
                if (moment().format('YYYY-MM-DD') === moment(data?.createdAt).format('YYYY-MM-DD')) {
                    todayPrice += 1;
                    totalPriceToday += parseInt(cart?.price);
                }
            })
        });
    }

    return (
        <Row gutter={[16, 16]}>
            <Col xl={6} lg={12} md={24} sm={24} xs={24}>
                <CardCustom theme2={theme.toString()} size="small">
                    <Row justify="space-between">
                        Thống Kê Doanh Thu
                        <Tooltip title="Website https://shopcnpm.herokuapp.com">
                            <InfoCircleOutlined />
                        </Tooltip>
                    </Row>
                    <Title className="chart-title" level={2}>
                        <NumberFormat value={total && total > 0 && total} displayType={'text'} thousandSeparator={true} />
                    </Title>
                    <Row style={{ height: '48px' }}>
                        <Col span={24}>
                            Tổng số đơn hàng: {dataPayment.length}
                        </Col>
                        <Col span={24}>
                            Tổng sản phẩm bán được: {totalProducts}
                        </Col>
                    </Row>
                    <Divider style={{ margin: '10px 0' }} />
                    <Row><span style={{ paddingRight: '6px' }}>Hôm Nay</span> <NumberFormat value={totalPriceToday} displayType={'text'} thousandSeparator={true} /></Row>
                </CardCustom>
            </Col>
            <Col xl={6} lg={12} md={24} sm={24} xs={24}>
                <CardCustom theme2={theme.toString()} size="small">
                    <Row justify="space-between">
                        Thống Kê Sản phẩm
                        <Tooltip title="Xem chi tiết">
                            <InfoCircleOutlined />
                        </Tooltip>
                    </Row>
                    <Title className="chart-title" level={2}><NumberFormat value={get(props, 'totalProductItems', 0)} displayType={'text'} thousandSeparator={true} /></Title>
                    <Row justify="center" style={{ maxHeight: '48px', overflow: 'hidden' }}>
                        <Image
                            width='90%'
                            style={{ height: '100%', objectFit: 'cover' }}
                            src={card2}
                        />
                    </Row>
                    <Divider style={{ margin: '10px 0' }} />
                    <Row>
                        <Col span={12}>
                            <span style={{ paddingRight: '6px' }}>Sản phẩm mới: </span>
                            <NumberFormat value={get(props, 'todayProduct', 0)} displayType={'text'} thousandSeparator={true} />
                        </Col>
                        <Col span={12}>
                            <span style={{ paddingRight: '6px' }}>Hôm nay bán: </span>
                            <NumberFormat value={todayPrice} displayType={'text'} thousandSeparator={true} />
                        </Col>
                    </Row>
                </CardCustom>
            </Col>
            <Col xl={6} lg={12} md={24} sm={24} xs={24}>
                <CardCustom theme2={theme.toString()} size="small">
                    <Row justify="space-between">
                        Thống Kê khách hàng
                        <Tooltip title="Xem chi tiết">
                            <InfoCircleOutlined />
                        </Tooltip>
                    </Row>
                    <Title className="chart-title" level={2}>
                        <NumberFormat value={get(props, 'totalUser', 0)} displayType={'text'} thousandSeparator={true} />
                    </Title>
                    <Row style={{ height: '48px' }}>
                        <Col span={24}>
                            <Row align="middle">Khách hàng mua sản phẩm:
                                <Statistic
                                    title=""
                                    value={get(props, 'succesOrder', 0)}
                                    precision={2}
                                    valueStyle={{ color: '#3f8600', fontSize: '1rem' }}
                                    prefix={<ArrowUpOutlined />}
                                    suffix="%"
                                />
                            </Row>
                        </Col>
                        <Col span={24}>
                            <Row align="middle">
                                Khách hàng chưa mua:
                                <Statistic
                                    size="small"
                                    title=""
                                    value={get(props, 'cancelOrder', 0)}
                                    precision={2}
                                    valueStyle={{ color: '#cf1322', fontSize: '1rem' }}
                                    prefix={<ArrowDownOutlined />}
                                    suffix="%"
                                />
                            </Row>
                        </Col>
                    </Row>
                    <Divider style={{ margin: '10px 0' }} />
                    <Row><span style={{ paddingRight: '6px' }}>Hôm Nay</span>
                        <NumberFormat value={get(props, 'todayUser', 0)} displayType={'text'} thousandSeparator={true} />
                    </Row>
                </CardCustom>
            </Col>
            <Col xl={6} lg={12} md={24} sm={24} xs={24}>
                <CardCustom theme2={theme.toString()} size="small">
                    <Row justify="space-between">
                        Thống Kê Đơn hàng
                        <Tooltip title="Xem chi tiết">
                            <InfoCircleOutlined />
                        </Tooltip>
                    </Row>
                    <Title className="chart-title" level={2}>
                        <NumberFormat value={dataPayment && dataPayment.length} displayType={'text'} thousandSeparator={true} />
                    </Title>
                    <Row justify="center" style={{ maxHeight: '48px', overflow: 'hidden', height: '48px' }}>
                        <Image
                            width='90%'
                            style={{ height: '100%', objectFit: 'cover' }}
                            src={card4}
                        />
                    </Row>
                    <Divider style={{ margin: '10px 0' }} />
                    <Row>
                        <Col span={12}>
                            <span style={{ paddingRight: '6px' }}>Đơn hàng mới: </span>
                            <NumberFormat value={totalOrderDay} displayType={'text'} thousandSeparator={true} />
                        </Col>
                        <Col span={12}>
                            <span style={{ paddingRight: '6px' }}>Đã thanh toán: </span>
                            <NumberFormat value={totalOrderDay} displayType={'text'} thousandSeparator={true} />
                        </Col>
                    </Row>
                </CardCustom>
            </Col>
        </Row>
    )
}

export default CardStatistic