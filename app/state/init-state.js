define([ 'app/actor/technician', 'app/util/direction' ], function (Technician, Direction) {

    function InitState(gameMap, actors) {
      var currentIndex = -1
      this.currentActor = null
      var inputIndex = 0

      var nextDoor = function (self) {
      }

      this.move = function (direction) {
        var inputs = gameMap.getFreeInputs([ this.currentActor ])

        if (direction == Direction.LEFT)
          inputIndex--

        if (direction == Direction.RIGHT)
          inputIndex++

        if (inputIndex < 0)
          inputIndex = inputs.length - 1

        if (inputIndex > inputs.length - 1)
          inputIndex = 0

        gameMap.set(this.currentActor, inputs[inputIndex])
      }

      this.next = function () {
/*
        if (this.currentActor instanceof Technician && this.currentActor.doorsLeft > 0) {
          nextDoor(this)
          return
        }*/

        inputIndex = 0

        if (++currentIndex >= actors.length)
          return false        

        this.currentActor = actors[currentIndex]
        return true
      }
    }

    return InitState
  }
);