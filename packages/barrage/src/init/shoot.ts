import $ from 'jquery';
import Barrage from "../components/Barrage";

function initShoot() {
  const screen = $('#barrage-screen');
  const input = $('#barrage-input');
  $('#barrage-shoot').on('click', () => {
    const inputValue = input.val().toString();
    if (!inputValue.length) {
      return;
    }

    const barrage = new Barrage(inputValue, {
      width: screen.width(),
      height: screen.height(),
    });
    screen
      .append(barrage.getElement());
    input.val("");
  });
}

export default initShoot;
