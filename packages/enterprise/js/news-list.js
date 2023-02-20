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

  function setData(data) {
    let list = [];
    if (data.length) {
      list = data.map((value) => { return new News(value, { type: 1 }); });
      const min = Math.min(list.length, 8)

      const newsContent = document.querySelector('.news-content');
      for (let i = 0; i < min; ++i) {
        newsContent.appendChild(list[i].render());
      }
    }
  }

  window.networkModule.run().then(setData);
});
