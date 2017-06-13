define(
  [
    'jquery', 
    'app/map/map', 
    'app/renderer/html/map-renderer'
  ], 
  function ($, Map, MapRenderer) {
    $(document).ready(function() {

      var gameMap = new Map(width = 30, height = 30, inputs = 3, stopTurnChance = 0.3);
      gameMap.generate();
      var mapRenderer = new MapRenderer(gameMap, rootElement = $('#map'), elementSizePx = 100);
      mapRenderer.render();

    })
  }
);
