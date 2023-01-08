import { Details } from './../details/details';
import { Router } from './../routing';

import { CATALOG } from './catalog/catalog';
import { Cart } from '../cart/cart';

import Sorting from './../filters/sort';
import { Filters } from '../filters/filters';
import { UrlSearchParams } from '../search-params/url';
import Slider from '../slider/slider';
// eslint-disable-next-line import/namespace
import { ICatalog, CartItem, Routes } from '../intefaces/interfaces';
// import { Selection } from '../enums/enums';

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

