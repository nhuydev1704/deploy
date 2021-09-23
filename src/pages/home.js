import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import DashBoard from '../components/DashBoard/DashBoard';
import Headers from '../components/Header/Headers';
import Siders from '../components/Sider/Siders';
import './style.css';
import WeatherCovid from './weather_covid';

const { Header, Content, Footer } = Layout;

const LayoutCustom = styled(Layout)`
    background: ${props => props.theme2 === 'true' ? '#f0f2f5' : '#000'};
    color: ${props => props.theme2 === 'true' ? '#000' : '#fff'};
`
const HeaderCustom = styled(Header)`
    background: ${props => props.theme2 === 'true' ? '#fff' : '#141414'} !important;
    color: ${props => props.theme2 === 'true' ? '#000' : 'rgba(255, 255, 255, .65)'};
    z-index: 999999;
`

const ContentCustom = styled(Content)`
    background: ${props => props.theme2 === 'true' ? '#f0f2f5' : '#000'} !important;
    color: ${props => props.theme2 === 'true' ? '#000' : '#fff'};
`

function Home() {
    const [collapsed, setCollapsed] = useState(true);

    const { theme } = useSelector(state => state);

    const toggle = () => {
        setCollapsed(!collapsed)
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>

            <Siders collapsed={collapsed} theme={theme.toString()} />

            <LayoutCustom theme2={theme.toString()} className="site-layout" style={{ marginLeft: 0 }}>
                <HeaderCustom theme2={theme.toString()} className="site-layout-background">
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: toggle,
                    })}
                    <Headers theme={theme} />
                </HeaderCustom>
                <ContentCustom theme2={theme.toString()} style={{ margin: '16px 16px', backgroundColor: '#f0f2f5' }}>
                    <Switch>
                        <Route exact path="/" component={DashBoard} />
                        <Route exact path="/weather_covid" component={WeatherCovid} />
                    </Switch>
                </ContentCustom>
                <Footer style={{ textAlign: 'center' }}>kakakakka ©2021 Created by my coder_y</Footer>
            </LayoutCustom>
        </Layout>
    )
}

export default Home
