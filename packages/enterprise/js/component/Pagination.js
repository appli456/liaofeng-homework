/**
 * 分页子项目
 */
class PaginationItem {
  element = null;

  constructor(opt) {
    this.element = this.createElement(opt);
  }

  // onClick() {}
  //
  // setUp() {
  //   if (this.element) {
  //     this.element.addEventListener('click', this.onClick);
  //   }
  // }
  //
  // preClear() {
  //   if(this.element) {
  //     this.element.removeEventListener('click', this.onClick);
  //   }
  // }

  createElement(opt) {
    const number = opt.number;
    const active = opt.active;
    const elementTag = opt.element ? opt.element : 'button';

    const button = document.createElement(elementTag);
    button.className = `text-center ${active ? 'active' : ''} pagination-text pagination-item`;
    button.textContent = number;

    return button;
  }

  render() {
    return this.element;
  }
}

class Pagination {
  element = null;

  constructor(opt) {
    this.element = this.createElement(opt);
  }

  createElement(opt) {
    const left = document.createElement('a');
    const leftImage = document.createElement('img');
    leftImage.className = 'w-3.5 h-3.5';
    leftImage.src = '../media/left.png';
    leftImage.alt = 'left';
    left.appendChild(leftImage);

    const right = document.createElement('a');
    right.className = 'w-3.5 h-3.5 flex items-center justify-center bg-no-repeat bg-contain bg-origin-content bg-center';
    right.style.cssText = 'background-image: url(../media/right.png)';

    const maxIndex = opt.maxIndex;
    const activeIndex = opt.activeIndex;
    const elements = [];

    const firstItem = new PaginationItem({ number: 1, active: activeIndex === 1 });
    elements.push(firstItem);

    if (activeIndex > 3 && maxIndex > 5) {
      const ellipsis = new PaginationItem({ number: '...', active: false, element: 'span' });
      elements.push(ellipsis);
    }

    const start = Math.max(2, activeIndex - 1) - 1;
    const end = Math.min(maxIndex, activeIndex + 2);

    for (let i = start; i < end; ++i) {
      const item = new PaginationItem({ number: i + 1, active: activeIndex === i + 1 });
      elements.push(item);
    }

    if (end < maxIndex - 1) {
      const ellipsis = new PaginationItem({ number: '...', active: false, element: 'span' });
      elements.push(ellipsis);
    }
    if (end < maxIndex) {
      const lastItem = new PaginationItem({ number: maxIndex, active: activeIndex === maxIndex });
      elements.push(lastItem);
    }

    const container = document.createElement('div');
    container.className = 'flex flex-row items-center ml-3.5';
    container.appendChild(left);
    for (let i = 0; i < elements.length; ++i) {
      container.appendChild(elements[i].render());
    }
    container.appendChild(right);

    return container;
  }

  render() {
    return this.element;
  }
}

