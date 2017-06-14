define(
  [
    'jquery', 
    'app/map/terrain', 
    'app/map/map', 
    'app/renderer/html/terrain-renderer'
  ], 
  function ($, Terrain, Map, TerrainRenderer) {
    $(document).ready(function() {

      var terrain = new Terrain(width = 30, height = 30, inputs = 3, stopTurnChance = 0.3)
      terrain.generate();
      var gameMap = new Map(terrain)
      var terrainRenderer = new TerrainRenderer(terrain, rootElement = $('#map'), elementSizePx = 100);
      terrainRenderer.render();
    })
  }
);
