import { CATALOG } from './catalog/catalog';

export class Products {
  productsItems: HTMLElement | null;

  constructor() {
    this.productsItems = document.querySelector('.products__items');
  }

  render() {
    let htmlCatalog = '';
    const data = CATALOG;
    data.forEach(({ id, name, category, description, price, amount, image, rating }) => {
      console.log(id, name, category, description, price, amount, image, rating);
      htmlCatalog +=
      `
      <div class="products-element">
         <h3 class="products-element__name">${name}</h3>
         <img class="products-element__img" src="${image[0]}"/>
         <h4 class="products-element__price">${price}</h4>
         <div class="item__button-conteiner">
            <button class="item__button">ADD TO CART</button>
            <button class="item__button">DETAILS</button>
         </div>
      </div>
      `;
    });
    const html = `
      <div class="products-container">
         ${htmlCatalog}
      </div>
    `;
    
    this.productsItems!.innerHTML = html;
  }
}