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


  return {
    addClass: addClass,
    removeClass: removeClass,
  }
}

window.utils = utils();
