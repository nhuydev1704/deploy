import React from 'react'
import nangmua from '../../images/nang_mua.png'
const CustomSlide = (props) => {
    const { index, ...prop } = props;
    return (
        <div className="slider_item" {...props}>
            <div className="weather_time">
                20:45
            </div>
            <p>Trời quang</p>
            <div className="weather_detail">
                <img src={nangmua} alt="123" />
                <span>-1*C</span>
            </div>
            <div>
                {index}
            </div>
        </div>
    )
}

export default CustomSlide
