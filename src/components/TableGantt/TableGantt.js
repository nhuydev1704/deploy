import React, { useEffect, useRef } from 'react';
import './style.css';
import gantt from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import { LocaleGanttVI } from './config/LocaleGantt';
import { FullscreenOutlined, PlusCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import ZoomConfig from './config/ZoomConfig';
import _ from 'lodash';
import { API_URL } from '../../apis/fetchData';
import axios from 'axios';
// chuyển đến task khi chọn task
let selected_column = null;
function is_selected_column(column_date) {
    if (selected_column && column_date.valueOf() == selected_column.valueOf()) {
        return true;
    }
    return false;
}

gantt.attachEvent('onBeforeTaskUpdate', async function (id, item) {
    const res = await axios.put(`${API_URL}/api/gantt/${item._id}`, {
        start_date: item.start_date,
        end_date: item.end_date,
        progress: Number(item.progress),
        text: item.text,
        is_type: item.is_type,
        username: item.username,
    });

    // if (res.status === 200) {
    //     props.setCallback(!props.callback);
    // }
    return true;
});

gantt.attachEvent('onBeforeTaskAdd', async function (id, item) {
    const res = await axios.post(`${API_URL}/api/gantt`, {
        id,
        start_date: item.start_date,
        end_date: item.end_date,
        type: 'task',
        progress: Number(item.progress),
        parent: item.parent,
        text: item.text,
        is_type: item.is_type,
        username: item.username,
    });

    // if (res.status === 200) {
    //     props.setCallback(!props.callback);
    // }

    return false;
});

const today = new Date();
let formatter = gantt.ext.formatters.durationFormatter({
    enter: 'day',
    store: 'day',
    format: 'auto',
});

gantt.locale = { ...LocaleGanttVI };
const TableGantt = (props) => {
    const inputEl = useRef(null);

    useEffect(() => {
        if (!props.tasks && _.isEmpty(props.tasks)) return;
        gantt.clearAll();
        // plugin
        gantt.plugins({
            keyboard_navigation: true,
            undo: true,
            marker: true,
            fullscreen: true,
            tooltip: true,
        });

        // before open lightbox
        // gantt.attachEvent('onBeforeLightbox', function (id) {
        //     return false;
        // });

        gantt.init(inputEl.current);

        // maker
        let dateToStr = gantt.date.date_to_str(gantt.config.task_date);

        // sử dụng grid column và k show unscheduled
        gantt.config.reorder_grid_columns = true;
        gantt.config.show_unscheduled = true;

        gantt.config.fit_tasks = true;

        gantt.ext.zoom.init(ZoomConfig);

        gantt.ext.zoom.setLevel('day');

        gantt.$zoomToFit = false;

        // parse task sang json
        gantt.parse(props.tasks);

        // set width column
        gantt.config.min_column_width = 100;

        gantt.config.grid_width = props.widthGrid;

        // kích hoạt sau khi đã sẵn sàng nhưng chưa hiển thị
        gantt.attachEvent('onBeforeGanttRender', function () {
            // add line start project
            gantt.eachTask(function (task) {
                task.start_date &&
                    task.type == 'task' &&
                    task.parent == 0 &&
                    gantt.addMarker({
                        start_date: task.start_date,
                        css: 'status_line',
                        text: 'Bắt đầu',
                        title: 'Bắt đầu',
                    });
            });

            gantt.templates.tooltip_text = function (start, end, task) {
                return (
                    `<b>${task.parent ? 'Công việc: ' : 'Hợp đồng: '}</b>` +
                    task.text +
                    '<br/>' +
                    '<b>Ngày bắt đầu:</b> ' +
                    gantt.templates.tooltip_date_format(start) +
                    '<br/><b>Ngày kết thúc:</b> ' +
                    gantt.templates.tooltip_date_format(end)
                );
            };

            // add line today
            gantt.addMarker({
                start_date: today,
                css: 'today',
                text: 'Hôm nay',
                title: 'Hôm nay',
            });
            // weekend( thứ 7  chủ nhật)
            gantt.templates.scale_cell_class = function (date) {
                if (date.getDay() == 0 || date.getDay() == 6) {
                    return 'weekend';
                }
            };
            gantt.templates.timeline_cell_class = function (item, date) {
                if (date.getDay() == 0 || date.getDay() == 6) {
                    return 'weekend';
                }
            };
            gantt.templates.task_class = function (start, end, task) {
                // setting color task (priority)
                // overdure task
                if (moment(task.end_date) < moment(today) && task.progress < 1) {
                    return 'overdure_task';
                }

                if (
                    moment(task.end_date) < moment(today) &&
                    task.progress == 1 &&
                    task.is_type !== 'project' &&
                    task.is_type !== 'task'
                ) {
                    return 'overdure_task-success';
                }

                switch (task.is_type) {
                    case 'project':
                        return 'low';
                    case 'task':
                        return 'medium';
                    case 'subtask':
                        return 'high';
                }
            };
        });

        // setup right text
        gantt.templates.rightside_text = function (start, end, task) {
            if (moment(task.end_date) < moment(today) && task.progress < 1 && task.parent != 0) {
                return 'Quá hạn';
            }

            if (moment(task.end_date) < moment(today) && task.progress == 1 && task.parent != 0) {
                return 'Hoàn thành';
            }

            if (task.parent == 0) {
                switch (task.progress) {
                    case 0:
                        return 'Chưa thực hiện';
                    case 0.25:
                        return 'Đang thực hiện';
                    case 0.5:
                        return 'Chờ kết quả';
                    case 0.75:
                        return 'Tạm dừng';
                    case 1:
                        return 'Hoàn thành';
                }
            }

            return task.duration + ' ngày';
        };

        // setup left text
        // gantt.templates.leftside_text = function(start, end, task) {
        //     if (!task.priority_text) return;
        //     return 'Ưu tiên ' + task.priority_text;
        // };

        // set ngôn ngữ

        // gantt.config.work_time = true;
        // gantt.config.skip_off_time = true;

        // hàm họi khi task bị kéo
        gantt.attachEvent('onAfterTaskDrag', async function (id, mode, task, original) {
            const taskItem = gantt.getTask(id);
            // if (taskItem.sub_task) return;

            let newData;
            if (taskItem && taskItem.work) {
                newData = {
                    contract_form_id: taskItem.work.contract_form_id,
                    customer_id: taskItem.work.customer_id,
                    procedure_list_id: taskItem.work.procedure_list_id,
                    sign_at: moment(taskItem.start_date).format('YYYY-MM-DD HH:mm:ss'),
                    finfish_at: moment(taskItem.end_date).format('YYYY-MM-DD HH:mm:ss'),
                };
            } else {
                newData = {
                    time_start: moment(taskItem.start_date).format('YYYY-MM-DD HH:mm:ss'),
                    time_finish: moment(taskItem.end_date).format('YYYY-MM-DD HH:mm:ss'),
                };
            }

            // if (mode === 'resize' || mode === 'move') {
            //     if (!taskItem.parent) {
            //         await ApiComponents.update(urlConfig.cf_url_api, taskItem.work.id, newData);
            //     } else if (taskItem.sub_task) {
            //         await ApiComponents.update(
            //             urlConfig.cf_url_api_schedule,
            //             taskItem.id_parent,
            //             newData
            //         );
            //     } else {
            //         await ApiComponents.update(
            //             urlConfig.cf_url_api_schedule,
            //             taskItem.schedule.id,
            //             newData
            //         );
            //     }
            // }
        });

        // gantt.templates.task_class = function (start, end, task) {
        //     if (task.type == 'project' && !gantt.hasChild(task.id)) return 'shrink';
        // };

        // Gọi modal thêm khi click vào task (modal default library)
        // gantt.config.details_on_dblclick = false;

        // hidden messgae error
        gantt.config.show_errors = false;

        // % finish task
        // gantt.templates.progress_text = function (start, end, task) {
        //     return "<span class='text_status-task'>" + Math.round(task.progress * 100) + '% </span>';
        // };

        // selected column

        gantt.attachEvent('onScaleClick', function (e, date) {
            selected_column = date;
            var pos = gantt.getScrollState();
            gantt.render();
            gantt.scrollTo(pos.x, pos.y);
        });

        gantt.templates.scale_cell_class = function (date) {
            if (is_selected_column(date)) return 'highlighted-column';
        };
        gantt.templates.timeline_cell_class = function (item, date) {
            if (is_selected_column(date)) return 'highlighted-column';
        };

        gantt.attachEvent('onBeforeTaskDelete', async function (id, item) {
            await axios.delete(`${API_URL}/api/gantt/${item._id}`);
            return;
        });

        gantt.ext.inlineEditors.attachEvent('onSave', function (state) {
            var col = state.columnName;
            if (gantt.autoSchedule && (col == 'start_date' || col == 'end_date' || col == 'duration')) {
                gantt.autoSchedule();
            }
        });

        return () => {
            gantt.clearAll();
        };
    }, [props.zoom, props.tasks, props.widthGrid]);

    return (
        <>
            <div ref={inputEl} style={{ width: '100%', height: 'calc(100vh - 150px)' }}></div>
        </>
    );
};

export default React.memo(TableGantt);
