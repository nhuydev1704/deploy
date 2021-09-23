import { get } from 'lodash';
import React from 'react';
import Slider from "react-slick";
import './style.css';


const SlideWeather = (props) => {
    const dataWeather = get(props, 'dataWeather', [])
    const d = new Date();
    const dd = String(d.getDate()).padStart(2, '0');

    const settings = {
        // className: "center",
        // centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: dataWeather.length >= 4 ? 4 : dataWeather.length,
        speed: 500,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        focusOnSelect: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <div>
            <Slider {...settings}>
                {
                    dataWeather && dataWeather.length > 0 && dataWeather.map((item, index) => {
                        return <div key={index}>
                            <div
                                className={`slider_item ${parseInt(dd)
                                    == parseInt(item?.dt_txt.slice(8, 10)) ? 'itemchange' : ''
                                    }`
                                }>
                                <div style={{ color: props.theme == true ? '#0051ff' : 'white' }} className="weather_time">
                                    {item.dt_txt}
                                </div>
                                <p className="weather_des">
                                    {item?.weather[0]?.description.charAt(0).toUpperCase() + item?.weather[0].description.slice(1)}
                                </p>
                                <div className="weather_detail">
                                    <img src={`http://openweathermap.org/img/w/${item?.weather[0]?.icon}.png`} alt="123" />
                                    <span>{`${item.main.temp} °C`}</span>
                                </div>
                                <div>
                                    {`Độ ẩm: ${item.main.humidity}%`}
                                </div>
                            </div>
                        </div>
                    })
                }
            </Slider>
        </div>
    )
}

export default SlideWeather
