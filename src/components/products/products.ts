import { Details } from './../details/details';
import { Router } from './../routing';
import { ICatalog, Routes } from './../intefaces/interfaces';

import { CATALOG } from './catalog/catalog';
export class Products {
  private cardsData: ICatalog[] = CATALOG;

  private router: Router = new Router();

  private details: Details = new Details();
  
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

    return catalogWrapper; 
  }

  private filledCard(cardWrapper: HTMLElement, card: ICatalog): HTMLElement {
    const cardTitle: HTMLElement = <HTMLElement>cardWrapper.querySelector('.item-content__title');
    const itemCategory: HTMLElement = <HTMLElement>cardWrapper.querySelector('.item-content__category');
    const itemBrand: HTMLElement = <HTMLElement>cardWrapper.querySelector('.item-content__brand');
    const itemPrice: HTMLElement = <HTMLElement>cardWrapper.querySelector('.item-content__price');
    const itemAmount: HTMLElement = <HTMLElement>cardWrapper.querySelector('.item-content__discount');
    const itemRating: HTMLElement = <HTMLElement>cardWrapper.querySelector('.item-content__rating');

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
        localStorage.setItem('cart', cardId);
      }
    });

  }

  private queryElement(selector: string): HTMLElement | HTMLTemplateElement | null {
    return document.querySelector(selector);
  }

}

