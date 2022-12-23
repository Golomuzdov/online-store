import { ICatalog } from './../intefaces/interfaces';

import { CATALOG } from './catalog/catalog';
export class Products {
  private cardsData: ICatalog[] = CATALOG;

  public renderCards(): void {
    const cardTemplate: HTMLTemplateElement = <HTMLTemplateElement> this.queryElement('#card');
    const productItems: HTMLElement = <HTMLElement> this.queryElement('.products__items');

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

      productItems.appendChild(cardWrapper);
        
    });
  }

  private queryElement(selector: string): HTMLElement | null {
    return document.querySelector(selector);
  }
}

