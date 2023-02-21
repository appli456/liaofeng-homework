document.addEventListener('DOMContentLoaded', function() {
  const sidebar = document.querySelector('#sidebar');
  const openIcon = document.querySelector('#sidebar-open');
  const closeIcon = document.querySelector('#sidebar-close');
  const mask = document.querySelector('#sidebar .mask');
  const detailElement = document.querySelector('#detail');

  openIcon.addEventListener('click', function() {
    window.utils.addClass(sidebar, 'active');
  });

  closeIcon.addEventListener('click', function() {
    window.utils.removeClass(sidebar, 'active');
  });

  mask.addEventListener('click', function () {
    window.utils.removeClass(sidebar, 'active');
  });

  const query = window.utils.getQuery();

  function makeArticle(detail) {
    const article = new Article(detail);

    return article.render();
  }

  function setData(data) {
    if (data.length) {
      const id = query.id ? query.id : '1';
      let detail = null;
      for (let i = 0; i < data.length; ++i) {
        const item = data[i];
        if (item.id === id) {
          detail = item;
          break;
        }
      }

      if (detail) {
        const article = makeArticle(detail);
        detailElement.appendChild(article);
      }
    }
  }

  window.networkModule.run().then(setData);
});
