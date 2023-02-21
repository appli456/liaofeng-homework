class Article {
  element = null;
  constructor(detail) {
    this.element = this.createElement(detail);
  }

  createElement(detail) {
    const background = document.createElement('div');
    background.className = 'bg-center bg-cover bg-no-repeat bg-origin-content detail-header-image';
    background.style.cssText = `background-image: url(${detail.image})`;

    const title = document.createElement('p');
    title.className = 'text-center text-base md:text-4xl md:leading-7 font-bold md:font-normal detail-title';
    title.textContent = detail.title;
    const subtitle = document.createElement('p');
    subtitle.className = 'text-center text-sm md:text-xl leading-7 detail-subtitle';
    const date = new Date(detail.createdAt);
    subtitle.textContent = `${window.utils.formatDate(date)} 来源：${detail.source}`;
    const titleContainer = document.createElement('div');
    titleContainer.appendChild(title);
    titleContainer.appendChild(subtitle);

    const textContainer = document.createElement('div');
    textContainer.className = 'flex flex-1 flex-col mt-4 md:mt-8 px-4';
    const section = document.createElement('p');
    section.className = 'font-bold content-section';
    section.textContent = detail.text;
    textContainer.appendChild(section);

    for (let i = 0; i < 5; ++i) {
      const essay = document.createElement('p');
      essay.className = 'text-sm md:text-base content-text';
      essay.textContent = detail.content;
      textContainer.appendChild(essay);
    }

    const content = document.createElement('div');
    content.className = 'detail-content';
    content.appendChild(background);
    content.appendChild(titleContainer);
    content.appendChild(textContainer);

    return content;
  }

  render() {
    return this.element;
  }
}
