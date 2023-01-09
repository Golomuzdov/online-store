import noUiSlider, { target } from 'nouislider';
import 'nouislider/dist/nouislider.css';

class Slider {
  sliders: HTMLCollectionOf<Element>;
  
  price: target;

  amount: target;

  constructor() {
    this.sliders = <HTMLCollectionOf<Element>>(<unknown>document.querySelectorAll('.slider'));
    this.price = <target>document.getElementById('slider-price');
    this.amount = <target>document.getElementById('slider-stock');
  }

  renderPriceSlider() {
    noUiSlider.create(this.price, {
      start: [10, 5200],
      connect: true,
      step: 1,
      range: {
        min: 10,
        max: 5200,
      },
      tooltips: true,
    });
  }

  renderAmountSlider() {
    noUiSlider.create(this.amount, {
      start: [0, 100],
      connect: true,
      step: 1,
      range: {
        min: 0,
        max: 100,
      },
      tooltips: true,
    });
  }
}

export default Slider;