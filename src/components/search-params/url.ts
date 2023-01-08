

export class UrlSearchParams {

  searchParams = new URLSearchParams(window.location.search);

  paramsArr: Array<string | string[]> = [];


  urlGet() {

    const paramsObj = Array.from(this.searchParams.keys()).reduce(
      (acc, val) => ({ ...acc, [val]: this.searchParams.get(val) }),
      {},
    );
    console.log(paramsObj);

  }

  urlSet(key: string, value: string | string[]) {

    const parsedVal = Array.isArray(value) ? value.join('|') : value;
    // this.searchParams.set(key, parsedVal);
    // if (this.searchParams.has(key)) {
      // switch (key) {
      //   case 'filter':
      //     console.log('hui');
      //     break;
      //   case 'sort':
      //     console.log('hui2');
      //     break;
      //   default:
      //     console.log('fef');
            
      // }
      this.searchParams.set(key, parsedVal);
      const newRelativePathQuery = window.location.search + '&' + this.searchParams.toString();
      history.pushState(null, '', newRelativePathQuery);
    // } else {
    //   this.searchParams.append(key, parsedVal);
    //   const updateRelativePathQuery = window.location.search + '?' + this.searchParams.toString();
    //   window.history.pushState(null, '', updateRelativePathQuery);
    // }
    console.log('ETOT', window.location.pathname);
    
    // http://localhost:8080/&filter=samsung%7Cxiaomi%7Capple

  }

  // urlUpdate(key: string, value: string | string[]) {

  //   const updateRelativePathQuery = window.location.search + '&' + this.searchParams.toString();
  //   if (!this.searchParams.has(key)) {
  //     this.searchParams.append(key, parsedVal);
  //     window.history.pushState(null, '', updateRelativePathQuery);
  //   } else {

  //   }


  // }
}