document.addEventListener('DOMContentLoaded', function() {
  const sidebar = document.querySelector('#sidebar');
  const openIcon = document.querySelector('#sidebar-open');
  const closeIcon = document.querySelector('#sidebar-close');
  const mask = document.querySelector('#sidebar .mask');
  const newsContent = document.querySelector('.news-content');
  const paginationElement = document.querySelector('#pagination');
  let loadData = [];

  openIcon.addEventListener('click', function() {
    window.utils.addClass(sidebar, 'active');
  });

  closeIcon.addEventListener('click', function() {
    window.utils.removeClass(sidebar, 'active');
  });

  mask.addEventListener('click', function () {
    window.utils.removeClass(sidebar, 'active');
  });

  function setNewsGrid(data, activeIndex) {
    const min = Math.min(data.length, 8);
    const startIndex = (activeIndex - 1) * 8;

    while (newsContent.firstChild) {
      newsContent.removeChild(newsContent.firstChild);
    }

    for (let i = startIndex; i < startIndex + min && i < data.length; ++i) {
      newsContent.appendChild(data[i].render());
    }
  }

  function setPagination(maxIndex, activeIndex) {
    const pagination = new Pagination({ maxIndex: maxIndex, activeIndex: activeIndex });
    while (paginationElement.firstChild) {
      paginationElement.removeChild(paginationElement.firstChild);
    }
    paginationElement.appendChild(pagination.render());
    const paginationItems = document.querySelectorAll('button.pagination-item');
    paginationItems.forEach((item) => {
      item.addEventListener('click', onPaginationChange);
    })
  }

  function setData(data) {
    if (data.length) {
      loadData = data.map((value) => { return new News(value, { type: 1 }); });
      const activeIndex = parseInt(paginationElement.dataset.pagination)
      setNewsGrid(loadData, activeIndex);
      const maxIndex = Math.ceil(loadData.length / 8);
      setPagination(maxIndex, activeIndex);
    }
  }

  function onPaginationChange(e) {
    const element = e.target;
    const page = parseInt(element.textContent);
    const activeElement = document.querySelector('button.pagination-item.active');
    const activeIndex = parseInt(activeElement.textContent);
    if (page === activeIndex) {
      return;
    }

    paginationElement.dataset.pagination = page.toString();
    setNewsGrid(loadData, page);

    const maxIndex = Math.ceil(loadData.length / 8);

    setPagination(maxIndex, page);
  }

  window.networkModule.run().then(setData);
});
