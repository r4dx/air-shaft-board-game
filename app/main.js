define(
  [
    'jquery', 
    'app/map/terrain', 
    'app/map/map', 
    'app/renderer/html/terrain-renderer',
    'app/renderer/html/state-renderer',
    'app/renderer/html/map-renderer',
    'app/controller/controller',
    'app/controller/html-proxy',
    'app/game/state',
    'app/game/android',
    'app/game/alien'
  ], 
  function ($, Terrain, Map, TerrainRenderer, StateRenderer, MapRenderer, Controller, ControllerHtmlProxy, State, Android, Alien) {
    $(document).ready(function() {

      var terrain = new Terrain(width = 30, height = 30, inputs = 4, stopTurnChance = 0.3)
      terrain.generate();
      var gameMap = new Map(terrain)
      var terrainRenderer = new TerrainRenderer(terrain, rootElement = $('#map'), elementSizePx = 25);

      var state = new State(gameMap)
      var android = new Android(terrain.getInputs()[0], gameMap)
      var alien = new Alien(terrain.getInputs()[1], gameMap)
      state.addActor(android)
      state.addActor(alien)
      state.nextTurn()

      var stateRenderer = new StateRenderer(state)

      var mapRenderer = new MapRenderer(gameMap)
      
      var controller = new Controller(state, mapRenderer, stateRenderer, terrainRenderer)
      var controllerHtmlProxy = new ControllerHtmlProxy(controller)

      terrainRenderer.render()
      mapRenderer.render()
      stateRenderer.render()

      controllerHtmlProxy.register()
    })
  }
);
