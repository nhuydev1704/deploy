import { Card, Col, Row, Select, Spin } from 'antd';
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import SlideWeather from '../components/Weather/SlideWeather';
import { dataCountry } from '../data/country.js';
import bgr from '../images/weather_bgr.jpg';
import bgr2 from '../images/weather_night-new.jpg';
const { Option } = Select;

const CardCustom = styled(Card)`
    color: ${props => props.theme2 === 'true' ? '#000' : 'rgba(255, 255, 255, .65)'} !important;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 3px, rgba(0, 0, 0, 0.2) 0px 2px 3px;
    border-radius: 6px ;
    border: none;
    background-repeat: no-repeat;
    background-size: cover;
    height: 500px;
    background-attachment: fixed;
    background-position: bottom;
    h2 {
        color: ${props => props.theme2 === 'true' ? '#000' : 'rgba(255, 255, 255, .65)'} !important;
    }
    .ant-card-head {
        color: ${props => props.theme2 === 'true' ? '#000' : 'rgba(255, 255, 255, .65)'} !important;
    }
   
`
const CardCustom2 = styled(Card)`
    background: rgba(73, 159, 208, .2);
    ${'' /* opacity: .1; */}
    color: ${props => props.theme2 === 'true' ? 'rgb(226, 221, 221)' : 'rgba(255, 255, 255, .65)'} !important;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 3px, rgba(0, 0, 0, 0.2) 0px 2px 3px;
    border-radius: 4px ;
    border: none;

    h2 {
        color: ${props => props.theme2 === 'true' ? 'rgb(226, 221, 221)' : 'rgba(255, 255, 255, .65)'} !important;
    }
    .ant-card-head {
        color: ${props => props.theme2 === 'true' ? 'rgb(226, 221, 221)' : 'rgba(255, 255, 255, .65)'} !important;
    }
   
`

