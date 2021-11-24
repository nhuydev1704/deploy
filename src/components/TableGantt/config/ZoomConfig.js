import gantt from 'dhtmlx-gantt';
// formatting durations
var dayFormatter = gantt.ext.formatters.durationFormatter({
    enter: 'day',
    store: 'minute',
    format: 'day',
    hoursPerDay: 8,
    hoursPerWeek: 40,
    daysPerMonth: 30,
    short: false,
});
var dayDurationEditor = { type: 'duration', map_to: 'duration', formatter: dayFormatter, min: 0, max: 1000 };

// config column
gantt.config.columns = [
    { name: 'text', label: '', tree: true, width: 86, resize: true },
    { name: 'start_date', label: '', width: 30, align: 'center', resize: true },
    {
        name: 'progress',
        label: 'Progress',
        width: 40,
        align: 'center',
        template: function (item) {
            if (item.progress >= 1) return 'Hoàn thành';
            if (item.progress == 0) return 'Chưa bắt đầu';
            return Math.round(item.progress * 100) + '%';
        },
    },

    {
        name: 'dayDuration',
        label: 'Khoảng thời gian',
        resize: true,
        align: 'center',
        template: function (task) {
            return dayFormatter.format(task.duration);
        },
        editor: dayDurationEditor,
        width: 20,
    },
    {
        name: 'add',
        width: 26,
    },
];

gantt.config.lightbox.sections = [
    { name: 'description', height: 38, map_to: 'text', type: 'textarea', focus: true },
    {
        name: 'progress',
        height: 22,
        label: 'isprogress',
        map_to: 'progress',
        type: 'select',
        options: [
            { key: '0', label: 'Chưa bắt đầu' },
            { key: '0.1', label: '10%' },
            { key: '0.2', label: '20%' },
            { key: '0.3', label: '30%' },
            { key: '0.4', label: '40%' },
            { key: '0.5', label: '50%' },
            { key: '0.6', label: '60%' },
            { key: '0.7', label: '70%' },
            { key: '0.8', label: '80%' },
            { key: '0.9', label: '90%' },
            { key: '1', label: 'Hoàn thành' },
        ],
    },
    {
        name: 'is_type_task',
        height: 22,
        label: 'istask',
        map_to: 'is_type',
        type: 'select',
        options: [
            { key: 'project', label: 'Dự án' },
            { key: 'task', label: 'Công việc' },
            { key: 'subtask', label: 'Công việc phụ' },
        ],
    },
    {
        name: 'is_username',
        height: 22,
        label: 'isusername',
        map_to: 'username',
        type: 'select',
        options: [
            { key: 'root', label: 'Root' },
            { key: 'nny', label: 'Nguyễn Như Ý' },
            { key: 'bna', label: 'Bùi Ngọc Ánh' },
            { key: 'vdhl', label: 'Vương Đình Hoàng Long' },
            { key: 'nmd', label: 'Nguyễn Mạnh Đạt' },
        ],
    },
    { name: 'time', type: 'duration', map_to: 'auto', time_format: ['%d', '%m', '%Y', '%H:%i'] },
];
const ZoomConfig = {
    levels: [
        // giờ
        {
            name: 'hour',
            scale_height: 60,
            scales: [
                { unit: 'day', step: 1, format: '%d %M' },
                { unit: 'hour', step: 1, format: '%H:%i' },
            ],
        },
        // ngày
        {
            name: 'day',
            scale_height: 30,
            scales: [{ unit: 'day', step: 1, format: '%d %M' }],
        },
        // tuần
        {
            name: 'week',
            scale_height: 60,
            scales: [
                {
                    unit: 'week',
                    step: 1,
                    format: function (date) {
                        let dateToStr = gantt.date.date_to_str('%d %F');
                        let endDate = gantt.date.add(date, -6, 'day');
                        let weekNum = gantt.date.date_to_str('%W')(date);
                        return 'Tuần ' + weekNum + ', ' + dateToStr(date) + ' - ' + dateToStr(endDate);
                    },
                },
                { unit: 'day', step: 1, format: '%j %D' },
            ],
        },
        // tháng
        {
            name: 'month',
            scale_height: 60,
            scales: [
                { unit: 'month', step: 1, format: '%F, %Y' },
                {
                    unit: 'week',
                    step: 1,
                    format: function (date) {
                        let dateToStr = gantt.date.date_to_str('%d %M');
                        let endDate = gantt.date.add(gantt.date.add(date, 1, 'week'), -1, 'day');
                        return dateToStr(date) + ' - ' + dateToStr(endDate);
                    },
                },
            ],
        },
        // quý
        {
            name: 'quarter',
            height: 60,
            scales: [
                {
                    unit: 'quarter',
                    step: 3,
                    format: function (date) {
                        let dateToStr = gantt.date.date_to_str('%F %y');
                        let endDate = gantt.date.add(gantt.date.add(date, 3, 'month'), -1, 'day');
                        return dateToStr(date) + ' - ' + dateToStr(endDate);
                    },
                },
                { unit: 'month', step: 1, format: '%F' },
            ],
        },
        // năm
        {
            name: 'year',
            scale_height: 30,
            scales: [
                {
                    unit: 'year',
                    step: 1,
                    format: function (date) {
                        let dateToStr = gantt.date.date_to_str('%Y');
                        let endDate = gantt.date.add(gantt.date.add(date, 1, 'year'), -1, 'day');
                        // return dateToStr(date) + ' - ' + dateToStr(endDate);
                        return dateToStr(date);
                    },
                },
            ],
        },
        // thập kỷ
        {
            name: 'year',
            scale_height: 60,
            scales: [
                {
                    unit: 'year',
                    step: 10,
                    format: function (date) {
                        let dateToStr = gantt.date.date_to_str('%Y');
                        let endDate = gantt.date.add(gantt.date.add(date, 10, 'year'), -1, 'day');
                        return dateToStr(date) + ' - ' + dateToStr(endDate);
                    },
                },
                {
                    unit: 'year',
                    step: 5,
                    format: function (date) {
                        let dateToStr = gantt.date.date_to_str('%Y');
                        let endDate = gantt.date.add(gantt.date.add(date, 5, 'year'), -1, 'day');
                        return dateToStr(date) + ' - ' + dateToStr(endDate);
                    },
                },
            ],
        },
    ],
    element: function () {
        return gantt.$root.querySelector('.gantt_task');
    },
};

