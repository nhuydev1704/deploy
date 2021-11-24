import { BellOutlined, QuestionCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Drawer, Image, Row, Space, Switch as Sw, notification, Spin, List } from 'antd';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../redux/actions/themeAction';
import { API_URL, delDataNotoken, getDataNotoken } from '../../apis/fetchData';

function Headers(props) {
    const [visible, setVisible] = useState(false);
    const [themeHome, setThemeHome] = useState('light');
    const [dataNoti, setDataNoti] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [result, setResult] = useState(0);
    const [callback, setCallback] = useState(false);

    const { socket } = useSelector((state) => state);

    const dispatch = useDispatch();
    const changeTheme = (value) => {
        dispatch(toggleTheme(themeHome === 'dark' ? true : false));
        setThemeHome(value ? 'dark' : 'light');
    };

    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };

    const OndelNotification = async (id) => {
        try {
            setLoading(true);
            await delDataNotoken(`${API_URL}/api/notification`, id);
            setCallback(!callback);
            setLoading(false);
        } catch (error) {}
    };

    useEffect(() => {
        try {
            setLoading(true);
            const getData = async (url) => {
                const res = await getDataNotoken(url, '');
                console.log(res);
                if (res.status === 200) {
                    setDataNoti(res.data.notifications);
                    setResult(res.data.result);
                }
                setLoading(false);
            };
            getData(`${API_URL}/api/notification?limit=${page * 5}`);
        } catch (e) {
            console.log(e);
        }
    }, [page, callback]);

    useEffect(() => {
        if (socket) {
            socket.on('sendNotiToClient', (noti) => {
                setCallback(!callback);
                notification['info']({
                    message: 'Thông báo',
                    description:
                        noti.action === 'register'
                            ? `${noti.name} đã đăng kí tài khoản vào lúc ${new Date(noti.createdAt).toLocaleString()}`
                            : '',
                });
            });

            return () => socket.off('sendNotiToClient');
        }
    }, [socket, callback]);

    return (
        <>
            <Row align="middle">
                <Space size="large" style={{ display: 'flex', alignItems: 'center' }}>
                    <Button
                        size="small"
                        style={{ background: props.theme ? '#fff' : '#141414', border: 'none' }}
                        shape="circle"
                        icon={
                            <QuestionCircleOutlined
                                style={{ color: props.theme ? '#000' : 'rgba(255, 255, 255, .65)' }}
                            />
                        }
                    />
                    <Badge count={dataNoti.length}>
                        <Button
                            style={{ background: props.theme ? '#fff' : '#141414', border: 'none' }}
                            size="small"
                            shape="circle"
                            icon={<BellOutlined style={{ color: props.theme ? '#000' : 'rgba(255, 255, 255, .65)' }} />}
                            onClick={showDrawer}
                        />
                    </Badge>
                    <Avatar
                        style={{ border: '1px solid #ccc' }}
                        size="small"
                        src={<Image src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    />
                    <Sw
                        size="default"
                        checked={themeHome === 'dark'}
                        onChange={changeTheme}
                        checkedChildren="Light"
                        unCheckedChildren="Dark"
                    />
                </Space>
                <Drawer
                    title="Thông báo"
                    placement="right"
                    closable={false}
                    onClose={onClose}
                    visible={visible}
                    width={380}
                >
                    <Spin spinning={loading}>
                        <List
                            itemLayout="horizontal"
                            dataSource={dataNoti}
                            renderItem={(noti) => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <span>{noti.name}</span>
                                                <Button
                                                    onClick={() => OndelNotification(noti._id)}
                                                    type="primary"
                                                    shape="circle"
                                                    size="small"
                                                    danger
                                                    icon={<CloseOutlined />}
                                                ></Button>
                                            </div>
                                        }
                                        description={
                                            noti.action === 'register'
                                                ? `${noti.name} đã đăng kí tài khoản vào lúc ${new Date(
                                                      noti.createdAt
                                                  ).toLocaleString()}`
                                                : ''
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4px' }}>
                            <Button type="primary" disabled={result < page * 5} onClick={() => setPage(page + 1)}>
                                Xem thêm
                            </Button>
                        </div>
                    </Spin>
                </Drawer>
            </Row>
        </>
    );
}

export default Headers;
