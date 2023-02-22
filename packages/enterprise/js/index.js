document.addEventListener('DOMContentLoaded', function () {
  window.sidebarModule.init();
  window.animationModule.init();

  function setData(data) {
    let list = [];
    if (data.length) {
      list = data.map((value) => { return new News(value, { type: 0 }); });
      const newsContent = document.querySelector('.news-content');
      const min = Math.min(list.length, 8)

      for (let i = 0; i < min; ++i) {
        newsContent.appendChild(list[i].render());
      }

      window.enterAnimationModule.update();
    }
  }

  window.enterAnimationModule.init();
  window.animationModule.run();
  window.networkModule.run().then(setData);
});
