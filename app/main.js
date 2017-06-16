define(
  [
    'jquery', 
    'app/map/terrain', 
    'app/map/map', 
    'app/renderer/html/terrain-renderer',
    'app/renderer/html/init-state-renderer',
    'app/renderer/html/game-state-renderer',
    'app/renderer/html/map-renderer',
    'app/renderer/html/chain-renderer',
    'app/controller/game-controller',
    'app/controller/init-controller',
    'app/controller/master-controller',
    'app/controller/html-proxy',
    'app/state/game-state',
    'app/state/init-state',
    'app/state/state',
    'app/game/android',
    'app/game/alien',
    'app/game/technician'
  ], 
  function (
    $, 
    Terrain, 
    Map, 
    TerrainRenderer, 
    InitStateRenderer, 
    GameStateRenderer, 
    MapRenderer, 
    ChainRenderer, 
    GameController, 
    InitController,
    MasterController, 
    ControllerHtmlProxy, 
    GameState, 
    InitState, 
    State, 
    Android, 
    Alien, 
    Technician) {

    $(document).ready(function() {

      this.initControllerRendererState = function () {
        this.initState = new InitState(this.gameMap, [ this.android, this.technician, this.alien ])
        this.initState.next()
        var initStateRenderer = new InitStateRenderer(this.initState)
        this.initRenderer = new ChainRenderer( [ this.terrainRenderer, this.mapRenderer, initStateRenderer ] )
        this.initController = new InitController(this.initState)
      }

      this.gameControllerRendererState = function () {
        this.gameState = new GameState(this.gameMap)
        this.gameState.addActor(this.android)
        this.gameState.addActor(this.alien)
        this.gameState.addActor(this.technician)
        this.gameState.next()
        this.gameController = new GameController(this.gameState)
        var gameStateRenderer = new GameStateRenderer(this.gameState)
        this.gameRenderer = new ChainRenderer( [this.terrainRenderer, this.mapRenderer, gameStateRenderer] )
      }

      this.masterController = function () {
        this.initControllerRendererState()
        this.gameControllerRendererState()
        state = new State(this.initController, this.initRenderer, this.initState, this.gameController, this.gameRenderer, this.gameState)
        state.renderer.render()
        return new MasterController(state)
      }


      var terrain = new Terrain(width = 30, height = 30, inputs = 4, stopTurnChance = 0.3)
      terrain.generate();
      this.terrainRenderer = new TerrainRenderer(terrain, rootElement = $('#map'), elementSizePx = 25);

      this.gameMap = new Map(terrain)
      this.mapRenderer = new MapRenderer(this.gameMap)

      this.android = new Android(terrain.getInputs()[0], this.gameMap)
      this.alien = new Alien(terrain.getInputs()[1], this.gameMap)
      this.technician = new Technician(terrain.getInputs()[2], this.gameMap)
      var controllerHtmlProxy = new ControllerHtmlProxy(this.masterController())

      controllerHtmlProxy.register()
    })
  }
);

