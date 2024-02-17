import React from 'react'
import './Hero.css';
import heroSlider1 from '../Assets/coffee-slider1.jpg'
import heroSlider2 from '../Assets/coffee-slider2.jpg'
import heroSlider3 from '../Assets/coffee-slider3.jpg'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';


const ImageSlider = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Slider {...sliderSettings}>
    <div>
      <div className="slider-item-1">
        <img src={heroSlider1} />
        <div className="slider-caption">
          <span className="first-slider-text">Coffee beans -30%</span>
          <button className="buy-now-button">BUY NOW</button>
          </div>

      </div>
    </div>
    <div className="slider-item-2">
  <Link to='/ground'>
    <img src={heroSlider2} alt="Hero Slider 2" />
    <div className="slider-caption">
      <span className="second-slider-text">
        Check available ground coffee
      </span>
    </div>
  </Link>
</div>

  </Slider>
  );
};

export default ImageSlider;
