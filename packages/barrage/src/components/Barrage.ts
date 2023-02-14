import * as $ from 'jquery';
import {randomNumber} from "../utils";

interface BarrageOption {
  width: number;
  height: number;
}

class Barrage {
   private readonly element: JQuery<HTMLElement>;
   id: Symbol = Symbol();
  constructor(text: string, options: BarrageOption) {
    const span = $('<span></span>');
    span.text(text)
      .addClass('barrage')
      .css('color', `rgba(${randomNumber(0, 255)}, ${randomNumber(0, 255)}, ${randomNumber(0, 255)})`)
      .css('top', randomNumber(0, options.height))
      .css('left', randomNumber(0, options.width))
      .css('font-size', randomNumber(12, 24))
      .attr('data-speed', randomNumber(1, 5));

    this.element = span;
  }

  getElement() {
    return this.element;
  }

  clear() {
    this.element.remove();
  }
}

export default Barrage;
