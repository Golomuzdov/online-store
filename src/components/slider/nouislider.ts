import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

const slider = document.getElementById('slider-price') as HTMLElement;

noUiSlider.create(slider, {
  start: [20, 80],
  connect: true,
  range: {
    'min': 10,
    'max': 5200,
  },
   
});