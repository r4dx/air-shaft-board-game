define(function () {

  function MasterController(state) {

    this.left = function () {
      state.controller.left()
      state.renderer.render()
    }

    this.right = function () {
      state.controller.right()
      state.renderer.render()
    }

    this.up = function () {
      state.controller.up()
      state.renderer.render()
    }

    this.down = function () {
      state.controller.down()
      state.renderer.render()
    }

    this.space = function () {
      state.controller.space()
      state.renderer.render()
    }
  }

  return MasterController
});