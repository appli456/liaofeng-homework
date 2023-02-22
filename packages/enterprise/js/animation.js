function animation() {
  let animateID = null;
  const sliderItems = document.querySelectorAll('.slider-item');
  const circleList = document.querySelectorAll('.slider-circle');

  function getNextIndex() {
    let selectedIndex = -1;
    let nextIndex = -1;
    for (let i = 0; i < sliderItems.length; ++i) {
      const item = sliderItems[i];
      if (window.utils.hasClass(item, 'active')) {
        selectedIndex = i;

        if (selectedIndex === sliderItems.length - 1) {
          nextIndex = 0;
        } else {
          nextIndex = selectedIndex + 1;
        }

        break;
      }
    }

    return [nextIndex, selectedIndex];
  }

  function runNextSlider() {
    const item = document.querySelector('.selected-slider-circle');
    const right = item.querySelector('.slider-circle-progress-right');
    const left = item.querySelector('.slider-circle-progress-left');
    right.style.cssText = 'transform: rotate(-135deg)';
    left.style.cssText = 'transform: rotate(-135deg)';
    const [nextIndex, selectedIndex] = getNextIndex();
    change(nextIndex, selectedIndex);
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

  function change(nextIndex, selectedIndex) {
    window.utils.removeClass(sliderItems[selectedIndex], 'active');
    window.utils.addClass(sliderItems[nextIndex], 'active');
    for (let i = 0; i < circleList.length; ++i) {
      const className = circleList[i].className;
      if (i === nextIndex) {
        window.utils.addClass(circleList[i], 'selected-slider-circle');
      }
      if (className.indexOf('selected-slider-circle') >= 0) {
        window.utils.removeClass(circleList[i], 'selected-slider-circle')
      }
    }
  }

  function init() {
    circleList.forEach((item, index) => {
      item.addEventListener('click', () => {
        const [ nextIndex, selectedIndex ] = getNextIndex();
        if (index === selectedIndex) {
          return;
        }

        stop();
        change(index, selectedIndex)
        run();
      })
    });
  }

  return {
    run: run,
    init: init,
  }
}

window.animationModule = animation();
