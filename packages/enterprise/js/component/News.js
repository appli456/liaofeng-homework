class News {
  element = null;
  constructor(obj) {
    this.element = document.createElement('div');
    this.element.className = 'flex flex-1 flex-col items-start news-card';

    const title = document.createElement('p');
    title.textContent = obj.title;
    title.className = 'text-white text-xl leading-9 font-bold mb-7';
    const content = document.createElement('p');
    content.textContent = obj.content;
    content.className = 'text-white text-sm leading-7';
    const background = document.createElement('div');
    background.className = 'bg-no-repeat bg-cover bg-center bg-origin-content news-image';
    background.style.cssText = `background-image: url(${obj.image})`;
    const container = document.createElement('div');
    container.appendChild(title);
    container.appendChild(content);
    this.element.appendChild(background)
    this.element.appendChild(container);
  }


  render() {
    return this.element;
  }

  isValid() {}
}

