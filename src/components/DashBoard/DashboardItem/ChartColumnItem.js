import React from 'react'
import { get } from 'lodash'
import DashboardColumn from '../../../ComponentsWeb/DashboardColumn';
import { Card, Col } from 'antd';
import styled from 'styled-components';
import moment from 'moment';

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
function ChartColumnItem(props) {
    const theme = get(props, 'theme', '');
    let dataPayment = get(props, 'dataPayment', []);
    let dataCategoryColumn = get(props, 'dataCategoryColumn', []);
    console.log('column')
    let dataColumn = [];
    if (dataPayment && dataPayment.length > 0) {
        dataPayment.forEach((data, index) => {
            dataColumn.push({ type: moment(data?.createdAt).format('YYYY-MM-DD'), sales: data.priceCheckout })
        });
    }

    let result = [];
    if (dataColumn) {
        let temp = {};
        let obj = null;
        for (let i = 0; i < dataColumn.length; i++) {
            obj = dataColumn[i];
            if (!temp[obj.type]) {
                temp[obj.type] = obj;
            } else {
                temp[obj.type].sales += obj.sales;
            }
        }
        for (let prop in temp)
            result.push(temp[prop]);
    }

    return (
        <>
            <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                <CardCustom theme2={theme.toString()} size="small" title="Thống kê doanh thu theo danh mục sản phẩm">
                    <DashboardColumn dataColumn={dataCategoryColumn && dataCategoryColumn} />
                </CardCustom>

            </Col>
            <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                <CardCustom theme2={theme.toString()} size="small" title="Thống kê doanh thu sản phẩm theo ngày">
                    <DashboardColumn dataColumn={result && result} />
                </CardCustom>
            </Col>
        </>
    )
}

export default ChartColumnItem