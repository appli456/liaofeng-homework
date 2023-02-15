function animation() {
  const SliderActiveRegex = /active/;
  let animateID = null;

  function sliderFadeIn() {
    const sliderItems = document.querySelectorAll('.slider-item');
    let selectedIndex = -1;
    let nextIndex = -1;
    for (let i = 0; i < sliderItems.length; ++i) {
      const item = sliderItems[i];
      if (SliderActiveRegex.test(item.className)) {
        selectedIndex = i;

        if (selectedIndex === sliderItems.length - 1) {
          nextIndex = 0;
        } else {
          nextIndex = selectedIndex + 1;
        }

        break;
      }
    }

    if (selectedIndex !== -1) {
      sliderItems[selectedIndex].className = sliderItems[selectedIndex].className.replace(' active', '');
      sliderItems[nextIndex].className = sliderItems[nextIndex].className + ' active'
    }
    return nextIndex;
  }

  function runNextSlider() {
    const item = document.querySelector('.selected-slider-circle');
    const list = document.querySelectorAll('.slider-circle');
    const right = item.querySelector('.slider-circle-progress-right');
    const left = item.querySelector('.slider-circle-progress-left');
    right.style.cssText = 'transform: rotate(-135deg)';
    left.style.cssText = 'transform: rotate(-135deg)';
    const nextIndex = sliderFadeIn();
    for (let i = 0; i < list.length; ++i) {
      const className = list[i].className;
      if (i === nextIndex) {
        list[i].className += ' selected-slider-circle';
      }
      if (className.indexOf('selected-slider-circle') >= 0) {
        list[i].className = className.replace(' selected-slider-circle', '');
      }
    }
  }

  function sliderProgressAnimation() {
    let progress = 0;
    return function progressFrame() {
      const item = document.querySelector('.selected-slider-circle');
      const right = item.querySelector('.slider-circle-progress-right');
      const left = item.querySelector('.slider-circle-progress-left');
      if (progress <= 50) {
        right.style.cssText = `transform: rotate(${-135 + 3.6 * progress}deg)`;
        left.style.cssText = 'transform: rotate(-135deg)';
      } else {
        right.style.cssText = 'transform: rotate(45deg)';
        left.style.cssText = `transform: rotate(${-135 + (3.6 * (progress - 50))}deg)`
      }
      progress += (20 / 60);

      if (progress >= 100) {
        progress = 0;
        runNextSlider();
      }

      animateID = window.requestAnimationFrame(progressFrame)
    }
  }

  function stop() {
    window.cancelAnimationFrame(animateID);
  }

  function run() {
    animateID = window.requestAnimationFrame(sliderProgressAnimation());
  }

  return {
    stop,
    run,
    runNextSlider,
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const animationFunction = animation();
  const circleItems = document.querySelectorAll('.slider-circle');
  circleItems.forEach((item) => {
    item.addEventListener('click', () => {
      if (item.className.indexOf('selected-slider-circle') >= 0) {
        return;
      }

      animationFunction.stop();
      animationFunction.runNextSlider();
      animationFunction.run();
    })
  });

  animationFunction.run();
});