const WeatherCovid = () => {
    const [dataWeather, setDataWeather] = useState([]);
    const [dataWeatherDay, setDataWeatherDay] = useState([]);
    const [dataCovid, setDataCovid] = useState([]);
    const [dataCovidDetail, setDataCovidDetail] = useState([]);
    const { theme } = useSelector(state => state);
    const [loading, setLoading] = useState(false)
    const [valueCode, setValueCode] = useState(1581129)
    const [countryName, setCountryName] = useState("Hà Nội")

    useEffect(() => {
        try {
            setLoading(true)
            const getData = async () => {
                const res = await
                    axios.get(`https://api.openweathermap.org/data/2.5/forecast?id=${valueCode}&appid=cee343d33e41970dd63c44b39c8620ab&lang=vi&units=metric`);
                setDataWeather(res?.data?.list)
                const res2 = await
                    axios.get(`https://api.openweathermap.org/data/2.5/weather?id=${valueCode}&appid=cee343d33e41970dd63c44b39c8620ab&lang=vi&units=metric`)
                setDataWeatherDay(res2.data)
                const res3 = await
                    axios.get('https://api-kent.netlify.app/.netlify/functions/api/vn')
                setDataCovid(res3.data)
                setDataCovidDetail(res3.data.detail)
                if (res.status == 200 && res2.status == 200) {
                    setLoading(false)
                }
            }
            getData();
        } catch (err) {
            console.log(err.message)
        }
    }, [valueCode])

    // const dataDate = dataWeather.filter(item => {
    //     return item.dt_txt.slice(0, 10) == moment().format().slice(0, 10)
    // })dataCovid
    // const parseJSON = JSON.parse(countryJson)
    // console.log(parseJSON)

    const rsCovid = [];
    if (!(_.isEmpty(dataWeatherDay))) {
        for (let i in dataCovidDetail) {
            rsCovid.push(dataCovidDetail[i])
        }
    }

    const dataCovidCountry = rsCovid.filter(item => {
        return item.name == countryName
    })

    function handleChange(value) {
        const dataName = dataCountry.find(item => {
            return item.id === value
        })
        setCountryName(dataName.name)
        setValueCode(value);
    }

    console.log(dataCovidCountry)
    return (
        <div style={{ height: '88vh' }}>
            <Row>
                <Col span={24}>
                    <Spin spinning={loading} tip="Đang tải dữ liệu...">
                        <CardCustom style={{ backgroundImage: `url(${theme == true ? bgr : bgr2})` }} theme2={theme.toString()} className="background_weather">
                            <Row gutter={[16, 16]}>
                                <Col style={{ height: '250px', padding: '0px 60px' }} span={24}>
                                    <Row style={{ height: '100%' }} justify="space-between">
                                        <Col span={6}
                                            style={{ height: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}
                                        >
                                            {dataWeatherDay && !(_.isEmpty(dataWeatherDay)) &&
                                                <div style={{
                                                    height: '100%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    flexDirection: 'column',
                                                    width: '100%',
                                                    color: '#FFFFCC'
                                                }}>
                                                    <p className="location">{`${dataWeatherDay.name} - ${dataWeatherDay.sys.country}`}</p>
                                                    <p className="location_time">
                                                        {`${moment(new Date(dataWeatherDay.dt * 1000 - (dataWeatherDay.timezone * 1000))).locale('fr').format("dddd, MMMM Do YYYY, h:mm:ss a")}`}
                                                    </p>
                                                    <img src={`http://openweathermap.org/img/w/${dataWeatherDay?.weather[0]?.icon}.png`} alt="img" className="weather_logo" />
                                                    <span className="temperature">
                                                        {`${dataWeatherDay.main.temp} °C - ${dataWeatherDay?.weather[0]?.description.charAt(0).toUpperCase() + dataWeatherDay?.weather[0].description.slice(1)}`}
                                                    </span>
                                                    <div className="wind">
                                                        <span>
                                                            {`Độ ẩm: ${dataWeatherDay.main.humidity}%`}
                                                        </span>
                                                        <span>
                                                            {`Gió: ${dataWeatherDay.wind.speed} Km/h`}
                                                        </span>
                                                    </div>
                                                </div>
                                            }
                                        </Col>
                                        <Col span={16}>
                                            {dataWeatherDay && !(_.isEmpty(dataWeatherDay)) &&
                                                <Row>
                                                    <Col span={8}>
                                                        <Select
                                                            className="select_country"
                                                            defaultValue={1581129}
                                                            onChange={handleChange}
                                                            showSearch
                                                            style={{ width: 200 }}
                                                            placeholder="Search to Select"
                                                            optionFilterProp="children"
                                                            filterOption={(input, option) =>
                                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                            }
                                                            filterSort={(optionA, optionB) =>
                                                                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                                                            }
                                                        >
                                                            {dataCountry && dataCountry.length > 0 &&
                                                                dataCountry.map((item, index) => {
                                                                    return <Option key={index} value={item.id}>{item.name}</Option>
                                                                })
                                                            }
                                                        </Select>
                                                        <Row gutter={[16, 16]} style={{ marginTop: '14px', color: 'white' }}>
                                                            <Col span={24}>
                                                                Áp suất: <strong>{dataWeatherDay.main.pressure}hPa</strong>
                                                            </Col>
                                                            <Col span={24}>
                                                                Hướng gió: <strong>{dataWeatherDay.wind.deg} °</strong>
                                                            </Col>
                                                            <Col span={24}>
                                                                Nhiệt độ tối thiểu: <strong>{dataWeatherDay.main.temp_min} ℃</strong>
                                                            </Col>
                                                            <Col span={24}>
                                                                Nhiệt độ tối đa: <strong>{dataWeatherDay.main.temp_max} ℃</strong>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                    <Col span={16}>
                                                        {dataCovidCountry && dataCovidCountry.length > 0 &&
                                                            <Row gutter={[16, 16]} justify="center">
                                                                <Col span={24}
                                                                    style={{ textAlign: 'center', fontWeight: 500 }}>
                                                                    <h3 style={{ margin: 0, color: 'white' }}>Thống kê covid</h3>
                                                                </Col>
                                                                <Col lg={24} xl={12} md={24} xs={24}>
                                                                    <CardCustom2
                                                                        size="small"
                                                                        theme2={theme.toString()}
                                                                        style={{ borderLeft: '5px solid rgb(201, 48, 44)' }}
                                                                    >
                                                                        <p>Số ca nhiễm</p>
                                                                        <strong>{dataCovidCountry[0].cases}</strong>
                                                                    </CardCustom2>
                                                                </Col>
                                                                <Col lg={24} xl={12} md={24} xs={24}>
                                                                    <CardCustom2
                                                                        size="small"
                                                                        style={{ borderLeft: '5px solid rgb(40, 167, 69)' }}
                                                                        theme2={theme.toString()}>
                                                                        <p>Số ca hồi phục</p>
                                                                        <strong>{dataCovidCountry[0].recovered}</strong>
                                                                    </CardCustom2>
                                                                </Col>
                                                                <Col span={6}></Col>
                                                                <Col lg={24} xl={12} md={24} xs={24}>
                                                                    <CardCustom2
                                                                        size="small"
                                                                        style={{ borderLeft: '5px solid gray' }}
                                                                        theme2={theme.toString()}>
                                                                        <p>Số ca tử vong</p>
                                                                        <strong>{dataCovidCountry[0].deaths}</strong>
                                                                    </CardCustom2>
                                                                </Col>
                                                                <Col span={6}></Col>

                                                            </Row>}
                                                    </Col>
                                                </Row>
                                            }
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={24} style={{ padding: '0px 60px' }} >
                                    <SlideWeather dataWeather={dataWeather && dataWeather} theme={theme} />
                                </Col>
                            </Row>
                        </CardCustom>
                    </Spin>
                </Col>
            </Row>
        </div>
    )
}

export default WeatherCovid
