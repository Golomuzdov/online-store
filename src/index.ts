import { Details } from './components/details/details';
import { Router } from './components/routing';
import './style/home_page.scss';
import { Products } from './components/products/products';
import { Routes } from './components/intefaces/interfaces';

const productsPage = new Products();
const detailsPage = new Details();
const router = new Router();

window.addEventListener('popstate', () => {
  const path = window.location.pathname;
  const queryParams = window.location.search ?? '';

  if (path === Routes.Products) {
    router.navigate(Routes.Products, productsPage.renderCatalog());
  }

  if (path === Routes.Details) {
    const cardId = queryParams.split('=').reverse()[0];
    router.navigate(Routes.Details, detailsPage.renderCardDetails(cardId), queryParams);
  }
});

