define(function () {
    function State(initRenderer, initState, gameRenderer, gameState, endRenderer, endState) {
      this.stateId = State.INIT
      this.state = initState
      this.renderer = initRenderer

      var changeState = function (self) {
        switch (self.stateId) {
          case State.INIT:
            self.stateId = State.GAME
            self.state = gameState
            self.renderer = gameRenderer
            break

          case State.GAME:
            self.stateId = State.END
            self.state = endState
            self.renderer = endRenderer
            break

          default:
            throw 'Unknown state: ' + self.stateId
        }      
      }

     this.move = function (direction) {
       this.state.move(direction)
     }

      this.next = function () {
        if (!this.state.next())
          changeState(this)
      }
    }
    State.INIT = "init"
    State.GAME = "game"
    State.END = "end"

    return State
});