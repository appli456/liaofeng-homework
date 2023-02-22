function enterAnimations() {
  let enterAnimationElements = null;

  function checkStartAnimation(element) {
    const rect = element.getBoundingClientRect();
    const width = document.documentElement.clientWidth;
    const height = document.documentElement.clientHeight;

    return rect.top < (height / 4 * 3) && rect.left < width;
  }


  function init() {
    update();
    window.addEventListener('scroll', window.utils.throttle(() => {
      for (let i = 0; i < enterAnimationElements.length; ++i) {
        const element = enterAnimationElements[i];
        if (Object.prototype.hasOwnProperty.call(element.dataset, 'animationFinish')) {
          continue;
        }

        if (checkStartAnimation(element)) {
          const animationType = element.dataset.enterAnimation;
          window.utils.removeClass(element, 'animation-item');
          window.utils.addClass(element, animationType)
          element.dataset.animationFinish = '';
        }
      }
    }, 100));
  }

  function update() {
    enterAnimationElements = document.querySelectorAll('[data-enter-animation]');
    enterAnimationElements.forEach((e) => {
      window.utils.addClass(e, 'animation-item');
    });
  }

  return {
    init: init,
    update: update,
  };
}

window.enterAnimationModule = enterAnimations();
