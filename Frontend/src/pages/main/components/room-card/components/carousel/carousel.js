import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import '../../room-card.css'

export const Carousel = ({ images }) => {
	const settings = {
		lazyLoad: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		initialSlide: 1,
	}

	return (
		<Slider {...settings}>
			{images.map(roomImage => (
				<img
					key={roomImage}
					className="room-card-image room-card-block"
					src={roomImage}
					alt="Room"
				/>
			))}
		</Slider>
	)
}
