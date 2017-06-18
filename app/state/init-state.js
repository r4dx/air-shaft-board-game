define([ 'app/actor/technician', 'app/util/direction' ], function (Technician, Direction) {

    function InitState(gameMap, actors) {
      var currentIndex = -1
      this.currentActor = null
      var inputIndex = 0
      var state = InitState.ACTORS
      var currentDoor = null

      var moveActor = function (self, direction) {
        var inputs = gameMap.getFreeInputs([ self.currentActor ])

        if (direction == Direction.LEFT)
          inputIndex--

        if (direction == Direction.RIGHT)
          inputIndex++

        if (inputIndex < 0)
          inputIndex = inputs.length - 1

        if (inputIndex > inputs.length - 1)
          inputIndex = 0

        gameMap.set(self.currentActor, inputs[inputIndex])
      }

      this.move = function (direction) {
        if (state == InitState.ACTORS)
          moveActor(this, direction)
        else 
          gameMap.move(currentDoor, direction)
      }

      var setDoor = function (self) {
        currentDoor = self.currentActor.createDoor()
        gameMap.set(currentDoor, gameMap.getFreeInputs([ ])[0])
      }

      this.next = function () {
        if (this.currentActor instanceof Technician && state == InitState.ACTORS) {
          state = InitState.DOORS
        }

        if (state == InitState.DOORS && this.currentActor.doorsLeft > 0) {
           setDoor(this)
           return true
        }

        if (state == InitState.DOORS && this.currentActor.doorsLeft == 0)
          state = InitState.ACTORS

        inputIndex = 0

        if (++currentIndex >= actors.length)
          return false        

        this.currentActor = actors[currentIndex]
        this.move(Direction.LEFT)

        return true
      }

      this.act = function(direction) { }
    }
    InitState.ACTORS = 'actors'
    InitState.DOORS = 'doors'

    return InitState
  }
);