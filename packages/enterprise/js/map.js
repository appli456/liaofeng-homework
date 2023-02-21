function map () {

  function init() {
    const map = new BMapGL.Map('map');
    const point = new BMapGL.Point(116.404, 39.915);
    map.centerAndZoom(point, 14);
    const zoomCtrl = new BMapGL.ZoomControl();
    map.addControl(zoomCtrl);
    const marker = new BMapGL.Marker(point);
    map.addOverlay(marker);
  }

  return {
    init: init,
  };
}

window.mapModule = map();
