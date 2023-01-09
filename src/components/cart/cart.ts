import { CATALOG } from './../products/catalog/catalog';
import { ICatalog, CartItem } from './../intefaces/interfaces';

export class Cart {
  private cardsData: ICatalog[] = CATALOG;
  
  private pageContent: ICatalog[][] = [];

  private cartTemplate: HTMLTemplateElement = <HTMLTemplateElement>document.getElementById('cart');

  private currentPage = 1;

  private currentItemsLimit = 3;

  private summaryPrice = 0;

  public renderCart(): HTMLElement {
    const cartItems: CartItem[] = JSON.parse(<string>localStorage.getItem('cart'));
    const cardsToRender: ICatalog[] = this.getCardsToRender(cartItems);
   
    const cartTemplateNode: HTMLTemplateElement = <HTMLTemplateElement> this.cartTemplate.content.cloneNode(true);
    const cartWrapper: HTMLElement = <HTMLElement>cartTemplateNode.querySelector('.cart-wrapper');

    const inputLimit: HTMLInputElement = <HTMLInputElement> cartTemplateNode.querySelector('.limit__input');
    const inputPage: HTMLInputElement = <HTMLInputElement> cartTemplateNode.querySelector('.pages-number');
  
    this.pageContentLimit(cardsToRender, this.currentItemsLimit);
    this.addListnerButtonLimit(inputLimit);
    this.addListnerPageNumber(inputPage);
    this.updateCart(cartWrapper, this.pageContent[this.currentPage - 1]);

    inputLimit.max = cartItems.length < 5 ? cartItems.length.toString() : '5';
    inputPage.max = this.pageContent.length.toString();
    this.summaryPrice = 0;

    return cartWrapper;

  }

  private updateCart(cartWrapper: HTMLElement, cardsToRender: ICatalog[]): void {
    const cartItemsWrapper: HTMLElement = <HTMLElement>cartWrapper.querySelector('.wrapper-cart-products');
    const cartItem: HTMLElement = <HTMLElement>cartWrapper.querySelector('.cart-products');
    const totalNumberProducts: HTMLElement = <HTMLElement> cartWrapper.querySelector('.cart-amount__products');
    const totalPrice: HTMLElement = <HTMLElement> cartWrapper.querySelector('.cart-amount__total-price');
    const cart: CartItem[] = JSON.parse(<string>localStorage.getItem('cart'));

    cardsToRender.forEach((el, index: number) => {
      const isFirst = index === 0;

      if (isFirst) {
        this.fillCartItem(el, cartItem, index, cart, cartWrapper);
      } else {
        const cartItemsNode: HTMLElement = <HTMLElement> cartItem.cloneNode(true);  
        this.fillCartItem(el, cartItemsNode, index, cart, cartWrapper);
        cartItemsWrapper.appendChild(cartItemsNode);
      }
      this.summaryPrice += el.price * Number(cart[index].amount);
      totalNumberProducts.innerHTML = `Products: ${cardsToRender.length}`;
    });
    

    totalPrice.innerHTML = this.summaryPrice.toString();
  }

  private fillCartItem(card: ICatalog, cardNode: HTMLElement, index: number, cart: CartItem[], cartWrapper: HTMLElement):void {
    const cardSerialNumber: HTMLElement = <HTMLElement> cardNode.querySelector('.serial-number');
    const cartImage: HTMLElement = <HTMLElement>cardNode.querySelector('.cart-products__image');
    const cartDescriptionTitle: HTMLElement = <HTMLElement>cardNode.querySelector('.description__title');
    const descriptionText: HTMLElement = <HTMLElement>cardNode.querySelector('.description__text');
    const descriptionRating:HTMLElement = <HTMLElement>cardNode.querySelector('.description__rating');
    const totalAmount: HTMLElement = <HTMLElement>cardNode.querySelector('.number-contol__amount');
    const price: HTMLElement = <HTMLElement>cardNode.querySelector('.number-contol__price');
    const cartAmount: HTMLElement = <HTMLElement>cardNode.querySelector('.add-remove-amount');
    
    // const descriptionDiscount:HTMLElement = <HTMLElement>cartItemsWrapper.querySelector('.description__discount');
    cardSerialNumber.innerHTML = `${index + 1}`;
    cartAmount.innerHTML = `${cart[index].amount}`;
    cartImage.style.background = `url(${card.image[0]})`;
    cartImage.style.backgroundSize = 'cover';
    cartDescriptionTitle.innerHTML = card.name;
    descriptionText.innerHTML = card.description;
    descriptionRating.innerHTML = `Rating: ${card.rating}`;
    totalAmount.innerHTML = `${card.amount}`;
    price.innerHTML = `${Number(cart[index].amount) * card.price}`;

    this.addListnerAmountControl(cardNode, card, cartWrapper);

  }

