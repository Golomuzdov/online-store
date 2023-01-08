import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

class Slider {
  sliders: HTMLCollectionOf<Element>;

  constructor() {
    this.sliders = <HTMLCollectionOf<Element>><unknown>document.querySelectorAll('.slider');
  }

  renderSlider() {
    const numSlider = [[10, 5200], [0, 100]];
    for (let i = 0; i < this.sliders.length; i++) {
      noUiSlider.create(this.sliders[i] as HTMLElement, {
        start: numSlider[i],
        step: 1,
        connect: true,
        range: {
          'min': numSlider[i][0],
          'max': numSlider[i][1],
        },
        tooltips: true,
      });
    }
  }
}

export default Slider;