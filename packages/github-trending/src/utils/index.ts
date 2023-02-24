import url from 'url';
import { PopularEnum } from "./consts";

export function getQuery(): { [key: string]: string | string[] | undefined } | null {
  const urlObj = url.parse(location.href, true);
  return urlObj.query;
}

export function setQuery(query: string) {
  location.search = `?${query}`;
}

export function addQuery(q: object) {
  const urlObj = url.parse(location.href, true);
  const query = {
    ...urlObj.query,
    ...q,
  };

  location.search = Object.keys(query).map((key) => {
    return `${key}=${query[key]}`;
  }).join('&');
}

export function getHash(): string {
  return (location.hash).replace('#', '');
}

export function setHash(hash: string): void {
  location.hash = `#${hash}`;
}

export function initialPopularLanguage(): string {
  const query = getQuery();
  if (query) {
    const language = typeof query.language === 'string' ? query.language.toLowerCase() : 'all';

    if (Object.prototype.hasOwnProperty.call(PopularEnum, language)) {
      return PopularEnum[language];
    }
  }

  return PopularEnum.all;
}

export function initialShowResult(): { 1: string, 2: string } {
  const obj = {1: '', 2: ''}
  const query = getQuery() || {};

  if (typeof query.left === 'string') {
    obj['1'] = query.left;
  }

  if (typeof query.right === 'string') {
    obj['2'] = query.right;
  }

  return obj;
}
