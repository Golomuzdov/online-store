import { Details } from './../details/details';
import { Router } from './../routing';

import { CATALOG } from './catalog/catalog';
import { Cart } from '../cart/cart';

import Sorting from './../filters/sort';
import { Filters } from '../filters/filters';
<<<<<<< HEAD
import { UrlSearchParams } from '../search-params/url';
import Slider from '../slider/slider';
// eslint-disable-next-line import/namespace
import { ICatalog, CartItem, Routes } from '../intefaces/interfaces';
// import { Selection } from '../enums/enums';
=======
import { urlSet } from '../search-params/url';
import Slider from '../slider/slider';

const brands = ['apple', 'xiaomi', 'samsung'];
// const categories = ['phones', 'laptops', 'accessories'];
>>>>>>> fb6ecf6 (feat: add filters/sorting with query params)

export class Products {
  private cardsData: ICatalog[] = CATALOG;

  private router: Router = new Router();

  private details: Details = new Details();

  private slider = new Slider;


  private cart: Cart = new Cart();

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
    this.slider.renderSlider();
  }

  public updateCards(array: ICatalog[]) {
    const arrayOfItems = Array.from(this.productItems.children);
    arrayOfItems.forEach((e: Element) => e.remove());
    this.cardsData = array;
    this.renderCatalog();
  }
  
  public renderCatalog(): HTMLElement {
    const catalogTemplate: HTMLTemplateElement = <HTMLTemplateElement> this.queryElement('#products');
    const catalogTemplateNode: HTMLTemplateElement = <HTMLTemplateElement> catalogTemplate.content.cloneNode(true);
    const catalogWrapper:HTMLElement = <HTMLElement> catalogTemplateNode.querySelector('.main-wrapper');
    const productsWrapper: HTMLElement = <HTMLElement> catalogTemplateNode.querySelector('.products__items');
    let cardWrapper: HTMLElement | null = null;

    this.cardsData.forEach((card: ICatalog, index: number) => {
      const isFirstCard = index === 0;
      
      if (isFirstCard) {
        cardWrapper = <HTMLElement>catalogWrapper.querySelector('.wrapper-item');
      } else {
        cardWrapper = <HTMLElement>catalogWrapper.querySelector('.wrapper-item')?.cloneNode(true);
      }

      productsWrapper.appendChild(this.filledCard(cardWrapper, card));
    });
        
    this.addListenerToCard(productsWrapper);
    this.addListenerToCart();

    return catalogWrapper; 
  }

<<<<<<< HEAD
  private filledCard(cardWrapper: HTMLElement, card: ICatalog): HTMLElement {
    const cardTitle: HTMLElement = <HTMLElement>cardWrapper.querySelector('.item-content__title');
    const itemCategory: HTMLElement = <HTMLElement>cardWrapper.querySelector('.item-content__category');
    const itemBrand: HTMLElement = <HTMLElement>cardWrapper.querySelector('.item-content__brand');
    const itemPrice: HTMLElement = <HTMLElement>cardWrapper.querySelector('.item-content__price');
    const itemAmount: HTMLElement = <HTMLElement>cardWrapper.querySelector('.item-content__discount');
    const itemRating: HTMLElement = <HTMLElement>cardWrapper.querySelector('.item-content__rating');
    const addRemoveFromCart: HTMLElement = <HTMLElement> cardWrapper.querySelector('.item__button-add');
    const cart: CartItem[] = JSON.parse(<string>localStorage.getItem('cart'));
    const currentCard = cart ? cart.find(item => item.id === card.id) : undefined;
=======
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
>>>>>>> fb6ecf6 (feat: add filters/sorting with query params)

    addRemoveFromCart.innerHTML = currentCard ? 'DROP FROM CART' : 'ADD TO CART';
    cardTitle.innerHTML = card.name;
    cardWrapper.style.background = `url(${card.image[0]})`;
    cardWrapper.setAttribute('id', `${card.id}`);
    cardWrapper.style.backgroundSize = 'cover';
    itemCategory.innerHTML = `Category: ${card.category}`;
    itemBrand.innerHTML = `Brand: ${card.brand}`;
    itemPrice.innerHTML = `Price: $ ${card.price}`;
    itemRating.innerHTML = `Rating: ${card.rating}`;
    itemAmount.innerHTML = `Amount: ${card.amount}`;

<<<<<<< HEAD
    return cardWrapper;
  }

  private addListenerToCard(cardsWrapper: HTMLElement ): void {
    cardsWrapper.addEventListener('click', (event) => {
      const target: HTMLElement = <HTMLElement>event.target;
      const cardId: string = <string>target.closest('.wrapper-item')?.getAttribute('id');
      if (!target.className.includes('item__button-add')) {
        this.router.navigate(Routes.Details, this.details.renderCardDetails(cardId), `?id=${cardId}`);
      } else {
        
        if (target.innerText === 'DROP FROM CART') {
          target.innerHTML = 'ADD TO CART';
          this.removeItemFromCart(cardId);
        } else {
          target.innerHTML = 'DROP FROM CART';
          this.setItemsLocalStorage(cardId);
        }
      }
=======
      this.productItems.appendChild(cardWrapper);
>>>>>>> fb6ecf6 (feat: add filters/sorting with query params)
    });
  }

  private removeItemFromCart(cardId: string): void {
    let cartItems: CartItem[] = JSON.parse(<string>localStorage.getItem('cart'));
    cartItems = cartItems.filter(item => item.id !== cardId);
    if (cartItems.length) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    } else {
      localStorage.removeItem('cart');
    }
    
  }

  private setItemsLocalStorage(cardId: string):void {
    const itemsStorage: CartItem[] = [];
    const cartItem: CartItem = { id: cardId, amount: '1' };
    if (!localStorage.getItem('cart')) {
      
      itemsStorage.push(cartItem);
      localStorage.setItem('cart', JSON.stringify(itemsStorage));
    } else {
      const cartItems: CartItem[] = JSON.parse(<string>localStorage.getItem('cart'));
      cartItems.push(cartItem);
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }

  private cartBlock: HTMLElement = <HTMLElement>document.querySelector('.header__shopping-basket');

  private addListenerToCart(): void {
    this.cartBlock.addEventListener('click', () => {
      if (localStorage.length) {
        this.router.navigate(Routes.Cart, this.cart.renderCart());
      } else {
        // window.history.pushState({}, '', '/cart');
        
      }
    });
  }
  

  private queryElement(selector: string): HTMLElement | HTMLTemplateElement | null {
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

