import { Card, Col, Row, Table, Typography } from 'antd';
import { get } from 'lodash';
import React from 'react';
import styled from 'styled-components';
import { columnOrders } from '../DashBoardConfig';

const CardCustom = styled(Card)`
    background: ${props => props.theme2 === 'true' ? '#fff' : '#141414'} !important;
    color: ${props => props.theme2 === 'true' ? '#000' : 'rgba(255, 255, 255, .65)'} !important;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 3px, rgba(0, 0, 0, 0.2) 0px 2px 3px;
    border-radius: 6px ;
    border: none;
    h2 {
        color: ${props => props.theme2 === 'true' ? '#000' : 'rgba(255, 255, 255, .65)'} !important;
    }
    .ant-card-head {
        color: ${props => props.theme2 === 'true' ? '#000' : 'rgba(255, 255, 255, .65)'} !important;
    }
    
`

const TableCustom = styled(Table)`
    .ant-table.ant-table-small.ant-table-bordered.ant-table-ping-right.ant-table-scroll-horizontal{
        padding-bottom: 1px;
    }

    .ant-table-content{
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
            background: #555; 
        }
    }

    .ant-table-thead > tr > th {
        background: ${props => props.theme2 === 'true' ? '#fff' : '#2b3439'} !important;
        color: ${props => props.theme2 === 'true' ? '#000' : 'rgba(255, 255, 255, .95)'} !important;
    }
    .ant-table-tbody {
        background: ${props => props.theme2 === 'true' ? '#fff' : '#141414'} !important;
        color: ${props => props.theme2 === 'true' ? '#000' : 'rgb(243 145 66)'} !important;
    }
`

function TabOrderList(props) {
    let theme = get(props, 'theme', '');
    let dataPayment = get(props, 'dataPayment', []);
    let columns = [...columnOrders,
    {
        title: 'Phương thức thanh toán',
        dataIndex: 'payment',
        key: 'payment',
        align: 'center',
        render: (value, row, index) => (
            <>{row.paymentID && row.paymentID !== '' ? 'Paypal' : 'Tiền mặt'} ( <a onClick={() => handleCart(row.key)}>Xem chi tiết</a> )</>
        ),
    },
    {
        title: 'Chi tiết sản phẩm',
        dataIndex: 'cart',
        key: 'cart',
        align: 'center',
        render: (value, row, index) => (
            <a onClick={() => handleCart(row.key)}>Xem chi tiết</a>
        ),
    },
    ]

    const handleCart = (id) => {
        console.log(id)
    }

    let listOrder = [];
    if (dataPayment && dataPayment.length > 0) {
        dataPayment.forEach((item, index) => {
            listOrder.push({
                key: item._id,
                name: item.name,
                email: item.email,
                status: item.status,
                address: item.address,
                total_buy: item.priceCheckout,
                cart: item.cart,
                paymentID: item.paymentID
            })
        });
    }

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            let row = selectedRows[0];

            console.log(row);

        },
    };

    return (
        <Row gutter={[16, 16]}>
            <Col span={24} style={{ minHeight: '475px' }}>
                <CardCustom
                    style={{ minHeight: '100%', maxHeight: '462px', boxShadow: 'rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset' }}
                    theme2={theme.toString()}
                    size="small"
                    title="Danh sách đơn hàng"
                >
                    <TableCustom
                        rowSelection={{
                            type: 'radio',
                            ...rowSelection,
                        }}
                        showSorterTooltip={{ title: 'Bấm để sắp xếp' }}
                        theme2={theme.toString()}
                        bordered={true}
                        size="small"
                        dataSource={listOrder}
                        scroll={{ x: 1000 }}
                        columns={columns}
                        pagination={{ pageSize: 8 }}
                    />
                </CardCustom>
            </Col>
        </Row>
    )
}

export default TabOrderList