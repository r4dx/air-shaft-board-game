define([ 'app/game/technician' ], function (Technician) {

    function InitState(gameMap, actors) {
      this.gameMap = gameMap
      this.actors = actors
      var currentIndex = -1
      this.currentActor = null

      var nextDoor = function (self) {
      }

      this.next = function () {
        if (this.currentActor instanceof Technician && this.currentActor.doorsLeft > 0) {
          nextDoor(this)
          return
        }

        if (++currentIndex >= this.actors.length)
          return false

        this.currentActor = this.actors[currentIndex]
        return true
      }
    }

    return InitState
  }
);