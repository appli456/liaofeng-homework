document.addEventListener('DOMContentLoaded', function() {
  const sidebar = document.querySelector('#sidebar');
  const openIcon = document.querySelector('#sidebar-open');
  const closeIcon = document.querySelector('#sidebar-close');
  const mask = document.querySelector('#sidebar .mask');

  openIcon.addEventListener('click', function() {
    window.utils.addClass(sidebar, 'active');
  });

  closeIcon.addEventListener('click', function() {
    window.utils.removeClass(sidebar, 'active');
  });

  mask.addEventListener('click', function () {
    window.utils.removeClass(sidebar, 'active');
  });


});
