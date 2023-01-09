import { LocalOptions } from '../intefaces/interfaces';

const searchParams = new URLSearchParams(window.location.search);

export function urlGet(): Partial<LocalOptions> {
  const paramsObj = Array.from(searchParams.keys()).reduce(
    (acc, val) => ({ ...acc, [val]: searchParams.get(val) }),
    {},
  );
  return paramsObj;
}

export function urlSet(key: string, value: string | string[]) {
  const parsedVal = Array.isArray(value) ? value.join('|') : value;
  if (!parsedVal) {
    searchParams.delete(key);
    window.history.replaceState({}, '', `${location.pathname}?${searchParams.toString()}`);
    return;
  }
  searchParams.set(key, parsedVal);
  window.history.replaceState({}, '', `${location.pathname}?${searchParams.toString()}`);
}