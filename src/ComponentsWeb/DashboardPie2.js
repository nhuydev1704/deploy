import { Pie } from '@ant-design/charts';
import { get } from 'lodash';
import React from 'react';
const DashboardPie2 = (props) => {
    const data = get(props, 'dataPie2', []);
    const typePie = get(props, 'typePie', 1)

    var config = {
        width: 180,
        height: 180,
        appendPadding: 20,
        data: data,
        angleField: 'value',
        colorField: 'type',
        color: typePie === 1 ? ['#378AFF', '#FFA32F', '#FFEC21', '#F54F52', '#93F03B', '#9552EA', '#008822'] :
            typePie === 2 ? ['#9552EA', '#7CDDDD', '#FF2E7E', '#FF6B45', '#FFAB05', '#1277AF', '#138FAF'] :
                ['#FFAB05', '#377B2B', '#7AC142', '#007CC3', '#00529B', '#828822', '#521322'],
        legend: false,
        radius: 0.8,
        label: {
            autoHide: true,
            formatter: (datum) => {
                return datum.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            },
        },
        interactions: [{ type: 'element-active' }],
        tooltip: {
            formatter: (datum) => {
                return { name: datum.type, value: datum.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") };
            },
        }
    };
    return <Pie {...config} />;
};
export default DashboardPie2;