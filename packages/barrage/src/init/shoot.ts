import $ from 'jquery';
import Barrage from "../components/Barrage";

function initShoot() {
  const screen = $('#barrage-screen');
  const input = $('#barrage-input');
  $('#barrage-shoot').on('click', () => {
    const inputValue = (input.val() as string).toString();
    if (!inputValue.length) {
      return;
    }

    const width = screen.width();
    const height = screen.height();

    const barrage = new Barrage(inputValue, {
      width: width ? width : 0,
      height: height ? height : 0,
    });
    screen
      .append(barrage.getElement());
    input.val("");
  });
}

export default initShoot;
