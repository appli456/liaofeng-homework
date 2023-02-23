import url from 'url';
import { PopularEnum } from "./consts";

export function getQuery(): { [key: string]: string | string[] | undefined } | null {
  const urlObj = url.parse(location.href, true);
  return urlObj.query;
}

export function getHash(): string {
  return (location.hash).replace('#', '');
}

export function setHash(hash: string): void {
  location.hash = `#${hash}`;
}

export function initialPopularLanguage(): string {
  const hash = getHash().toLowerCase();

  if (Object.prototype.hasOwnProperty.call(PopularEnum, hash)) {
    return PopularEnum[hash];
  }

  return PopularEnum.all;
}
