class News {
  element = null;
  constructor(obj, opt) {
    const type = opt && opt.type ? opt.type : 0;
    this.element = document.createElement('a');
    this.element.href = './news-detail.html';
    const container = document.createElement('div');
    container.className = 'flex flex-1 flex-col items-start news-card';

    const title = document.createElement('p');
    title.textContent = obj.title;
    title.className = `${type === 0 ? 'text-white' : 'text-black'} text-xl leading-9 font-bold mb-4 md:mb-7`;
    const content = document.createElement('p');
    content.textContent = obj.content;
    content.className = `${type === 0 ? 'text-white' : 'text-black'} text-sm leading-7`;
    const background = document.createElement('div');
    background.className = 'bg-no-repeat bg-cover bg-center bg-origin-content news-image';
    background.style.cssText = `background-image: url(${obj.image})`;
    const container1 = document.createElement('div');
    container1.appendChild(title);
    container1.appendChild(content);
    container.appendChild(background);
    container.appendChild(container1);
    this.element.appendChild(container);
  }

  render() {
    return this.element;
  }

  isValid() {}
}

