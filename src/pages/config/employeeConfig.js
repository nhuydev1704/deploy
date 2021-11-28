import moment from "moment";

export const columns = [
    {
        title: 'Tên nhân viên',
        dataIndex: 'name',
    },
    {
        title: 'Ngày sinh',
        dataIndex: 'date_of_birth',
        render: date => <>
            {moment(date).format("YYYY-MM-DD")}
        </>,
    },
    {
        title: 'Địa chỉ',
        dataIndex: 'address',
    },
    {
        title: 'Ca làm việc',
        dataIndex: 'shift',
    },
    {
        title: 'Lương',
        dataIndex: 'salary',
    },
    {
        title: 'Chức vụ',
        dataIndex: 'level',
    },
];