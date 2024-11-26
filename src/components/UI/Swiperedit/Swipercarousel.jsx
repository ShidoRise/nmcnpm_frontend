import 'swiper/css';
import {Sliders} from './Sliders';
import slides from './mock.json';
function Swipercarousel () {
    return (
        <Sliders slides={slides}/>
      );
}

export default Swipercarousel;