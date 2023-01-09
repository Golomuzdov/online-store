/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { ICatalog } from '../intefaces/interfaces';
import { CATALOG } from '../products/catalog/catalog';
import { urlGet } from '../search-params/url';

export class Filters {
  private cardsData: ICatalog[] = CATALOG;

  filterAll(): ICatalog[] {
    const filterOptions = urlGet();
    
    const filteredData = this.cardsData.filter((item: ICatalog) => {
      return (
        this.filterByBrand(item, filterOptions.brands?.split('|')!) &&
        this.filterByCategory(item, filterOptions.categories?.split('|')!) &&
        this.filterByPrice(item, filterOptions.price?.split('|')!) &&
        this.filterByAmount(item, filterOptions.amount?.split('|')!)
      );
    });

    return filteredData;
  }

  filterByBrand(item: ICatalog, brands: string[]) {
    const brandsArray = brands ? brands : [];
    if (brandsArray.length > 0) {
      return brands.includes(item.brand.toLocaleLowerCase());
    } else {
      return true;
    }
  }

  filterByCategory(item: ICatalog, categories: string[]) {
    const categoriesArray = categories ? categories : [];
    if (categoriesArray.length > 0) {
      return categories.includes(item.category.toLocaleLowerCase());
    } else {
      return true;
    }
  }

  filterByPrice(item: ICatalog, price: string[]): boolean {
    return item.price < +price[1] && item.price > +price[0];
  }

  filterByAmount(item: ICatalog, amount: string[]): boolean {
    return +item.amount < +amount[1] && +item.amount > +amount[0];
  }
}
