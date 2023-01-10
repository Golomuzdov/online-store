import { ICatalog } from '../interfaces/interfaces';
import { CATALOG } from '../products/catalog/catalog';

export class Details {
  private cardsData: ICatalog[] = CATALOG;

  private detailsTemplate: HTMLTemplateElement = <HTMLTemplateElement>document.getElementById('details');

  public renderCardDetails(cardId: string): HTMLElement {

    const cardToRender: ICatalog = <ICatalog> this.cardsData.find(card => card.id === cardId);
    const cardDetailsTemplateNode: HTMLTemplateElement  = <HTMLTemplateElement> this.detailsTemplate.content.cloneNode(true);
    const detailsWrapper: HTMLElement = <HTMLElement>cardDetailsTemplateNode.querySelector('.wrapper-details');
    
    const detailsListCategory: HTMLElement = <HTMLElement>detailsWrapper.querySelector('.details-list__item-category');
    const detailsListBrand: HTMLElement = <HTMLElement>detailsWrapper.querySelector('.details-list__item-brand');
    const detailsListName: HTMLElement = <HTMLElement>detailsWrapper.querySelector('.details-list__item-name');
        
    const detailsTitle: HTMLElement = <HTMLElement>detailsWrapper.querySelector('.details-title');
    const detailsImageFirst: HTMLElement = <HTMLElement>detailsWrapper.querySelector('.image-slide-1'); 
    const detailsImageSecond: HTMLElement = <HTMLElement>detailsWrapper.querySelector('.image-slide-2');
    const detailsBigImage: HTMLElement = <HTMLElement>detailsWrapper.querySelector('.big-image');
    const description: HTMLElement = <HTMLElement>detailsWrapper.querySelector('.information-description');
    const amount: HTMLElement = <HTMLElement>detailsWrapper.querySelector('.information-amount');
    const rating: HTMLElement = <HTMLElement>detailsWrapper.querySelector('.information-rating');
    const brand: HTMLElement = <HTMLElement>detailsWrapper.querySelector('.information-brand');
    const category: HTMLElement = <HTMLElement>detailsWrapper.querySelector('.information-category');
    const cost: HTMLElement = <HTMLElement>detailsWrapper.querySelector('.cost');
    
    detailsListCategory.innerHTML = cardToRender.category.toUpperCase();
    detailsListBrand.innerHTML = cardToRender.brand.toUpperCase();
    detailsListName.innerHTML = cardToRender.name.toUpperCase();
    
    detailsTitle.innerHTML = cardToRender.name;
    detailsImageFirst.style.background = `url(${cardToRender.image[0]})`;
    detailsImageFirst.style.backgroundSize = 'cover';
    detailsImageSecond.style.background = `url(${cardToRender.image[1]})`;
    detailsImageSecond.style.backgroundSize = 'cover';
    detailsBigImage.style.background = `url(${cardToRender.image[0]})`;
    detailsBigImage.style.backgroundSize = 'cover';
    description.innerHTML = cardToRender.description;
    amount.innerHTML = cardToRender.amount;
    rating.innerHTML = cardToRender.rating;
    brand.innerHTML = cardToRender.brand;
    category.innerHTML = cardToRender.category;
    cost.innerHTML = `$ ${cardToRender.price}`;
    
    detailsImageFirst.addEventListener(('click'), () => {
      detailsBigImage.style.background = `url(${cardToRender.image[0]})`;
      detailsBigImage.style.backgroundSize = 'cover';
      detailsImageSecond.classList.remove('border-glow');
      detailsImageFirst.classList.add('border-glow');
    });
    
    detailsImageSecond.addEventListener(('click'), () => {
      detailsBigImage.style.background = `url(${cardToRender.image[1]})`;
      detailsBigImage.style.backgroundSize = 'cover';
      detailsImageFirst.classList.remove('border-glow');
      detailsImageSecond.classList.add('border-glow');
    });

    return detailsWrapper;
  }
    
}