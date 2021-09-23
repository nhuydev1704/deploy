import { Line } from '@ant-design/charts';
import { get } from 'lodash';
import React from 'react';
const DashboardLine = (props) => {
    const data = get(props, 'dataLine', []);

    var config = {
        data: data,
        xField: 'createdAt',
        yField: 'price',
        yAxis: {
            label: {
                formatter: function formatter(v) {
                    return ''.concat(v).replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
                        return ''.concat(s, ',');
                    });
                },
            },
        },
        seriesField: 'type',
        color: function color(_ref) {
            var type = _ref.type;
            return type === 'register' ? '#F4664A' : type === 'download' ? '#30BF78' : '#FAAD14';
        },
        lineStyle: function lineStyle(_ref2) {
            var type = _ref2.type;
            if (type === 'register') {
                return {
                    lineDash: [4, 4],
                    opacity: 1,
                };
            }
            return { opacity: 0.5 };
        },
    };
    return <Line {...config} />;
};
export default DashboardLine;