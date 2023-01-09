import { ICatalog } from './../intefaces/interfaces';
import { CATALOG } from './catalog/catalog';
import Sorting from './../filters/sort';
import { Filters } from '../filters/filters';
import { urlSet } from '../search-params/url';
import Slider from '../slider/slider';

const brands = ['apple', 'xiaomi', 'samsung'];
// const categories = ['phones', 'laptops', 'accessories'];

export class Products {
  private cardsData: ICatalog[] = CATALOG;

  public sorting: Sorting;

  public filters: Filters;

  public select: HTMLElement;

  public checkbox: NodeListOf<Element>;

  public productItems: HTMLElement = <HTMLElement> this.queryElement('.products__items');

  brandNames: string[];

  categoryNames: string[];

  slider: Slider;

  constructor() {
    this.sorting = new Sorting();
    this.filters = new Filters();
    this.select = <HTMLSelectElement>document.querySelector('.sort__selection');

    this.checkbox = document.querySelectorAll('input[type=checkbox]');
    this.brandNames = [];
    this.categoryNames = [];
    this.slider = new Slider();
    this.sortCards();
    this.filterCards();
    this.filterByPrice();
    this.filterByAmount();
    this.viewCards();
  }

  public updateCards(array: ICatalog[]) {
    const arrayOfItems = Array.from(this.productItems.children);
    arrayOfItems.forEach((e: Element) => e.remove());
    this.cardsData = array;
    this.renderCards();
  }

  public renderCards(): void {
    const cardTemplate: HTMLTemplateElement = <HTMLTemplateElement> this.queryElement('#card');

    this.cardsData.forEach((card: ICatalog) => {
      const cardTemplateNode: HTMLTemplateElement = <HTMLTemplateElement>cardTemplate.content.cloneNode(true);
      const cardWrapper: HTMLElement = <HTMLElement>cardTemplateNode.querySelector('.wrapper-item');
      const cardTitle: HTMLElement = <HTMLElement>cardWrapper.querySelector('.item-content__title');
      const itemCategory: HTMLElement = <HTMLElement>cardWrapper.querySelector('.item-content__category');
      const itemBrand: HTMLElement = <HTMLElement>cardWrapper.querySelector('.item-content__brand');
      const itemPrice: HTMLElement = <HTMLElement>cardWrapper.querySelector('.item-content__price');
      const itemRating: HTMLElement = <HTMLElement>cardWrapper.querySelector('.item-content__rating');

      cardTitle.innerHTML = card.name;
      cardWrapper.style.background = `url(${card.image[0]})`;
      cardWrapper.style.backgroundSize = 'cover';
      itemCategory.innerHTML = `Category: ${card.category}`;
      itemBrand.innerHTML = `Brand: ${card.brand}`;
      itemPrice.innerHTML = `Price: $ ${card.price}`;
      itemRating.innerHTML = `Rating: ${card.rating}`;

      this.productItems.appendChild(cardWrapper);
    });
  }

  private queryElement(selector: string): HTMLElement | null {
    return document.querySelector(selector);
  }

  sortCards() {
    this.select.addEventListener('change', (e) => {
      const target = e.target as HTMLSelectElement;
      switch (target.value) {
        case 'price-ASC':
          this.updateCards(this.sorting.priceAsc([...this.cardsData]));
          break;
        case 'price-DESC':
          this.updateCards(this.sorting.priceDesc([...this.cardsData]));
          break;
        case 'rating-ASC':
          this.updateCards(this.sorting.ratingAsc([...this.cardsData]));
          break;
        case 'rating-DESC':
          this.updateCards(this.sorting.ratingDesc([...this.cardsData]));
          break;
      }
    });
  }

  filterCards() {
    this.checkbox.forEach((input) => {
      input.addEventListener('change', (e) => {
        const target = e.target as HTMLInputElement;
        const inputName = target.getAttribute('name') as string;
        if (target.checked) {
          if (brands.includes(inputName)) {
            this.brandNames.push(inputName);
          } else {
            this.categoryNames.push(inputName);
          }
        } else {
          if (brands.includes(inputName)) {
            this.brandNames.splice(this.brandNames.indexOf(inputName), 1);
          } else {
            this.categoryNames.splice(this.categoryNames.indexOf(inputName), 1);
          }
        }
        if (brands.includes(inputName)) {
          urlSet('brands', this.brandNames);
        } else {
          urlSet('categories', this.categoryNames);
        }
        this.updateCards(this.filters.filterAll());
      });
    });
  }

  filterByPrice() {
    this.slider.renderPriceSlider();
    this.slider.price.noUiSlider?.on('update', () => {
      urlSet('price', this.slider.price.noUiSlider?.get() as string[]);
      this.updateCards(this.filters.filterAll());
    });
  }

  filterByAmount() {
    this.slider.renderAmountSlider();
    this.slider.amount.noUiSlider?.on('update', () => {
      urlSet('amount', this.slider.amount.noUiSlider?.get() as string[]);
      this.updateCards(this.filters.filterAll());
    });
  }

  viewCards() {
    const viewSmall = (<HTMLElement>document.querySelector('.view-big')) as HTMLElement;
    const viewBig = (<HTMLElement>document.querySelector('.view-small')) as HTMLElement;
    const wrapperItem = document.getElementsByClassName('wrapper-item') as HTMLCollectionOf<HTMLElement>;
    viewSmall.addEventListener('click', () => {
      for (const i in wrapperItem) {
        wrapperItem[i].style.maxWidth = 32 + '%';
      }
    });
    viewBig.addEventListener('click', () => {
      for (const i in wrapperItem) {
        wrapperItem[i].style.maxWidth = 19 + '%';
      }
    });
  }
}

