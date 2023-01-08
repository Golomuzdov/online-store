import './style/home_page.scss';
import { Products } from './components/products/products';
import Slider from './components/slider/slider';
// import Sorting from './components/filters/sort';
// import Sorting from './components/filters/sort';
// import App from './components/app/app';

const productsPage = new Products();
productsPage.renderCards();

const slider = new Slider;
slider.renderSlider();

// const app: App = new App();
// app.start();

// const sortPage = new Sort();

// const sorting = new Sorting;
// sorting.priceAsc();
// sorting.priceDesc();