import { Routes } from './intefaces/interfaces';
export class Router {
  public navigate(route: Routes, template: HTMLElement, queryParams?: string): void {
    const main: HTMLElement = <HTMLElement> document.querySelector('.main');
    const path = queryParams ? route + queryParams : route;

    Promise.resolve(window.location)
      .then(location => {
        if (!location.pathname.includes(Routes.Products || Routes.Details || Routes.Cart)) {
          window.location.pathname = '/';
        } else {
          main.innerHTML = '';
          main.appendChild(template);
          
          if (location.pathname !== path) {
            window.history.pushState({}, '', path);
          }
        }
      });    
  }
}