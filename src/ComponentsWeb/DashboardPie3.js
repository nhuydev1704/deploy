import React, { useState, useEffect } from 'react';
import { Pie } from '@ant-design/charts';
import { get } from 'lodash'

const DashboardPie3 = (props) => {
    const data = get(props, 'dataPieRole', []);


    var config = {
        appendPadding: 10,
        data: data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.75,
        label: {
            type: 'spider',
            labelHeight: 28,
            content: '{name}\n{percentage}',
        },
        interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
    };
    return <Pie {...config} />;
};

export default DashboardPie3;