  private getCardsToRender(cartItems: CartItem[]): ICatalog[] {
    const cardsToRender: ICatalog[] = [];

    cartItems.forEach(item => {
      const cardItem = <ICatalog> this.cardsData.find(card => card.id === item.id);
      cardsToRender.push(cardItem);
    });

    return cardsToRender;
  }
  
  private pageContentLimit(cardsToRender: ICatalog[], limit: number): void {
    this.pageContent = [];
    for (let i = 0; i < cardsToRender.length; i += limit) {
      this.pageContent.push(cardsToRender.slice(i, i + limit));
    }
  }

  private addListnerButtonLimit(inputLimit: HTMLInputElement):void {
    inputLimit.value = this.currentItemsLimit.toString();
 
    inputLimit.addEventListener('change', () => {
      this.currentItemsLimit = Number(inputLimit.value);
      this.insertToMain(this.renderCart());
    });
  }

  private addListnerPageNumber(inputPage: HTMLInputElement) {
    if (this.currentPage > this.pageContent.length) {
      this.currentPage = this.pageContent.length;
    }
    inputPage.value = this.currentPage.toString();
    inputPage.addEventListener('change', () => {
      this.currentPage = Number(inputPage.value);
      this.insertToMain(this.renderCart());
    });
  }

  private addListnerAmountControl(cardNode: HTMLElement, card: ICatalog, cartWrapper: HTMLElement): void {
    const amountControl: HTMLElement = <HTMLElement> cardNode.querySelector('.add-remove-control');
    const price: HTMLElement = <HTMLElement>cardNode.querySelector('.number-contol__price');
    const totalPrice: HTMLElement = <HTMLElement> cartWrapper.querySelector('.cart-amount__total-price');
    
    amountControl.addEventListener('click', (event) => {
      const target: Element = <Element>event.target;
      const amount: HTMLElement = <HTMLElement>target.parentElement?.querySelector('.add-remove-amount');
      const totalAmount: HTMLElement = <HTMLElement>cardNode.querySelector('.number-contol__amount');
      const cartItems: CartItem[] = JSON.parse(<string>localStorage.getItem('cart'));
      const currentCard: CartItem = <CartItem>cartItems.find(item => item.id === card.id);

      let currentAmount = Number(amount.innerText);

      if (target.className.includes('add-button') && Number(totalAmount.innerText) > currentAmount) {
        currentAmount += 1;
        price.innerHTML = `${Number(price.textContent) + card.price}`;
        totalPrice.innerHTML = `${Number(totalPrice.textContent) + card.price}`;
        currentCard.amount = currentAmount.toString();
        localStorage.setItem('cart', JSON.stringify(cartItems));
      } 

      if (target.className.includes('remove-button')) {
        
        currentAmount = currentAmount - 1;
        totalPrice.innerHTML = `${Number(totalPrice.textContent) - card.price}`;
        if (currentAmount === 0) {
          cartItems.splice(cartItems.indexOf(currentCard), 1);
          localStorage.setItem('cart', JSON.stringify(cartItems));
          cardNode.remove();
          return;
        }

        currentCard.amount = currentAmount.toString();
        localStorage.setItem('cart', JSON.stringify(cartItems));
        price.innerHTML = `${Number(price.textContent) - card.price}`;
        
      }
      
      amount.innerHTML = currentAmount.toString();
    });
  }

  private insertToMain(cart: HTMLElement): void {
    const main: HTMLElement = <HTMLElement> document.querySelector('.main');
    main.innerHTML = '';
    main.appendChild(cart);
  }

}

