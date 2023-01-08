import { ICatalog } from './../intefaces/interfaces';
import { CATALOG } from './catalog/catalog';
import Sorting from './../filters/sort';
import { Filters } from '../filters/filters';
// eslint-disable-next-line import/namespace
import { UrlSearchParams } from '../search-params/url';
// import { Selection } from '../enums/enums';

export class Products {
  private cardsData: ICatalog[] = CATALOG;

  public sorting: Sorting;

  public filters: Filters;

  public select: HTMLElement;

  public checkbox: NodeListOf<Element>;

  public productItems: HTMLElement = <HTMLElement> this.queryElement('.products__items');

  public search: UrlSearchParams;

  checkboxNames: string[];

  constructor() {
    this.sorting = new Sorting();
    this.filters = new Filters();
    this.select = <HTMLSelectElement>document.querySelector('.sort__selection');

    this.checkbox = document.querySelectorAll('input[type=checkbox]');
    this.checkboxNames = [];
    this.search = new UrlSearchParams();
    this.sortCards();
    this.filterCards();
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
      const cardTemplateNode: HTMLTemplateElement  = <HTMLTemplateElement>cardTemplate.content.cloneNode(true);
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

  // filterCards() {
  //   const labelsBrand: NodeListOf<HTMLLabelElement> = document.querySelectorAll('.brand__filter-label');
  //   labelsBrand.forEach((brand) => {
  //     brand.addEventListener('click', () => {
  //       this.view.toggleBrand(brand.innerHTML);
  //     });
  //   });
  // }

  filterCards() {
    this.checkbox.forEach((input) => {
      input.addEventListener('change', (e) => {
       
        const target = e.target as HTMLInputElement;
        console.log(target.checked);
        const inputName = target.getAttribute('name') as string;
        if (target.checked) {
          this.checkboxNames.push(inputName);

        } else {
          this.checkboxNames.splice(this.checkboxNames.indexOf(inputName), 1);
        }
        console.log(this.checkboxNames);
        this.search.urlSet('filter', this.checkboxNames);
        this.search.urlGet();
        // this.updateCards(this.filters.filterByBrand(this.cardsData, inputName));
      });
    });
  }

  viewCards() {
    const viewSmall = <HTMLElement>document.querySelector('.view-big') as HTMLElement;
    const viewBig = <HTMLElement>document.querySelector('.view-small') as HTMLElement;
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

