import $ from 'jquery';

function initClear() {
  const clear = $('#barrage-clear');

  clear.on('click', () => {
    $('.barrage').remove();
  });
}

export default initClear;