// export function toggleMode() {
//     gantt.$zoomToFit = !gantt.$zoomToFit;
//     if (gantt.$zoomToFit) {
//         //Saving previous scale state for future restore
//         saveConfig();
//         zoomToFit();
//     } else {
//         //Restore previous scale state
//         restoreConfig();
//         gantt.render();
//     }
// }

let cachedSettings = {};

export function saveConfig() {
    const config = gantt.config;
    cachedSettings = {};
    cachedSettings.scales = config.scales;
    cachedSettings.start_date = config.start_date;
    cachedSettings.end_date = config.end_date;
    cachedSettings.scroll_position = gantt.getScrollState();
}

export function restoreConfig() {
    applyConfig(cachedSettings);
}

export function applyConfig(config, dates) {
    gantt.config.scales = config.scales;

    // restore the previous scroll position
    if (config.scroll_position) {
        setTimeout(function () {
            gantt.scrollTo(config.scroll_position.x, config.scroll_position.y);
        }, 4);
    }
}

export function zoomToFit() {
    let project = gantt.getSubtaskDates(),
        areaWidth = gantt.$task.offsetWidth,
        scaleConfigs = ZoomConfig.levels;

    for (var i = 0; i < scaleConfigs.length; i++) {
        let columnCount = getUnitsBetween(
            project.start_date,
            project.end_date,
            scaleConfigs[i].scales[scaleConfigs[i].scales.length - 1].unit,
            scaleConfigs[i].scales[0].step
        );
        if ((columnCount + 2) * gantt.config.min_column_width <= areaWidth) {
            break;
        }
    }

    if (i == scaleConfigs.length) {
        i--;
    }
    gantt.ext.zoom.setLevel(scaleConfigs[i].name);
    // gantt.ext.zoom.setLevel('day');
}

// get number of columns in timeline
export function getUnitsBetween(from, to, unit, step) {
    let start = new Date(from),
        end = new Date(to);
    let units = 0;
    while (start.valueOf() < end.valueOf()) {
        units++;
        start = gantt.date.add(start, step, unit);
    }
    return units;
}

export function zoom_in() {
    gantt.ext.zoom.zoomIn();
    gantt.$zoomToFit = false;
}
export function zoom_out() {
    gantt.ext.zoom.zoomOut();
    gantt.$zoomToFit = false;
}

// const setZoom = value => {
//     switch (value) {
//         case 'Hours':
//             gantt.config.scale_unit = 'day';
//             gantt.config.date_scale = '%d %M';

//             gantt.config.scale_height = 60;
//             gantt.config.min_column_width = 30;
//             gantt.config.subscales = [{ unit: 'hour', step: 1, date: '%H' }];
//             break;
//         case 'Days':
//             gantt.config.min_column_width = 70;
//             gantt.config.scale_unit = 'week';
//             gantt.config.date_scale = '#%W';
//             gantt.config.subscales = [{ unit: 'day', step: 1, date: '%d %M' }];
//             gantt.config.scale_height = 60;
//             break;
//         case 'Months':
//             gantt.config.min_column_width = 70;
//             gantt.config.scale_unit = 'month';
//             gantt.config.date_scale = '%F';
//             gantt.config.scale_height = 60;
//             gantt.config.subscales = [{ unit: 'week', step: 1, date: '#%W' }];
//             break;
//         case 'Years':
//             gantt.config.min_column_width = 70;
//             gantt.config.scale_unit = 'year';
//             gantt.config.date_scale = '%Y';
//             gantt.config.scale_height = 60;
//             gantt.config.subscales = [{ unit: 'month', step: 1, date: '#%F' }];
//             break;
//         default:
//             break;
//     }
// };

export default ZoomConfig;
