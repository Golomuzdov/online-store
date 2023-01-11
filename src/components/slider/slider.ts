import noUiSlider, { target } from 'nouislider';
import 'nouislider/dist/nouislider.css';

class Slider {
  sliders: HTMLCollectionOf<Element>;

  constructor() {
    this.sliders = <HTMLCollectionOf<Element>>(<unknown>document.querySelectorAll('.slider'));
    
  }

  renderPriceSlider(price: target) {
    noUiSlider.create(price, {
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

  renderAmountSlider(amount: target) {
    noUiSlider.create(amount, {
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