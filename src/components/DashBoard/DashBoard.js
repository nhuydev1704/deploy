import { Card, Col, Row, Spin, Table, Typography, BackTop, Tabs } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { API_URL, getDataNotoken } from '../../apis/fetchData';
import DashboardPie from '../../ComponentsWeb/DashboardPie';
import DashboardPie2 from '../../ComponentsWeb/DashboardPie2';
import DashboardPie3 from '../../ComponentsWeb/DashboardPie3';
import { columns, columnOrders } from './DashBoardConfig';
import CardStatistic from './DashboardItem/CardStatistic';
import ChartColumnItem from './DashboardItem/ChartColumnItem';
import TabOrderList from './DashboardItem/TabOrderList';
import './style.css';

const { TabPane } = Tabs;

const CardCustom = styled(Card)`
    background: ${(props) => (props.theme2 === 'true' ? '#fff' : '#141414')} !important;
    color: ${(props) => (props.theme2 === 'true' ? '#000' : 'rgba(255, 255, 255, .65)')} !important;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 3px, rgba(0, 0, 0, 0.2) 0px 2px 3px;
    border-radius: 6px;
    border: none;
    ${'' /* z-index: 999999; */}
    h2 {
        color: ${(props) => (props.theme2 === 'true' ? '#000' : 'rgba(255, 255, 255, .65)')} !important;
    }
    .ant-card-head {
        color: ${(props) => (props.theme2 === 'true' ? '#000' : 'rgba(255, 255, 255, .65)')} !important;
    }
`;
const TabsCustom = styled(Tabs)`
    background: ${(props) => (props.theme2 === 'true' ? '#fff' : '#141414')} !important;
    color: ${(props) => (props.theme2 === 'true' ? '#000' : 'rgba(255, 255, 255, .65)')} !important;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 3px, rgba(0, 0, 0, 0.2) 0px 2px 3px;
    border-radius: 6px;
    border: none;
    padding: 10px 10px;
    width: 100%;
`;

const TableCustom = styled(Table)`
    .ant-table.ant-table-small.ant-table-bordered.ant-table-ping-right.ant-table-scroll-horizontal {
        padding-bottom: 1px;
    }

    .ant-table-content {
        ::-webkit-scrollbar {
            width: 5px;
            height: 10px;
        }
        ::-webkit-scrollbar-track {
            background: #f1f1f1;
        }
        ::-webkit-scrollbar-thumb {
            background: #8888883d;
            border-radius: 20px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #111;
        }
    }

    .ant-table-thead > tr > th {
        background: ${(props) => (props.theme2 === 'true' ? '#fff' : '#2b3439')} !important;
        color: ${(props) => (props.theme2 === 'true' ? '#000' : 'rgba(255, 255, 255, .95)')} !important;
    }
    .ant-table-tbody {
        background: ${(props) => (props.theme2 === 'true' ? '#fff' : '#141414')} !important;
        color: ${(props) => (props.theme2 === 'true' ? '#000' : 'rgb(243 145 66)')} !important;
    }
`;

