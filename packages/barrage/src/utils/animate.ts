import $ from 'jquery';

function animateFrame() {
  const clearItem: JQuery<HTMLElement>[] = [];
  $('.barrage').each(function (index, element) {
    const rect = element.getBoundingClientRect();
    const $this = $(this);
    if (rect.x + rect.width < -10) {
      clearItem.push($this);
      return;
    }
    const left = parseInt($this.css('left'));
    $this.css('left', left - parseInt($this.attr('data-speed') as string));
  });
  if (clearItem.length) {
    clearItem.forEach((v) => {
      v.remove();
    })
  }
  window.requestAnimationFrame(animateFrame);
}

export default animateFrame;
