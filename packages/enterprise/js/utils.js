function utils() {
  function addClass(element, className) {
    const preClassNames = element.className.split(' ');
    if (!preClassNames.length) {
      element.className = className;
    } else {
      if (preClassNames.indexOf(className) === -1) {
        preClassNames.push(className);

        element.className = preClassNames.join(' ');
      }
    }
    return element;
  }

  function removeClass(element, className) {
    const preClassNames = element.className.split(' ');
    const newClassNames = [];
    if (preClassNames.length) {
      for (let i = 0; i < preClassNames.length; ++i) {
        if (preClassNames[i] !== className) {
          newClassNames.push(preClassNames[i]);
        }
      }
    }

    element.className = newClassNames.join(' ');

    return element;
  }

  function hasClass(element, className) {
    const classNames = element.className.split(' ');
    return classNames.indexOf(className) > -1;
  }

  function getQuery() {
    const query = location.search.replace('?', '').split('&');
    const obj = {};

    for (let i = 0; i < query.length; ++i) {
      const item = query[i].split('=');
      if (item.length === 2) {
        obj[item[0]] = item[1];
      }
    }

    return obj;
  }

  function formatDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minutes = date.getMinutes();

    return `${year}年${month}月${day}日 ${hour}:${minutes}`;
  }

  function throttle(func, delay) {
    let lastTime = 0;

    return function() {
      const _this = this;
      const args = arguments;
      const currentTime = Date.now();
      if(currentTime - lastTime > delay){
        func.apply(_this, args);
        lastTime = currentTime
      }
    }
  }

  function debounce(func, delay){
    let timer;
    return function() {
      const _this = this;
      const args = arguments;
      if (timer){
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        func.apply(_this, args);
      }, delay)
    }
  }

  return {
    addClass: addClass,
    removeClass: removeClass,
    hasClass: hasClass,
    getQuery: getQuery,
    formatDate: formatDate,
    throttle: throttle,
    debounce: debounce,
  }
}

window.utils = utils();
