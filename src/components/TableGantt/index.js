import { Empty, Spin } from 'antd';
import axios from 'axios';
import _, { get } from 'lodash';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { API_URL } from '../../apis/fetchData';
import Toolbar from './components/Toolbar';
import TableGantt from './TableGantt';
function checkDate(date) {
    const dateString = moment(date).format('DD-MM-YYYY HH:mm:ss');

    return dateString;
}

function caculateDuration(date1, date2) {
    console.log(moment(date2) - moment(date1));
    return moment(date2) - moment(date1);
}

const PAGE_SIZE = 15;
const GanttApp = (props) => {
    const [currentZoom, setCurrentZoom] = useState('');
    const [loading, setLoading] = useState(false);

    const [dataTask, setDataTask] = useState({});

    const [query, setQuery] = useState('');

    // resize grid
    const [widthGrid, setWidthGrid] = useState(500);

    // hanlde taskform
    const [callback, setCallback] = useState(false);

    // setup pagination

    // handle zoom
    const handleZoomChange = useCallback((zoom) => {
        setCurrentZoom(zoom);
    }, []);

    const memoizeGetData = async () => {
        let dataList = [];
        setLoading(true);
        const params = query ? `?username=${query}` : '';

        const res = await axios.get(`${API_URL}/api/gantt${params}`);
        if (res.status == 200) {
            console.log('res.data', res.data);
            res.data.forEach((element) => {
                dataList.push({
                    ...element,
                    start_date: checkDate(element.start_date),
                    end_date: checkDate(element.end_date),
                });
            });
        }
        setDataTask({ data: dataList });

        setLoading(false);
    };

    useEffect(() => {
        memoizeGetData();
    }, [callback, query]);

    return (
        <Spin spinning={loading} tip="Đang tải dữ liệu ...">
            <div className="main_page-gantt">
                <Toolbar
                    setQuery={setQuery}
                    setWidthGrid={setWidthGrid}
                    zoom={currentZoom}
                    onZoomChange={handleZoomChange}
                />
                <div className="gantt-container">
                    {!_.isEmpty(dataTask) && dataTask?.data.length > 0 ? (
                        <TableGantt
                            tasks={dataTask}
                            zoom={currentZoom}
                            widthGrid={widthGrid}
                            setCallback={setCallback}
                            callback={callback}
                        />
                    ) : (
                        <Empty description="Chưa có dữ liệu..." />
                    )}
                </div>
                {/* {!_.isEmpty(dataTask) && dataTask?.data?.length > 0 && !workId && (
                    <Pagination
                        fetchData={value => setPage(value)}
                        PageNumber={pageNumbers}
                        toValue={toValue}
                    />
                )} */}
                <div style={{ marginTop: '60px' }} />
            </div>
        </Spin>
    );
};

export default GanttApp;
