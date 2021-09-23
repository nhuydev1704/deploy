import { Column } from '@ant-design/charts';
import { get } from 'lodash';
import React from 'react';

const DashboardColumn = (props) => {
    const data = get(props, 'dataColumn', []);

    var config = {
        data: data,
        xField: 'type',
        yField: 'sales',
        columnWidthRatio: 0.8,
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        meta: {
            type: { alias: '类别' },
            sales: { alias: 'Tổng' },
        },
        minColumnWidth: 40,
        maxColumnWidth: 40,
        tooltip: {
            formatter: (datum) => {
                return { name: datum.type, value: datum.sales.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") };
            },
        }
    };
    return <Column {...config} />;
};
export default DashboardColumn;