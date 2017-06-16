define(function () {
    function State(initController, initRenderer, initState, gameController, gameRenderer, gameState) {
      this.stateId = State.GAME
      this.state = gameState
      this.controller = gameController
      this.renderer = gameRenderer

      var changeState = function (self) {
        switch (self.stateId) {
          case State.INIT:
            self.stateId = State.GAME
            self.state = gameState
            self.controller = gameController
            self.renderer = gameRenderer
            break

          case State.GAME:
            self.stateId = State.INIT
            self.state = initState
            self.controller = initController
            self.renderer = initRenderer
            break

          default:
            throw 'Unknown state: ' + self.stateId
        }      
      }

      this.next = function () {
        if (!this.state.next())
          changeState(this)
      }
    }
    State.INIT = "init"
    State.GAME = "game"

    return State
});