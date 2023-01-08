import { ICatalog, LocalOptions } from '../intefaces/interfaces';
import { UrlSearchParams } from '../search-params/url';

export class Filters {

  search: UrlSearchParams;

  searchObject: void;

  constructor() {
    this.search = new UrlSearchParams();
    this.searchObject = this.search.urlGet();
  }

  filterAll(data: ICatalog[], options: LocalOptions): ICatalog[] {
    // eslint-disable-next-line no-param-reassign
    data = data.filter((item: ICatalog) => {
      return (
        this.filterByBrand(item, options.brands) &&
        this.filterByCategory(item, options.categories)
      );
    });

    this.markLabel(options);
    return data;
  }

  markLabel(options: LocalOptions): void {
    const labelsBrand: NodeListOf<HTMLLabelElement> = document.querySelectorAll('.brand-filter__label');
    const labelsColor: NodeListOf<HTMLLabelElement> = document.querySelectorAll('.category-filter__label');
    labelsBrand.forEach((brand) => {
      if (options.brands.includes(brand.innerHTML)) {
        brand.classList.add('checked');
      } else {
        brand.classList.remove('checked');
      }
    });

    labelsColor.forEach((category) => {
      if (options.colors.includes(category.htmlFor)) {
        category.classList.add('checked');
      } else {
        category.classList.remove('checked');
      }
    });
  }

  filterByBrand(item: ICatalog, brands: string[]) {

    if (brands.length > 0) {
      return brands.includes(item.brand);
    } else {
      return true;
    }
    // console.log('searchObject', this.searchObject);
    
    // this.search.urlUpdate('brand', `${name}`);
    // return array.filter(element => element.brand.toLowerCase() === name);
  }

  filterByCategory(item: ICatalog, categories: string[]) {
    if (categories.length > 0) {
      return categories.includes(item.category);
    } else {
      return true;
    }
  }

  // removeFilters(array: ICatalog[], name: string) {
  //   return array.filter(element => element.brand.toLowerCase() === name);
  // }
}
