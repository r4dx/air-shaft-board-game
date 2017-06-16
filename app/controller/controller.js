define(['app/util/direction'], function (Direction) {

  function Controller(state) {

    this.left = function () {
      state.move(Direction.LEFT)
      state.renderer.render()
    }

    this.right = function () {
      state.move(Direction.RIGHT)
      state.renderer.render()
    }

    this.up = function () {
      state.move(Direction.UP)
      state.renderer.render()
    }

    this.down = function () {
      state.move(Direction.DOWN)
      state.renderer.render()
    }

    this.space = function () {
      state.next()
      state.renderer.render()
    }
  }

  return Controller
});