define(['app/util/direction'], function (Direction) {

  function InitController(state) {
    this.state = state

    this.left = function () {
      this.state.currentActor.go(Direction.LEFT)
    }

    this.right = function () {
      this.state.currentActor.go(Direction.RIGHT)
    }

    this.up = function () {
      this.state.currentActor.go(Direction.UP)
    }

    this.down = function () {
      this.state.currentActor.go(Direction.DOWN)
    }

    this.space = function () {
      this.state.next()
    }
  }

  return InitController
});