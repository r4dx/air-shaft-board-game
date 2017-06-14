define(['app/util/direction'], function (Direction) {

  function Controller(state, mapRenderer, stateRenderer, terrainRenderer) {
    this.state = state
    this.mapRenderer = mapRenderer
    this.stateRenderer = stateRenderer
    this.terrainRenderer = terrainRenderer

    var render = function (self) {
      self.terrainRenderer.render()
      self.mapRenderer.render()
      self.stateRenderer.render()
    }

    var go = function (self, direction) {
      self.state.currentActor.go(direction)
      render(self)
    }

    this.left = function () {
      go(this, Direction.LEFT)
    }

    this.right = function () {
      go(this, Direction.RIGHT)
    }

    this.up = function () {
      go(this, Direction.UP)
    }

    this.down = function () {
      go(this, Direction.DOWN)
    }

    this.space = function () {
      this.state.nextTurn()
      render(this)
    }
  }

  return Controller
});