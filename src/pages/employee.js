import { Button, Card, PageHeader, Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { columns } from './config/employeeConfig';
const Employee = () => {
    const [dataEmployee, setDataEmployee] = useState([]);

    const getDataEmployee = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/employee');

            if (res.status === 200) {
                setDataEmployee(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getDataEmployee();
    }, []);

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };

    return (
        <div>
            <PageHeader
                style={{ marginBottom: '20px' }}
                ghost={false}
                title="Quản lý nhân viên"
                extra={[
                    <Button key="1" type="primary">
                        <Link to="employee/create">Thêm nhân viên</Link>
                    </Button>,
                ]}
            ></PageHeader>

            <Card>
                <Table
                    rowSelection={{
                        type: 'radio',
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={dataEmployee}
                    rowKey={(record) => record._id}
                />
            </Card>
        </div>
    );
};

export default Employee;
