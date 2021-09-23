import NumberFormat from 'react-number-format';

export const columns = [
    {
        title: 'Họ tên',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Tổng số tiền thanh toán',
        dataIndex: 'total_buy',
        key: 'total_buy',
        sorter: (a, b) => a.total_buy - b.total_buy,
        render: (value, row, index) => (
            <><NumberFormat value={value} displayType={'text'} thousandSeparator={true} /> VND</>
        ),
    },
    {
        title: 'Tổng số đơn hàng',
        dataIndex: 'total_order',
        key: 'total_order',
    },
    {
        title: 'Tổng số sản phẩm đã mua',
        dataIndex: 'total_product',
        key: 'total_product',
    },
];

export const columnOrders = [
    {
        title: 'Tên khách hàng',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Tổng số tiền thanh toán',
        dataIndex: 'total_buy',
        key: 'total_buy',
        sorter: (a, b) => a.total_buy - b.total_buy,
        render: (value, row, index) => (
            <><NumberFormat value={value} displayType={'text'} thousandSeparator={true} /> VND</>
        ),
    },
];