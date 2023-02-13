import * as $ from 'jquery';

import { initShoot, initClear } from './init';
import animateFrame from './utils/animate';
$(function() {
  initShoot();
  initClear();

  window.requestAnimationFrame(animateFrame);
});
