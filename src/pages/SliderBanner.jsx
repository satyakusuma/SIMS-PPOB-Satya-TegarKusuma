import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBanners } from '../redux/bannerSlice';
import Slider from 'react-slick';
import './SliderBanner.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SliderBanner = () => {
    const dispatch = useDispatch();
    const { banners, loading, error } = useSelector((state) => state.banner);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            console.error('No token found');
            return;
        }

        dispatch(fetchBanners(token));
    }, [dispatch]);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className="slider-banner">
            <p style={{ fontWeight: 'bold', marginBottom: '20px' }}>Temukan promo menarik</p>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error.message}</p>
            ) : (
                <Slider {...settings}>
                    {banners.map((banner, index) => (
                        <div key={index} className="banner-item">
                            <img src={banner.banner_image} alt={banner.banner_name} className="banner-image" />
                        </div>
                    ))}
                </Slider>
            )}
        </div>
    );
};

export default SliderBanner;
