/**
 * @jest-environment jsdom
 */


import {
  describe,
  expect,
  test,
} from '@jest/globals';

import {
  randomNumber,
} from '../src/utils';
import Barrage from "../src/components/Barrage";

describe('barrage test', () => {
  test('random number test', () => {
    for (let i = 0; i < 10000; ++i) {
      const value = randomNumber(2, 10);
      expect(value).toBeGreaterThan(2);
      expect(value).toBeLessThanOrEqual(10);
    }

    const less = randomNumber(4, 1);
    expect(less).toBe(0);
  });

  test('barrage create test', () => {
    const barrage = new Barrage('test', {
      width: 300,
      height: 200,
    });

    const element = barrage.getElement();
    expect(element.hasClass('barrage')).toBe(true);
    const e = element.get(0);
    if (e) {
      expect(e.style.left).toBe('300px');
    }
  });
})
