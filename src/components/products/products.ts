import { Details } from './../details/details';
import { Router } from './../routing';

import { CATALOG } from './catalog/catalog';
import { Cart } from '../cart/cart';

import Sorting from './../filters/sort';
import { Filters } from '../filters/filters';
import { urlSet } from '../search-params/url';
import Slider from '../slider/slider';
import { ICatalog, CartItem, Routes } from '../interfaces/interfaces';
import { target } from 'nouislider';

const brands = ['apple', 'xiaomi', 'samsung'];
// const categories = ['phones', 'laptops', 'accessories'];

export class Products {
  public sorting:Sorting =  new Sorting();

  public filters: Filters = new Filters();

  private cardsData: ICatalog[] = CATALOG;

  private router: Router = new Router();

  private details: Details = new Details();

  private slider = new Slider();

  private cart: Cart = new Cart();


  private brandNames: string[] = [];

  private categoryNames: string[] = [];

  public updateCards(array: ICatalog[], cardsWrapper: HTMLElement) {
    this.cardsData = array;

    let cardWrapper: HTMLElement | Node = <HTMLElement>cardsWrapper.querySelector('.wrapper-item');
    
    cardsWrapper.innerHTML = '';
    this.cardsData.forEach((card: ICatalog, index: number) => {
      const isFirstCard = index === 0;
      
      if (!isFirstCard) {
        cardWrapper = cardWrapper.cloneNode(true);
      } 

      cardsWrapper.appendChild(this.filledCard(<HTMLElement>cardWrapper, card));
    });
    
  }
  
  public renderCatalog(): HTMLElement {
    const catalogTemplate: HTMLTemplateElement = <HTMLTemplateElement> this.queryElement('#products');
    const catalogTemplateNode: HTMLTemplateElement = <HTMLTemplateElement> catalogTemplate.content.cloneNode(true);
    const catalogWrapper:HTMLElement = <HTMLElement> catalogTemplateNode.querySelector('.main-wrapper');
    const productsWrapper: HTMLElement = <HTMLElement> catalogTemplateNode.querySelector('.products__items');
    const select: HTMLSelectElement = <HTMLSelectElement>catalogTemplateNode.querySelector('.sort__selection');
    const checkbox: NodeListOf<Element> = catalogTemplateNode.querySelectorAll('input[type=checkbox]');
    const price: target = <target>catalogTemplateNode.querySelector('#slider-price');
    const amount: target = <target>catalogTemplateNode.querySelector('#slider-stock');

    this.sortCards(select, productsWrapper);
    this.filterCards(checkbox, productsWrapper);
    this.filterByPrice(price, productsWrapper);
    this.filterByAmount(amount, productsWrapper);
    this.viewCards(catalogWrapper, productsWrapper);

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
      const targetElement: HTMLElement = <HTMLElement>event.target;
      const cardId: string = <string>targetElement.closest('.wrapper-item')?.getAttribute('id');
      if (!targetElement.className.includes('item__button-add')) {
        this.router.navigate(Routes.Details, this.details.renderCardDetails(cardId), `?id=${cardId}`);
      } else {
        
        if (targetElement.innerText === 'DROP FROM CART') {
          targetElement.innerHTML = 'ADD TO CART';
          this.removeItemFromCart(cardId);
        } else {
          targetElement.innerHTML = 'DROP FROM CART';
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

  sortCards(select: HTMLElement, productsWrapper: HTMLElement) {
    select.addEventListener('change', (e) => {
      const targetElement = e.target as HTMLSelectElement;
      switch (targetElement.value) {
        case 'price-ASC':
          this.updateCards(this.sorting.priceAsc([...this.cardsData]), productsWrapper);
          break;
        case 'price-DESC':
          this.updateCards(this.sorting.priceDesc([...this.cardsData]), productsWrapper);
          break;
        case 'rating-ASC':
          this.updateCards(this.sorting.ratingAsc([...this.cardsData]), productsWrapper);
          break;
        case 'rating-DESC':
          this.updateCards(this.sorting.ratingDesc([...this.cardsData]), productsWrapper);
          break;
      }
    });
  }

  filterCards(checkbox: NodeListOf<Element>, productsWrapper: HTMLElement) {
    checkbox.forEach((input) => {
      input.addEventListener('change', (e) => {
        const targetElement = e.target as HTMLInputElement;
        const inputName = targetElement.getAttribute('name') as string;
        if (targetElement.checked) {
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
        this.updateCards(this.filters.filterAll(), productsWrapper);
      });
    });
  }

  filterByPrice(price: target, productsWrapper: HTMLElement) {
    this.slider.renderPriceSlider(price);
    price.noUiSlider?.on('update', () => {
      urlSet('price', price.noUiSlider?.get() as string[]);
      this.updateCards(this.filters.filterAll(), productsWrapper);
    });
  }

  filterByAmount(amount: target, productsWrapper: HTMLElement) {
    this.slider.renderAmountSlider(amount);
    amount.noUiSlider?.on('update', () => {
      urlSet('amount', amount.noUiSlider?.get() as string[]);
      this.updateCards(this.filters.filterAll(), productsWrapper);
    });
  }

  viewCards(catalogWrapper: HTMLElement, productsWrapper: HTMLElement) {
    const viewSmall = <HTMLElement>catalogWrapper.querySelector('.view-big');
    const viewBig = <HTMLElement>catalogWrapper.querySelector('.view-small');
    const cards =  Array.from(productsWrapper.children as HTMLCollectionOf<HTMLElement>) ;

    viewSmall.addEventListener('click', () => {
      cards.forEach(item => {
        item.style.maxWidth = 32 + '%';
      });  
    });

    viewBig.addEventListener('click', () => {
      cards.forEach(item => {
        item.style.maxWidth = 19 + '%';
      });

    });
  }
}

