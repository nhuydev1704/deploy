import { FundProjectionScreenOutlined, TeamOutlined } from '@ant-design/icons';
import { Layout, Menu, Row, Typography } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';
const { Sider } = Layout;
const { SubMenu } = Menu;
const { Title } = Typography;

const MenuCustom = styled(Menu)`
    background: ${(props) => (props.theme2.toString() === 'true' ? '#001529' : '#1f1f1f')} !important;
`;
const SiderCustom = styled(Sider)`
    background: ${(props) => (props.theme2.toString() === 'true' ? '#001529' : '#1f1f1f')} !important;
    color: ${(props) => (props.theme2.toString() === 'true' ? 'rgba(255, 255, 255, .65)' : 'initial')};
    z-index: 9999;
`;

function Siders(props) {
    const [current, setCurrent] = useState('1');

    const handleClick = (e) => {
        setCurrent(e.key);
    };

    return (
        <SiderCustom
            theme2={props.theme}
            style={{
                overflow: 'auto',
                left: 0,
            }}
            collapsed={props.collapsed}
        >
            <Row className="logo">
                <img className={!props.collapsed ? 'dashboard-logo' : 'dashboard__logo-size'} src={logo} alt="logo" />
                {/*<Title hidden={props.collapsed} className={!props.collapsed ? "dashboard-title" : "dashboard-title-hidden"} level={4}>Như Ý PRO</Title>*/}
            </Row>
            <MenuCustom
                onClick={handleClick}
                theme="dark"
                theme2={props.theme}
                defaultSelectedKeys={[current]}
                defaultOpenKeys={['sub1']}
                mode="inline"
            >
                {/* <Menu.Item key="1" icon={<HomeOutlined />}>
                        Trang chủ
                    </Menu.Item> */}
                <SubMenu key="sub1" icon={<FundProjectionScreenOutlined />} title="Trang chủ">
                    <Menu.Item key="1">
                        <Link to="/">Shop CNPM</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/weather_covid">Thời tiết - Covid</Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to="/chatbot_case">Training - ChatBot</Link>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Link to="/gantt_chart">Quản lý TimeLine</Link>
                    </Menu.Item>
                </SubMenu>

                <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                    <Menu.Item key="6">Team 1</Menu.Item>
                    <Menu.Item key="8">Team 2</Menu.Item>
                </SubMenu>
            </MenuCustom>
        </SiderCustom>
    );
}

export default Siders;
