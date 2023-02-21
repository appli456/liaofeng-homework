function sidebar() {
  let sidebar = null;
  let openIcon = null;
  let closeIcon = null;
  let mask = null;
  function init() {
    sidebar = document.querySelector('#sidebar');
    openIcon = document.querySelector('#sidebar-open');
    closeIcon = document.querySelector('#sidebar-close');
    mask = document.querySelector('#sidebar .mask');

    openIcon.addEventListener('click', function() {
      window.utils.addClass(sidebar, 'active');
    });

    closeIcon.addEventListener('click', function() {
      window.utils.removeClass(sidebar, 'active');
    });

    mask.addEventListener('click', function () {
      window.utils.removeClass(sidebar, 'active');
    });
  }

  return {
    init: init,
  }
}

window.sidebarModule = sidebar();
