import React from 'react'
import './Hero.css';
import heroSlider1 from '../Assets/coffee-slider1.jpg'
import heroSlider2 from '../Assets/coffee-slider2.jpg'
import heroSlider3 from '../Assets/coffee-slider3.jpg'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


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
        <img src={heroSlider1} alt="Coffee 1" />
      </div>
      <div>
        <img src={heroSlider2} alt="Coffee 2" />
      </div>
      <div>
        <img src={heroSlider3} alt="Coffee 3" />
      </div>
    </Slider>
  );
};

export default ImageSlider;
