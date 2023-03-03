function lazyLoad() {
  let item = [];
  function init() {
    item = document.querySelectorAll('[data-lazyload-image]');
    item.forEach((element) => {
      if (element.dataset.lazyloadImage) {
        const image = new Image();
        image.src = element.dataset.lazyloadImage;
        image.onload = () => {
          element.style.backgroundImage = `url(${element.dataset.lazyloadImage})`
        }
      }
    });
  }

  return {
    init: init,
  };
}

window.lazyLoadModule = lazyLoad();
