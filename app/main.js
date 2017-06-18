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
    'app/actor/flamethrower-operator',
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
    FlamethrowerOperator,
    Technician) {

    $(document).ready(function() {

      this.init_RendererAndState = function () {
        this.initState = new InitState(this.gameMap, this.actors.slice())
        this.initState.next()
        var initStateRenderer = new InitStateRenderer(this.initState)
        this.initRenderer = new ChainRenderer( [ this.terrainRenderer, this.mapRenderer, initStateRenderer ] )
      }

      this.game_RendererAndState = function () {
        this.gameState = new GameState(this.gameMap)
        this.gameState.addActors(this.actors.slice())
        this.gameState.next()
        var gameStateRenderer = new GameStateRenderer(this.gameState)
        this.gameRenderer = new ChainRenderer( [this.terrainRenderer, this.mapRenderer, gameStateRenderer] )
      }

      this.end_RendererAndState = function () {
        this.endState = new EndState(this.actors.slice())
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


      var terrain = new Terrain(width = 15, height = 15, inputs = 4, stopTurnChance = 0.3)
      terrain.generate();
      this.terrainRenderer = new TerrainRenderer(terrain, rootElement = $('#map'), elementSizePx = 50);

      this.gameMap = new Map(terrain)
      this.mapRenderer = new MapRenderer(this.gameMap)

      var android = new Android(this.gameMap)
      var alien = new Alien(this.gameMap)
      var technician = new Technician(this.gameMap)
      var flamethrowerOperator = new FlamethrowerOperator(this.gameMap)
      this.actors = [ technician, android, flamethrowerOperator, alien ]

      var controllerHtmlProxy = new ControllerHtmlProxy(this.controller())

      controllerHtmlProxy.register()
    })
  }
);

