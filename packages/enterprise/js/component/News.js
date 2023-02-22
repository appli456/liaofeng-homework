class News {
  element = null;
  constructor(obj, opt) {
    this.element = this.createElement(obj, opt);
  }
  createElement(obj, opt) {
    const type = opt && opt.type ? opt.type : 0;
    const link = document.createElement('a');
    link.href = `./news-detail.html?id=${obj.id}`;
    const container = document.createElement('div');
    container.className = 'flex flex-1 flex-col items-start news-card';

    const title = document.createElement('p');
    title.textContent = obj.title;
    title.className = `${type === 0 ? 'text-white' : 'text-black'} text-xl leading-9 font-bold mb-4 md:mb-7`;
    title.dataset.enterAnimation = 'fade';
    const content = document.createElement('p');
    content.textContent = obj.content;
    content.className = `${type === 0 ? 'text-white' : 'text-black'} text-sm leading-7`;
    content.dataset.enterAnimation = 'fade';
    const background = document.createElement('div');
    background.className = 'bg-no-repeat bg-cover bg-center bg-origin-content news-image';
    background.style.cssText = `filter:blur(4px);background: black`;
    this.waitImageLoad(obj.image, background);
    const container1 = document.createElement('div');
    container1.appendChild(title);
    container1.appendChild(content);
    container.appendChild(background);
    container.appendChild(container1);
    link.appendChild(container);

    return link;
  }

  waitImageLoad(image, element) {
    const imageElement = new Image();
    imageElement.src = image;
    imageElement.onload = function() {
      element.style.cssText = `background-image: url(${image})`;
    }
  }

  render() {
    return this.element;
  }

  isValid() {}
}

