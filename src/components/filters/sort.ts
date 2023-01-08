import { UrlSearchParams } from '../search-params/url';
import { ICatalog } from './../intefaces/interfaces';


class Sorting {

  search: UrlSearchParams;

  constructor() {
    this.search = new UrlSearchParams();
  }

  priceAsc(array: ICatalog[]) {
    this.search.urlSet('sort', 'price-ASC');
    return array.sort((a: ICatalog, b: ICatalog) => a.price - b.price);
  }

  priceDesc(array: ICatalog[]) {
    this.search.urlSet('sort', 'price-DESC');
    return array.sort((a: ICatalog, b: ICatalog) => b.price - a.price);
  }

  ratingAsc(array: ICatalog[]) {
    this.search.urlSet('sort', 'rating-ASC');
    return array.sort((a: ICatalog, b: ICatalog): number => {
      if (a.rating < b.rating) return -1;
      if (a.rating > b.rating) return 1;
      return 0;
    });
  }

  ratingDesc(array: ICatalog[]) {
    this.search.urlSet('sort', 'rating-DESC');
    return array.sort((a: ICatalog, b: ICatalog): number => {
      if (a.rating > b.rating) return -1;
      if (a.rating < b.rating) return 1;
      return 0;
    });
  }
}

export default Sorting;