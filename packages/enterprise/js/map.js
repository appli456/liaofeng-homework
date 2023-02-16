function map () {
  var map = new BMapGL.Map('map'); // 创建Map实例
  map.centerAndZoom(new BMapGL.Point(116.404, 39.915), 14); // 初始化地图,设置中心点坐标和地图级别

  return {};
}

document.addEventListener('DOMContentLoaded', () => {
  const m = map();
})
