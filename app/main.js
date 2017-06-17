define(
  [
    'jquery', 
    'app/map/terrain', 
    'app/map/map', 
    'app/renderer/html/terrain-renderer',
    'app/renderer/html/init-state-renderer',
    'app/renderer/html/game-state-renderer',
    'app/renderer/html/end-state-renderer',
    'app/renderer/html/map-renderer',
    'app/renderer/html/chain-renderer',
    'app/controller/controller',
    'app/controller/html-proxy',
    'app/state/game-state',
    'app/state/init-state',
    'app/state/end-state',
    'app/state/state',
    'app/actor/android',
    'app/actor/alien',
    'app/actor/technician'
  ], 
  function (
    $, 
    Terrain, 
    Map, 
    TerrainRenderer, 
    InitStateRenderer, 
    GameStateRenderer, 
    EndStateRenderer, 
    MapRenderer, 
    ChainRenderer, 
    Controller, 
    ControllerHtmlProxy, 
    GameState, 
    InitState, 
    EndState, 
    State, 
    Android, 
    Alien, 
    Technician) {

    $(document).ready(function() {

      this.init_RendererAndState = function () {
        this.initState = new InitState(this.gameMap, [ this.technician, this.android, this.alien ])
        this.initState.next()
        var initStateRenderer = new InitStateRenderer(this.initState)
        this.initRenderer = new ChainRenderer( [ this.terrainRenderer, this.mapRenderer, initStateRenderer ] )
      }

      this.game_RendererAndState = function () {
        this.gameState = new GameState(this.gameMap)
        this.gameState.addActor(this.android)
        this.gameState.addActor(this.alien)
        this.gameState.addActor(this.technician)
        this.gameState.next()
        var gameStateRenderer = new GameStateRenderer(this.gameState)
        this.gameRenderer = new ChainRenderer( [this.terrainRenderer, this.mapRenderer, gameStateRenderer] )
      }

      this.end_RendererAndState = function () {
        this.endState = new EndState([ this.android, this.technician, this.alien ])
        this.endRenderer = new EndStateRenderer(this.endState)
      }

      this.controller = function () {
        this.init_RendererAndState()
        this.game_RendererAndState()
        this.end_RendererAndState()
        state = new State(this.initRenderer, this.initState, this.gameRenderer, this.gameState, this.endRenderer, this.endState)
        state.renderer.render()
        return new Controller(state)
      }


      var terrain = new Terrain(width = 30, height = 30, inputs = 4, stopTurnChance = 0.3)
      terrain.generate();
      this.terrainRenderer = new TerrainRenderer(terrain, rootElement = $('#map'), elementSizePx = 25);

      this.gameMap = new Map(terrain)
      this.mapRenderer = new MapRenderer(this.gameMap)

      this.android = new Android(this.gameMap)
      this.alien = new Alien(this.gameMap)
      this.technician = new Technician(this.gameMap)
      var controllerHtmlProxy = new ControllerHtmlProxy(this.controller())

      controllerHtmlProxy.register()
    })
  }
);