function DashBoard() {
    const [dataPayment, setDataPayment] = useState([]);
    const [dataProduct, setDataProduct] = useState([]);
    const [dataUser, setDataUser] = useState([]);
    const [current, setCurrent] = useState('1');
    const [loading, setLoading] = useState(false);

    const { theme } = useSelector((state) => state);

    useEffect(() => {
        setLoading(true);
        try {
            const getData = async (url) => {
                const res = await getDataNotoken(url, '');
                if (res.status === 200) {
                    setDataPayment(res.data);
                }
                setLoading(false);
            };

            const getDataProduct = async (url) => {
                const res = await getDataNotoken(url, '');
                if (res.status === 200) {
                    setDataProduct(res.data.products);
                }
                setLoading(false);
            };

            const getDataUser = async (url) => {
                const res = await getDataNotoken(url, '');
                if (res.status === 200) {
                    setDataUser(res.data);
                }
                setLoading(false);
            };

            getData(`${API_URL}/api/total`);
            getDataProduct(`${API_URL}/api/products?limit=99`);
            getDataUser(`${API_URL}/user/allInfor`);
        } catch (error) {
            console.log(error);
        }
    }, []);

    const handleClick = (e) => {
        setCurrent(e.key);
    };

    let totalProductItems = dataProduct.length;
    let todayProduct = 0;
    let dataPie = [];
    let dataPieSold = [];
    let dataCategoryColumn = [];
    if (dataProduct && dataProduct.length > 0) {
        dataProduct.forEach((item) => {
            if (moment().format('YYYY-MM-DD') === moment(item?.createdAt).format('YYYY-MM-DD')) {
                todayProduct += 1;
            }
            if (parseInt(item?.rating) > 0) {
                dataPie.push({ type: item.title, value: parseInt(item?.rating) });
            }
            if (parseInt(item?.sold) > 0) {
                dataPieSold.push({ type: item.title, value: parseInt(item?.sold) });
                dataCategoryColumn.push({ type: item.category, sales: item.price * item.sold });
            }
        });
    }

    let totalOrder = 0;
    let totalUser = dataUser.length;
    let todayUser = 0;
    let dataUserPie1 = [];
    let dataUserPie2 = [];
    let dataUserPie3 = [];
    let listUser = [];
    let roleChart = 0;
    let roleChart2 = 0;

    if (dataUser && dataUser.length > 0) {
        dataUser.forEach((item) => {
            if (moment().format('YYYY-MM-DD') === moment(item?.createdAt).format('YYYY-MM-DD')) {
                todayUser += 1;
            }
            if (item.role !== 1 && item.totalBuy > 0) {
                totalOrder += 1;
                dataUserPie1.push({ type: item.name, value: parseInt(item?.totalBuy) });
            }
            if (item.role !== 1 && item.totalProduct > 0) {
                dataUserPie2.push({ type: item.name, value: parseInt(item?.totalProduct) });
            }
            if (item.role !== 1 && item.totalOrder > 0) {
                dataUserPie3.push({ type: item.name, value: parseInt(item?.totalOrder) });
            }
            if (item.role !== 1) {
                roleChart += 1;
                listUser.push({
                    key: item._id,
                    name: item.name,
                    email: item.email,
                    total_buy: item.totalBuy,
                    total_order: item.totalOrder,
                    total_product: item.totalProduct,
                });
            } else {
                roleChart2 += 1;
            }
        });
    }
    let dataUserRole = [];
    if (roleChart2 > 0) {
        dataUserRole = [
            {
                type: 'Nữ',
                value: (roleChart2 / (roleChart + roleChart2)) * 100,
            },
            {
                type: 'Nam',
                value: (roleChart / (roleChart + roleChart2)) * 100,
            },
        ];
    }

    let succesOrder = (totalOrder / dataUser.length) * 100;
    let cancelOrder = 100 - (totalOrder / dataUser.length) * 100;

    return (
        <Spin spinning={loading} tip="Đang tải dữ liệu">
            <BackTop />
            <CardStatistic
                theme={theme}
                dataPayment={dataPayment && dataPayment.length > 0 && dataPayment}
                totalProductItems={totalProductItems}
                totalOrder={totalOrder}
                succesOrder={succesOrder}
                cancelOrder={cancelOrder}
                todayProduct={todayProduct}
                todayUser={todayUser}
                totalUser={totalUser}
            />
            <Row style={{ marginTop: 16 }}>
                <TabsCustom defaultActiveKey={current} onChange={handleClick} theme2={theme.toString()}>
                    <TabPane tab="Khách hàng" key="1">
                        <Row gutter={[16, 16]}>
                            <Col span={24} style={{ minHeight: '462px' }}>
                                <Row gutter={[16, 16]}>
                                    <Col style={{ minHeight: '231px' }} xl={12} lg={24} md={24} sm={24} xs={24}>
                                        <Row gutter={[16, 16]}>
                                            <Col xl={12}>
                                                <CardCustom
                                                    style={{
                                                        minHeight: '224px',
                                                        boxShadow:
                                                            'rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset',
                                                    }}
                                                    theme2={theme.toString()}
                                                    size="small"
                                                >
                                                    <DashboardPie2
                                                        typePie={1}
                                                        dataPie2={dataUserPie1 && dataUserPie1}
                                                    />
                                                    <span className="title__pie-user">Doanh thu theo khách hàng</span>
                                                </CardCustom>
                                            </Col>
                                            <Col xl={12}>
                                                <CardCustom
                                                    style={{
                                                        minHeight: '224px',
                                                        boxShadow:
                                                            'rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset',
                                                    }}
                                                    theme2={theme.toString()}
                                                    size="small"
                                                >
                                                    <DashboardPie2
                                                        typePie={2}
                                                        dataPie2={dataUserPie2 && dataUserPie2}
                                                    />
                                                    <span className="title__pie-user">Sản phẩm theo khách hàng</span>
                                                </CardCustom>
                                            </Col>
                                            <Col xl={12}>
                                                <CardCustom
                                                    style={{
                                                        minHeight: '224px',
                                                        boxShadow:
                                                            'rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset',
                                                    }}
                                                    theme2={theme.toString()}
                                                    size="small"
                                                >
                                                    <DashboardPie2
                                                        typePie={3}
                                                        dataPie2={dataUserPie3 && dataUserPie3}
                                                    />
                                                    <span className="title__pie-user">Đơn hàng theo khách hàng</span>
                                                </CardCustom>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                                        <CardCustom
                                            style={{
                                                minHeight: '100%',
                                                maxHeight: '462px',
                                                boxShadow:
                                                    'rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset',
                                            }}
                                            theme2={theme.toString()}
                                            size="small"
                                            title="Danh sách khách hàng"
                                        >
                                            <TableCustom
                                                showSorterTooltip={{ title: 'Bấm để sắp xếp' }}
                                                theme2={theme.toString()}
                                                bordered={true}
                                                size="small"
                                                loading={loading}
                                                dataSource={listUser}
                                                scroll={{ x: 1000 }}
                                                columns={columns}
                                                pagination={{
                                                    defaultPageSize: 8,
                                                    pageSizeOptions: ['10', '20', '30'],
                                                }}
                                            />
                                        </CardCustom>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab="Đơn hàng" key="2">
                        <TabOrderList
                            dataPayment={dataPayment && dataPayment.length > 0 && dataPayment}
                            theme={theme}
                        />
                    </TabPane>
                </TabsCustom>
            </Row>
            <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                <ChartColumnItem
                    theme={theme}
                    dataCategoryColumn={dataCategoryColumn}
                    dataPayment={dataPayment && dataPayment.length > 0 && dataPayment}
                />
                <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                    <CardCustom theme2={theme.toString()} size="small" title="Thống kê đánh sản phẩm">
                        <DashboardPie dataPie={dataPie && dataPie} />
                    </CardCustom>
                </Col>
                <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                    <CardCustom theme2={theme.toString()} size="small" title="Thống kê sản phẩm sản phẩm bán chạy">
                        <DashboardPie dataPie={dataPieSold && dataPieSold} />
                    </CardCustom>
                </Col>
                <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                    <CardCustom theme2={theme.toString()} size="small" title="Thống kê nam và nữ">
                        <DashboardPie3 dataPieRole={dataUserRole && dataUserRole} />
                    </CardCustom>
                </Col>
            </Row>
        </Spin>
    );
}

export default DashBoard;
